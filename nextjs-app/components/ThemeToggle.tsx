'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme()

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-retro-gray border border-retro-border rounded-none p-1">
        <div className="w-6 h-6 bg-retro-cyan rounded-none shadow-lg"></div>
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-retro-gray border border-retro-border rounded-none p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-retro-cyan focus:ring-offset-2 focus:ring-offset-retro-dark"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-retro-cyan rounded-none shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 28 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === 'light' ? (
          <Sun className="w-3 h-3 text-retro-dark" />
        ) : (
          <Moon className="w-3 h-3 text-retro-dark" />
        )}
      </motion.div>
      
      {/* Theme labels */}
      <div className="flex justify-between items-center h-full px-1">
        <span className="text-xs text-retro-text-dim font-mono">L</span>
        <span className="text-xs text-retro-text-dim font-mono">D</span>
      </div>
    </motion.button>
  )
}

export default ThemeToggle
