"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { Terminal, Cpu, Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-modern-darker/95 shadow-md border-b border-gray-100 dark:border-modern-dark-border/50"
          : "bg-transparent"
      } backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-modern-primary to-modern-secondary dark:from-modern-dark-primary dark:to-modern-dark-secondary rounded-sm flex items-center justify-center shadow-md">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-modern-text dark:text-modern-dark-text text-lg">
                DevOps Toolkit
              </span>
              <span className="text-xs text-modern-text-light dark:text-modern-dark-text-dim font-mono">
                v2.0.2
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-5">
              <a
                href="#features"
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#tools"
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Tools
              </a>
              <a
                href="#installation"
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Installation
              </a>
              <a
                href="#learning"
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Learning Path
              </a>
            </nav>

            <div className="flex items-center gap-4">
              {/* System status indicator */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-full">
                <Cpu className="w-3 h-3 text-modern-success dark:text-green-400 animate-pulse" />
                <span className="text-xs text-modern-success dark:text-green-400 font-medium">
                  ONLINE
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-modern-text dark:text-modern-dark-text rounded-sm hover:bg-gray-100 dark:hover:bg-modern-gray/30"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-gray-100 dark:border-modern-dark-border/50"
          >
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#tools"
                onClick={() => setMobileMenuOpen(false)}
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Tools
              </a>
              <a
                href="#installation"
                onClick={() => setMobileMenuOpen(false)}
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Installation
              </a>
              <a
                href="#learning"
                onClick={() => setMobileMenuOpen(false)}
                className="text-modern-text dark:text-modern-dark-text hover:text-modern-primary dark:hover:text-modern-dark-primary font-medium transition-colors"
              >
                Learning Path
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
