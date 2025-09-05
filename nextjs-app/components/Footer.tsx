import React from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Heart, Star, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 md:py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                🚀 DevOps Environment Toolkit
              </h3>
              <p className="text-gray-300 mb-4 md:mb-6 max-w-md text-sm md:text-base">
                One-click setup for your DevOps journey. Get all essential tools installed 
                and configured in minutes, so you can focus on building amazing applications.
              </p>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://github.com/harshhaa/devops-environment-toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  GitHub
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                </a>
                <button className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base">
                  <Star className="w-4 h-4 md:w-5 md:h-5" />
                  Star
                </button>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#installation" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                    Installation
                  </a>
                </li>
                <li>
                  <a href="#tools" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                    Tools
                  </a>
                </li>
                <li>
                  <a href="#learning-path" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                    Learning Path
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                    Features
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Support */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/harshhaa/devops-environment-toolkit/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-sm md:text-base"
                  >
                    Bug Reports
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/harshhaa/devops-environment-toolkit/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-sm md:text-base"
                  >
                    Discussions
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:harshhaa@example.com"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-sm md:text-base"
                  >
                    <Mail className="w-3 h-3 md:w-4 md:h-4" />
                    Email Support
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 dark:border-gray-700 pt-6 md:pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="text-gray-400 text-xs md:text-sm">
              © 2024 DevOps Environment Toolkit. Licensed under MIT.
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" /> for the DevOps community
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
