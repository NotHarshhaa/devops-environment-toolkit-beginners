import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Heart,
  Star,
  ExternalLink,
  HardDrive,
  FileCode,
  BookOpen,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-modern-darker py-16 px-4 border-t border-gray-100 dark:border-modern-dark-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Project Info */}
          <div className="md:col-span-5 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-modern-primary to-modern-secondary dark:from-modern-dark-primary dark:to-modern-dark-secondary rounded-sm flex items-center justify-center shadow-md">
                  <FileCode className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-modern-text dark:text-modern-dark-text text-lg">
                    DevOps Toolkit
                  </span>
                  <span className="text-xs text-modern-text-light dark:text-modern-dark-text-dim">
                    One-click setup for your journey
                  </span>
                </div>
              </div>

              <p className="text-modern-text-light dark:text-modern-dark-text-dim mb-6 max-w-md">
                Get all essential DevOps tools installed and configured in
                minutes, so you can focus on building amazing applications and
                infrastructure.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-2 py-2 px-4 text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <button className="btn-ghost flex items-center gap-2 py-2 px-4 text-sm">
                  <Star className="w-4 h-4" />
                  Star
                </button>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-display text-lg font-semibold mb-5 text-modern-text dark:text-modern-dark-text">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#installation"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-modern-primary dark:bg-modern-dark-primary"></div>
                    Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#tools"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-modern-primary dark:bg-modern-dark-primary"></div>
                    Tools
                  </a>
                </li>
                <li>
                  <a
                    href="#learning"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-modern-primary dark:bg-modern-dark-primary"></div>
                    Learning Path
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-modern-primary dark:bg-modern-dark-primary"></div>
                    Features
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Support */}
          <div className="md:col-span-4 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-display text-lg font-semibold mb-5 text-modern-text dark:text-modern-dark-text">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-modern-accent dark:bg-modern-dark-accent"></div>
                    Bug Reports
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/NotHarshhaa/devops-environment-toolkit-beginners/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-modern-accent dark:bg-modern-dark-accent"></div>
                    Discussions
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@example.com"
                    className="text-modern-text-light dark:text-modern-dark-text-dim hover:text-modern-primary dark:hover:text-modern-dark-primary transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Status bar */}
        <div className="mb-8 p-4 bg-white dark:bg-modern-dark-card shadow-sm rounded-md border border-gray-100 dark:border-modern-dark-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-modern-text-light dark:text-modern-dark-text-dim text-sm">
              All systems operational
            </span>
          </div>
          <div className="flex items-center gap-2 text-modern-text-light dark:text-modern-dark-text-dim text-sm">
            <HardDrive className="w-4 h-4" />
            <span>Uptime: 99.9%</span>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-100 dark:border-modern-dark-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <BookOpen className="w-5 h-5 text-modern-text-light dark:text-modern-dark-text-dim" />
            <div className="text-modern-text-light dark:text-modern-dark-text-dim text-sm">
              © 2025 DevOps Environment Toolkit. Licensed under MIT.
            </div>
          </div>
          <div className="flex items-center gap-2 text-modern-text-light dark:text-modern-dark-text-dim text-sm">
            Made with{" "}
            <Heart className="w-4 h-4 text-pink-500 dark:text-pink-400 animate-pulse" />{" "}
            for the DevOps community
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
