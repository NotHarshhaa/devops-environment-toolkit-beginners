import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  GitBranch, 
  Cloud, 
  Monitor, 
  Code, 
  Database, 
  Terminal,
  Server,
  Shield,
  Zap,
  Cpu,
  HardDrive
} from 'lucide-react'

const ToolsGrid = () => {
  const toolCategories = [
    {
      title: 'Containerization',
      icon: Container,
      color: 'retro-cyan',
      tools: ['Docker', 'Docker Compose'],
      description: 'Container management and orchestration',
      status: 'ACTIVE'
    },
    {
      title: 'Version Control',
      icon: GitBranch,
      color: 'retro-green',
      tools: ['Git', 'GitHub CLI'],
      description: 'Code versioning and GitHub integration',
      status: 'ONLINE'
    },
    {
      title: 'CI/CD',
      icon: Zap,
      color: 'retro-yellow',
      tools: ['GitHub Actions'],
      description: 'Automated testing and deployment',
      status: 'READY'
    },
    {
      title: 'Infrastructure',
      icon: Server,
      color: 'retro-purple',
      tools: ['Terraform', 'Ansible'],
      description: 'Infrastructure as Code and configuration management',
      status: 'DEPLOYED'
    },
    {
      title: 'Monitoring',
      icon: Monitor,
      color: 'retro-pink',
      tools: ['Prometheus', 'Grafana', 'Jaeger'],
      description: 'System and application monitoring',
      status: 'SCANNING'
    },
    {
      title: 'Development',
      icon: Code,
      color: 'retro-blue',
      tools: ['VS Code', 'Extensions'],
      description: 'Enhanced development experience',
      status: 'LOADED'
    },
    {
      title: 'Cloud CLI',
      icon: Cloud,
      color: 'retro-orange',
      tools: ['AWS CLI', 'Azure CLI', 'GCP CLI'],
      description: 'Multi-cloud management',
      status: 'CONNECTED'
    },
    {
      title: 'Database',
      icon: Database,
      color: 'retro-red',
      tools: ['PostgreSQL', 'Redis'],
      description: 'Database and caching solutions',
      status: 'RUNNING'
    },
    {
      title: 'Utilities',
      icon: Terminal,
      color: 'retro-green',
      tools: ['jq', 'curl', 'wget', 'tree'],
      description: 'Essential command-line tools',
      status: 'EXECUTING'
    }
  ]

  return (
    <section id="tools" className="py-12 md:py-20 px-4 retro-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-retro">
            <span className="neon-purple">
              🛠️ Complete Tool Suite
            </span>
          </h2>
          <p className="text-base md:text-xl text-retro-text-dim max-w-3xl mx-auto font-cyber">
            Everything you need to start your DevOps journey. From containerization to monitoring, 
            we&apos;ve got you covered with industry-standard tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card bg-retro-gray/80 backdrop-blur-sm group ${
                category.color === 'retro-cyan' ? 'border-retro-cyan hover:border-retro-cyan' :
                category.color === 'retro-green' ? 'border-retro-green hover:border-retro-green' :
                category.color === 'retro-yellow' ? 'border-retro-yellow hover:border-retro-yellow' :
                category.color === 'retro-purple' ? 'border-retro-purple hover:border-retro-purple' :
                category.color === 'retro-pink' ? 'border-retro-pink hover:border-retro-pink' :
                category.color === 'retro-blue' ? 'border-retro-blue hover:border-retro-blue' :
                category.color === 'retro-orange' ? 'border-retro-orange hover:border-retro-orange' :
                category.color === 'retro-red' ? 'border-retro-red hover:border-retro-red' :
                'border-retro-green hover:border-retro-green'
              }`}
            >
              {/* Terminal-style header */}
              <div className="terminal mb-4 p-2 bg-retro-darker border border-retro-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-retro-green" />
                    <span className="text-xs text-retro-green font-mono">{category.title.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-retro-green rounded-none animate-pulse"></div>
                    <span className="text-xs text-retro-green font-mono">{category.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-3 md:mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-none flex items-center justify-center mr-3 md:mr-4 border ${
                  category.color === 'retro-cyan' ? 'bg-retro-cyan border-retro-cyan' :
                  category.color === 'retro-green' ? 'bg-retro-green border-retro-green' :
                  category.color === 'retro-yellow' ? 'bg-retro-yellow border-retro-yellow' :
                  category.color === 'retro-purple' ? 'bg-retro-purple border-retro-purple' :
                  category.color === 'retro-pink' ? 'bg-retro-pink border-retro-pink' :
                  category.color === 'retro-blue' ? 'bg-retro-blue border-retro-blue' :
                  category.color === 'retro-orange' ? 'bg-retro-orange border-retro-orange' :
                  category.color === 'retro-red' ? 'bg-retro-red border-retro-red' :
                  'bg-retro-green border-retro-green'
                }`}>
                  <category.icon className="w-5 h-5 md:w-6 md:h-6 text-retro-dark" />
                </div>
                <h3 className={`text-lg md:text-xl font-semibold font-retro ${
                  category.color === 'retro-cyan' ? 'text-retro-cyan' :
                  category.color === 'retro-green' ? 'text-retro-green' :
                  category.color === 'retro-yellow' ? 'text-retro-yellow' :
                  category.color === 'retro-purple' ? 'text-retro-purple' :
                  category.color === 'retro-pink' ? 'text-retro-pink' :
                  category.color === 'retro-blue' ? 'text-retro-blue' :
                  category.color === 'retro-orange' ? 'text-retro-orange' :
                  category.color === 'retro-red' ? 'text-retro-red' :
                  'text-retro-green'
                }`}>
                  {category.title}
                </h3>
              </div>
              
              <p className="text-sm md:text-base text-retro-text-dim mb-3 md:mb-4 font-cyber">
                {category.description}
              </p>
              
              {/* Tools list with terminal styling */}
              <div className="bg-retro-darker border border-retro-border p-3 rounded-none">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-3 h-3 text-retro-cyan" />
                  <span className="text-xs text-retro-cyan font-mono">INSTALLED_TOOLS</span>
                </div>
                <div className="space-y-1">
                  {category.tools.map((tool, toolIndex) => (
                    <div
                      key={tool}
                      className="flex items-center text-xs md:text-sm text-retro-text font-mono"
                    >
                      <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-none mr-2 md:mr-3 animate-pulse ${
                        category.color === 'retro-cyan' ? 'bg-retro-cyan' :
                        category.color === 'retro-green' ? 'bg-retro-green' :
                        category.color === 'retro-yellow' ? 'bg-retro-yellow' :
                        category.color === 'retro-purple' ? 'bg-retro-purple' :
                        category.color === 'retro-pink' ? 'bg-retro-pink' :
                        category.color === 'retro-blue' ? 'bg-retro-blue' :
                        category.color === 'retro-orange' ? 'bg-retro-orange' :
                        category.color === 'retro-red' ? 'bg-retro-red' :
                        'bg-retro-green'
                      }`}></div>
                      <span className="text-retro-text-dim">$</span>
                      <span className="ml-1">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 bg-retro-darker border border-retro-border rounded-none p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-retro-text-dim font-mono">PROGRESS</span>
                  <span className="text-xs text-retro-green font-mono">100%</span>
                </div>
                <div className="w-full bg-retro-gray rounded-none h-1">
                  <div 
                    className={`h-1 rounded-none transition-all duration-1000 ${
                      category.color === 'retro-cyan' ? 'bg-retro-cyan' :
                      category.color === 'retro-green' ? 'bg-retro-green' :
                      category.color === 'retro-yellow' ? 'bg-retro-yellow' :
                      category.color === 'retro-purple' ? 'bg-retro-purple' :
                      category.color === 'retro-pink' ? 'bg-retro-pink' :
                      category.color === 'retro-blue' ? 'bg-retro-blue' :
                      category.color === 'retro-orange' ? 'bg-retro-orange' :
                      category.color === 'retro-red' ? 'bg-retro-red' :
                      'bg-retro-green'
                    }`}
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

export default ToolsGrid