import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Download, Star, Github } from 'lucide-react'

const Hero = () => {
  return (
    <section className="gradient-bg min-h-screen md:min-h-screen sm:min-h-[80vh] flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
            🚀 DevOps Environment
            <span className="block text-yellow-300">Toolkit</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 md:mb-8 max-w-3xl mx-auto">
            One-click setup for your DevOps journey. Get all essential tools installed and configured in minutes!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12"
        >
          <button className="btn-primary text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2">
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            Install Now
          </button>
          <button className="btn-secondary text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2">
            <Github className="w-4 h-4 md:w-5 md:h-5" />
            View on GitHub
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-white">
            <Rocket className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Lightning Fast</h3>
            <p className="text-sm md:text-base text-gray-200">Optimized installation process</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-white">
            <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Beginner Friendly</h3>
            <p className="text-sm md:text-base text-gray-200">Clear documentation and examples</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-white sm:col-span-2 md:col-span-1">
            <Download className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">One-Click Setup</h3>
            <p className="text-sm md:text-base text-gray-200">Automated setup for all platforms</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
