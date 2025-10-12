import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Download,
  Github,
  Terminal,
  Shield,
  Cloud,
} from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="modern-bg pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-blue-50 dark:bg-blue-900/20 text-modern-primary dark:text-modern-dark-primary rounded-full border border-blue-100 dark:border-blue-800/50"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-modern-primary dark:bg-modern-dark-primary"></span>
              <span className="text-sm font-medium">
                Version 2.0.2 Released
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-modern-text dark:text-modern-dark-text font-display"
            >
              <span className="block mb-2">Your complete</span>
              <span className="gradient-text">DevOps Environment</span>
              <span className="block mt-2">in one click.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-modern-text-light dark:text-modern-dark-text-dim mb-8 max-w-lg"
            >
              Get all essential tools installed and configured on your local
              machine in minutes! Perfect for beginners starting their DevOps
              learning journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#installation"
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Install Now
              </a>
              <a
                href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            {/* Terminal demo display */}
            <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-xl relative bg-modern-darker border border-modern-dark-border">
              {/* Terminal header */}
              <div className="bg-gray-800 py-2 px-4 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400 font-mono flex-grow text-center">
                  ~/devops-toolkit
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-6 text-green-400 font-mono text-sm">
                <div className="flex items-start mb-4">
                  <span className="text-green-600 mr-2">$</span>
                  <div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <span className="text-white">./install.sh</span>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 }}
                  className="ml-4 mb-3 text-gray-400"
                >
                  ✓ Checking system compatibility...
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 }}
                  className="ml-4 mb-3 text-gray-400"
                >
                  ✓ Docker installed successfully
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.7 }}
                  className="ml-4 mb-3 text-gray-400"
                >
                  ✓ Kubernetes tools configured
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.0 }}
                  className="ml-4 mb-3 text-gray-400"
                >
                  ✓ Terraform installation complete
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.3 }}
                  className="ml-4 text-modern-success"
                >
                  ➤ All tools installed successfully! Ready to go.
                </motion.div>
              </div>

              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20"
        >
          <div className="feature-card">
            <div className="feature-icon">
              <Rocket className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-modern-text dark:text-modern-dark-text">
              Quick Setup
            </h3>
            <p className="text-modern-text-light dark:text-modern-dark-text-dim">
              Get up and running in minutes with our automated installer
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-modern-text dark:text-modern-dark-text">
              Best Practices
            </h3>
            <p className="text-modern-text-light dark:text-modern-dark-text-dim">
              Configured according to industry security and performance
              standards
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Cloud className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-modern-text dark:text-modern-dark-text">
              Cloud Ready
            </h3>
            <p className="text-modern-text-light dark:text-modern-dark-text-dim">
              Includes tools for working with all major cloud providers
            </p>
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="hidden lg:block absolute -top-20 -right-20 w-64 h-64 bg-modern-primary/5 dark:bg-modern-primary/10 rounded-full blur-3xl"></div>
        <div className="hidden lg:block absolute top-40 -left-20 w-72 h-72 bg-modern-secondary/5 dark:bg-modern-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
