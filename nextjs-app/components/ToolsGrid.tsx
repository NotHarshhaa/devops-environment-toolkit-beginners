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
  Zap
} from 'lucide-react'

const ToolsGrid = () => {
  const toolCategories = [
    {
      title: 'Containerization',
      icon: Container,
      color: 'bg-blue-500',
      tools: ['Docker', 'Docker Compose'],
      description: 'Container management and orchestration'
    },
    {
      title: 'Version Control',
      icon: GitBranch,
      color: 'bg-green-500',
      tools: ['Git', 'GitHub CLI'],
      description: 'Code versioning and GitHub integration'
    },
    {
      title: 'CI/CD',
      icon: Zap,
      color: 'bg-yellow-500',
      tools: ['GitHub Actions'],
      description: 'Automated testing and deployment'
    },
    {
      title: 'Infrastructure',
      icon: Server,
      color: 'bg-purple-500',
      tools: ['Terraform', 'Ansible'],
      description: 'Infrastructure as Code and configuration management'
    },
    {
      title: 'Monitoring',
      icon: Monitor,
      color: 'bg-red-500',
      tools: ['Prometheus', 'Grafana', 'Jaeger'],
      description: 'System and application monitoring'
    },
    {
      title: 'Development',
      icon: Code,
      color: 'bg-indigo-500',
      tools: ['VS Code', 'Extensions'],
      description: 'Enhanced development experience'
    },
    {
      title: 'Cloud CLI',
      icon: Cloud,
      color: 'bg-cyan-500',
      tools: ['AWS CLI', 'Azure CLI', 'GCP CLI'],
      description: 'Multi-cloud management'
    },
    {
      title: 'Database',
      icon: Database,
      color: 'bg-orange-500',
      tools: ['PostgreSQL', 'Redis'],
      description: 'Database and caching solutions'
    },
    {
      title: 'Utilities',
      icon: Terminal,
      color: 'bg-gray-500',
      tools: ['jq', 'curl', 'wget', 'tree'],
      description: 'Essential command-line tools'
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            🛠️ Complete Tool Suite
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
              className="card group hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-3 md:mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${category.color} rounded-lg flex items-center justify-center mr-3 md:mr-4`}>
                  <category.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4">
                {category.description}
              </p>
              
              <div className="space-y-1 md:space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <div
                    key={tool}
                    className="flex items-center text-xs md:text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-devops-blue rounded-full mr-2 md:mr-3"></div>
                    {tool}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToolsGrid
