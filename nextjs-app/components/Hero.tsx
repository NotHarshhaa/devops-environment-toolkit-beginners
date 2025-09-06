import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Download, Star, Github, Terminal, Code } from 'lucide-react'

const Hero = () => {
  return (
    <section className="gradient-bg min-h-screen md:min-h-screen sm:min-h-[80vh] flex items-center justify-center px-4 pt-20 matrix-bg">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <div className="terminal mb-6 p-4 bg-retro-darker border border-retro-cyan">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-retro-green" />
              <span className="text-retro-green text-sm font-mono">devops-toolkit@terminal:~$</span>
            </div>
            <div className="text-retro-cyan font-mono text-sm">
              <span className="text-retro-green">$</span> ./install.sh --retro-mode
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 font-retro">
            <span className="neon-cyan">
              🚀 DevOps Environment
            </span>
            <span className="block neon-purple mt-2">
              Toolkit for Beginners
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-retro-text-dim mb-6 md:mb-8 max-w-3xl mx-auto font-cyber">
            <span className="neon-green">One-click local setup</span> for your DevOps learning journey. 
            Get all essential tools installed and configured on your local machine in minutes!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12"
        >
          <a
            href="#installation"
            className="btn-primary text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            Install Now
          </a>
          <a
            href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
            View on GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          <div className="card bg-retro-gray/80 backdrop-blur-sm border-retro-cyan">
            <Rocket className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-retro-yellow" />
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 neon-cyan font-retro">Lightning Fast</h3>
            <p className="text-sm md:text-base text-retro-text-dim font-cyber">Optimized installation process</p>
          </div>
          
          <div className="card bg-retro-gray/80 backdrop-blur-sm border-retro-purple">
            <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-retro-yellow" />
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 neon-purple font-retro">Perfect for Beginners</h3>
            <p className="text-sm md:text-base text-retro-text-dim font-cyber">Designed specifically for DevOps beginners</p>
          </div>
          
          <div className="card bg-retro-gray/80 backdrop-blur-sm border-retro-green sm:col-span-2 md:col-span-1">
            <Code className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-retro-yellow" />
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 neon-green font-retro">One-Click Setup</h3>
            <p className="text-sm md:text-base text-retro-text-dim font-cyber">Automated setup for all platforms</p>
          </div>
        </motion.div>

        {/* Retro-tech decorative elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-retro-cyan animate-pulse-neon"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-retro-purple animate-pulse-neon"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-retro-green animate-pulse-neon"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-retro-pink animate-pulse-neon"></div>
      </div>
    </section>
  )
}

export default Hero
