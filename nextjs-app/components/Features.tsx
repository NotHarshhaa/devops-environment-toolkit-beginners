import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Clock, Users, Code, Database } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Local Setup',
      description: 'Get your entire DevOps environment running on your local machine in under 5 minutes with our optimized installation scripts.',
      color: 'retro-yellow'
    },
    {
      icon: Shield,
      title: 'Beginner-Safe Configuration',
      description: 'All tools come pre-configured with beginner-friendly settings and security best practices.',
      color: 'retro-green'
    },
    {
      icon: Clock,
      title: 'Skip the Setup Hassle',
      description: 'Skip weeks of manual configuration and environment setup. Focus on learning DevOps instead of fighting with installations.',
      color: 'retro-cyan'
    },
    {
      icon: Users,
      title: 'Learning Community',
      description: 'Join thousands of beginners learning DevOps together. Consistent environments for collaborative learning.',
      color: 'retro-purple'
    },
    {
      icon: Code,
      title: 'Beginner-First Design',
      description: 'Built by DevOps practitioners, for beginners. Every tool is configured with learning and ease-of-use in mind.',
      color: 'retro-pink'
    },
    {
      icon: Database,
      title: 'Complete Learning Stack',
      description: 'From containers to monitoring, CI/CD to databases - everything you need to start your DevOps learning journey.',
      color: 'retro-orange'
    }
  ]

  return (
    <section id="features" className="py-12 md:py-20 px-4 retro-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-retro">
            <span className="neon-cyan">
              Why Choose Our Toolkit?
            </span>
          </h2>
          <p className="text-base md:text-xl text-retro-text-dim max-w-3xl mx-auto font-cyber">
            Experience the power of modern DevOps tools with a beginner-friendly approach that makes learning feel effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card border-${feature.color} hover:border-${feature.color} bg-retro-gray/80 backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-3">
                <feature.icon className={`w-6 h-6 md:w-8 md:h-8 text-${feature.color}`} />
                <h3 className={`text-base md:text-lg font-semibold text-${feature.color} font-retro`}>
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-retro-text-dim font-cyber leading-relaxed">
                {feature.description}
              </p>
              
              {/* Terminal-style progress bar */}
              <div className="mt-4 bg-retro-darker border border-retro-border rounded-none p-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-retro-green rounded-none animate-pulse"></div>
                  <span className="text-xs text-retro-green font-mono">SYSTEM_READY</span>
                </div>
                <div className="w-full bg-retro-gray rounded-none h-1">
                  <div 
                    className={`h-1 bg-${feature.color} rounded-none transition-all duration-1000`}
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features