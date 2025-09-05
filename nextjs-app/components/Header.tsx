'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { Terminal, Cpu } from 'lucide-react'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-retro-dark/95 dark:bg-retro-dark/95 light:bg-white/95 backdrop-blur-md border-b border-retro-border dark:border-retro-border light:border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-retro-cyan to-retro-purple dark:from-retro-cyan dark:to-retro-purple light:from-blue-500 light:to-purple-500 rounded-none flex items-center justify-center border border-retro-cyan dark:border-retro-cyan light:border-blue-500">
              <Terminal className="w-4 h-4 text-retro-dark dark:text-retro-dark light:text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-retro font-bold text-retro-cyan dark:text-retro-cyan light:text-blue-600 text-lg neon-text">
                DevOps Toolkit
              </span>
              <span className="text-xs text-retro-text-dim dark:text-retro-text-dim light:text-gray-500 font-mono">
                v2.0.1-retro
              </span>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* System status indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-retro-gray dark:bg-retro-gray light:bg-gray-200 border border-retro-green dark:border-retro-green light:border-green-500 rounded-none">
              <Cpu className="w-3 h-3 text-retro-green dark:text-retro-green light:text-green-600 animate-pulse" />
              <span className="text-xs text-retro-green dark:text-retro-green light:text-green-600 font-mono">ONLINE</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
