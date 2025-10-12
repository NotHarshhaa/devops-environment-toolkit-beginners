"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-modern-full p-1">
        <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-modern-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-modern-primary dark:focus:ring-modern-dark-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-modern-darker"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        className="absolute top-1 left-1 w-4 h-4 bg-white dark:bg-modern-dark-primary rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 20 : 0,
          backgroundColor: theme === "dark" ? "#60A5FA" : "#ffffff",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === "light" ? (
          <Sun className="w-3 h-3 text-modern-warning" />
        ) : (
          <Moon className="w-3 h-3 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
