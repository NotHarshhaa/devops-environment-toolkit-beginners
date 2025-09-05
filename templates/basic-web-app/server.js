const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const { createClient } = require('redis');
const { Pool } = require('pg');
const client = require('prom-client');
const winston = require('winston');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'devops-learning-app' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://devops_user:devops_password@localhost:5432/devops_db'
});

// Redis connection
let redisClient;
if (process.env.REDIS_URL) {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });
  redisClient.on('error', (err) => logger.error('Redis Client Error', err));
  redisClient.connect();
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    };
    
    httpRequestDuration.observe(labels, duration);
    httpRequestTotal.inc(labels);
  });
  
  next();
});

// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  };

  // Check database connection
  try {
    await pool.query('SELECT 1');
    health.database = 'connected';
  } catch (error) {
    health.database = 'disconnected';
    health.status = 'unhealthy';
  }

  // Check Redis connection
  if (redisClient) {
    try {
      await redisClient.ping();
      health.redis = 'connected';
    } catch (error) {
      health.redis = 'disconnected';
    }
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Cache middleware
const cache = (duration) => {
  return async (req, res, next) => {
    if (!redisClient) return next();
    
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await redisClient.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
    } catch (error) {
      logger.error('Cache get error:', error);
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      if (res.statusCode === 200) {
        redisClient.setEx(key, duration, JSON.stringify(body)).catch(err => 
          logger.error('Cache set error:', err)
        );
      }
      res.sendResponse(body);
    };
    
    next();
  };
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DevOps Learning App!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      users: '/api/users',
      posts: '/api/posts'
    }
  });
});

// Users API
app.get('/api/users', cache(300), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT 10');
    res.json({
      users: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    logger.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
      [name, email]
    );
    
    // Invalidate cache
    if (redisClient) {
      redisClient.del('cache:/api/users').catch(err => logger.error('Cache delete error:', err));
    }
    
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    logger.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Posts API
app.get('/api/posts', cache(300), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, content, author_id, created_at FROM posts ORDER BY created_at DESC LIMIT 10');
    res.json({
      posts: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    logger.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, content, author_id } = req.body;
  
  if (!title || !content || !author_id) {
    return res.status(400).json({ error: 'Title, content, and author_id are required' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING id, title, content, author_id, created_at',
      [title, content, author_id]
    );
    
    // Invalidate cache
    if (redisClient) {
      redisClient.del('cache:/api/posts').catch(err => logger.error('Cache delete error:', err));
    }
    
    res.status(201).json({ post: result.rows[0] });
  } catch (error) {
    logger.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  
  if (redisClient) {
    await redisClient.quit();
  }
  
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  
  if (redisClient) {
    await redisClient.quit();
  }
  
  await pool.end();
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`Metrics: http://localhost:${PORT}/metrics`);
});
