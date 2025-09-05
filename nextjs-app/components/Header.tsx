'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-devops-blue to-devops-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🚀</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              DevOps Toolkit
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
