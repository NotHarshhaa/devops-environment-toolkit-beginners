import React from 'react'
import { motion } from 'framer-motion'
import { Github, Mail, Heart, Star, ExternalLink, Terminal, Cpu, HardDrive, Zap } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-retro-darker dark:bg-retro-darker light:bg-gray-100 text-retro-text dark:text-retro-text light:text-gray-800 py-12 md:py-16 px-4 transition-colors duration-300 border-t border-retro-border dark:border-retro-border light:border-gray-300">
      <div className="max-w-6xl mx-auto">
        {/* System Status */}
        <div className="terminal mb-8 p-4 bg-retro-gray dark:bg-retro-gray light:bg-gray-200 border border-retro-border dark:border-retro-border light:border-gray-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-retro-green animate-pulse" />
              <span className="text-retro-green text-sm font-mono">SYSTEM_STATUS: OPERATIONAL</span>
              <div className="w-2 h-2 bg-retro-green rounded-none animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-3 h-3 text-retro-cyan" />
              <span className="text-retro-cyan text-xs font-mono">UPTIME: 99.9%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-retro text-retro-cyan dark:text-retro-cyan light:text-blue-600">
                🚀 DevOps Environment Toolkit
              </h3>
              <p className="text-retro-text-dim dark:text-retro-text-dim light:text-gray-600 mb-4 md:mb-6 max-w-md text-sm md:text-base font-cyber">
                One-click setup for your DevOps journey. Get all essential tools installed 
                and configured in minutes, so you can focus on building amazing applications.
              </p>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-retro-gray dark:bg-retro-gray light:bg-gray-200 border border-retro-cyan dark:border-retro-cyan light:border-blue-500 hover:bg-retro-cyan dark:hover:bg-retro-cyan light:hover:bg-blue-500 hover:text-retro-dark dark:hover:text-retro-dark light:hover:text-white px-3 md:px-4 py-2 rounded-none transition-colors text-sm md:text-base font-mono"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  GitHub
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                </a>
                <button className="flex items-center gap-2 bg-retro-gray dark:bg-retro-gray light:bg-gray-200 border border-retro-purple dark:border-retro-purple light:border-purple-500 hover:bg-retro-purple dark:hover:bg-retro-purple light:hover:bg-purple-500 hover:text-retro-dark dark:hover:text-retro-dark light:hover:text-white px-3 md:px-4 py-2 rounded-none transition-colors text-sm md:text-base font-mono">
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
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 font-retro text-retro-purple dark:text-retro-purple light:text-purple-600">Quick Links</h4>
              <div className="terminal bg-retro-darker dark:bg-retro-darker light:bg-gray-300 border border-retro-border dark:border-retro-border light:border-gray-400 p-3 rounded-none">
                <ul className="space-y-2">
                  <li>
                    <a href="#installation" className="text-retro-text-dim hover:text-retro-cyan transition-colors text-sm md:text-base font-mono flex items-center gap-2">
                      <div className="w-1 h-1 bg-retro-cyan rounded-none"></div>
                      Installation
                    </a>
                  </li>
                  <li>
                    <a href="#tools" className="text-retro-text-dim hover:text-retro-cyan transition-colors text-sm md:text-base font-mono flex items-center gap-2">
                      <div className="w-1 h-1 bg-retro-cyan rounded-none"></div>
                      Tools
                    </a>
                  </li>
                  <li>
                    <a href="#learning-path" className="text-retro-text-dim hover:text-retro-cyan transition-colors text-sm md:text-base font-mono flex items-center gap-2">
                      <div className="w-1 h-1 bg-retro-cyan rounded-none"></div>
                      Learning Path
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="text-retro-text-dim hover:text-retro-cyan transition-colors text-sm md:text-base font-mono flex items-center gap-2">
                      <div className="w-1 h-1 bg-retro-cyan rounded-none"></div>
                      Features
                    </a>
                  </li>
                </ul>
              </div>
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
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 font-retro text-retro-green dark:text-retro-green light:text-green-600">Support</h4>
              <div className="terminal bg-retro-darker dark:bg-retro-darker light:bg-gray-300 border border-retro-border dark:border-retro-border light:border-gray-400 p-3 rounded-none">
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-retro-text-dim hover:text-retro-green transition-colors flex items-center gap-2 text-sm md:text-base font-mono"
                    >
                      <div className="w-1 h-1 bg-retro-green rounded-none"></div>
                      Bug Reports
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners/discussions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-retro-text-dim hover:text-retro-green transition-colors flex items-center gap-2 text-sm md:text-base font-mono"
                    >
                      <div className="w-1 h-1 bg-retro-green rounded-none"></div>
                      Discussions
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="mailto:harshhaa@example.com"
                      className="text-retro-text-dim hover:text-retro-green transition-colors flex items-center gap-2 text-sm md:text-base font-mono"
                    >
                      <Mail className="w-3 h-3 md:w-4 md:h-4" />
                      Email Support
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-retro-border dark:border-retro-border light:border-gray-300 pt-6 md:pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="text-retro-text-dim dark:text-retro-text-dim light:text-gray-600 text-xs md:text-sm font-mono">
              © 2024 DevOps Environment Toolkit. Licensed under MIT.
            </div>
            <div className="flex items-center gap-2 text-retro-text-dim dark:text-retro-text-dim light:text-gray-600 text-xs md:text-sm font-mono">
              Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-retro-pink dark:text-retro-pink light:text-pink-500 animate-pulse" /> for the DevOps community
            </div>
          </div>
          
          {/* Terminal-style footer */}
          <div className="terminal mt-4 p-2 bg-retro-gray dark:bg-retro-gray light:bg-gray-200 border border-retro-border dark:border-retro-border light:border-gray-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-retro-green" />
              <span className="text-retro-green text-xs font-mono">devops-toolkit@footer:~$</span>
              <span className="text-retro-text-dim text-xs font-mono">echo &quot;Thank you for using our toolkit!&quot;</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer