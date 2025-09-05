import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Palette, Globe, Settings, BookOpen } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized installation process that gets you up and running in minutes',
      color: 'text-yellow-500'
    },
    {
      icon: Palette,
      title: 'Pre-configured',
      description: 'Tools come with sensible defaults and configurations out of the box',
      color: 'text-purple-500'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Easy to modify and extend to fit your specific needs',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Works seamlessly on Linux, macOS, and Windows',
      color: 'text-green-500'
    },
    {
      icon: Shield,
      title: 'Safe',
      description: 'Non-destructive installation with rollback options',
      color: 'text-red-500'
    },
    {
      icon: BookOpen,
      title: 'Beginner-Friendly',
      description: 'Clear documentation and examples for every tool',
      color: 'text-indigo-500'
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Why Choose Our Toolkit?
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our DevOps Environment Toolkit is designed to eliminate the complexity of setting up a development environment, 
            so you can focus on what matters most - building amazing applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 ${feature.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
