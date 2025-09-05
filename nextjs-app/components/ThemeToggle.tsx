'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme()

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
        <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-devops-blue focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 20 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === 'light' ? (
          <Sun className="w-2.5 h-2.5 text-yellow-500" />
        ) : (
          <Moon className="w-2.5 h-2.5 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
