import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  Download,
  Github,
  Laptop,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const Installation = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"linux" | "windows" | "manual">(
    "linux",
  );

  const commands = {
    linux:
      "curl -fsSL https://raw.githubusercontent.com/NotHarshhaa/devops-environment-toolkit-beginners/master/install.sh | bash",
    windows:
      "iwr -useb https://raw.githubusercontent.com/NotHarshhaa/devops-environment-toolkit-beginners/master/install.ps1 | iex",
    manual: `git clone https://github.com/NotHarshhaa/devops-environment-toolkit-beginners
cd devops-environment-toolkit-beginners
chmod +x install.sh
./install.sh`,
  };

  const copyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const tabs = [
    {
      id: "linux",
      label: "Linux/macOS",
      icon: Terminal,
      color: "green",
    },
    {
      id: "windows",
      label: "Windows",
      icon: Laptop,
      color: "blue",
    },
    {
      id: "manual",
      label: "Manual",
      icon: Github,
      color: "purple",
    },
  ] as const;

  return (
    <section
      id="installation"
      className="py-20 px-4 modern-bg relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full border border-green-100 dark:border-green-800/50">
            <span className="text-sm font-medium">Easy Setup</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-modern-text dark:text-modern-dark-text font-display">
            Quick <span className="gradient-text">Installation</span>
          </h2>

          <p className="text-lg md:text-xl text-modern-text-light dark:text-modern-dark-text-dim max-w-3xl mx-auto">
            Get started in minutes with our one-command installation. Choose
            your platform and run the command below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white dark:bg-modern-dark-card shadow-lg rounded-lg p-6 md:p-8 overflow-hidden border border-gray-100 dark:border-modern-dark-border"
        >
          {/* Status indicator */}
          <div className="mb-6 flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 rounded-md">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-700 dark:text-green-300 text-sm font-medium">
              System ready for installation
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              // Dynamically determine colors based on tab.color and active state
              const bgColor =
                activeTab === tab.id
                  ? tab.color === "green"
                    ? "bg-green-500 dark:bg-green-600"
                    : tab.color === "blue"
                      ? "bg-blue-500 dark:bg-blue-600"
                      : "bg-purple-500 dark:bg-purple-600"
                  : "bg-gray-100 dark:bg-modern-gray/30";

              const textColor =
                activeTab === tab.id
                  ? "text-white"
                  : "text-modern-text-light dark:text-modern-dark-text-dim";

              const hoverColor =
                !activeTab === !tab.id
                  ? ""
                  : tab.color === "green"
                    ? "hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400"
                    : tab.color === "blue"
                      ? "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                      : "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400";

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 text-sm md:text-base whitespace-nowrap border border-transparent ${bgColor} ${textColor} ${hoverColor}`}
                >
                  <tab.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Command Display */}
          <div className="bg-gray-50 dark:bg-modern-darker rounded-md p-4 mb-6 overflow-hidden border border-gray-200 dark:border-modern-dark-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-modern-text-light dark:text-modern-dark-text-dim text-sm">
                <Terminal className="w-4 h-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                <span className="font-mono">$ Run this command:</span>
              </div>
              <button
                onClick={() => copyToClipboard(commands[activeTab])}
                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-modern-dark-card hover:bg-gray-100 dark:hover:bg-modern-gray/30 border border-gray-200 dark:border-modern-dark-border rounded-sm text-sm text-modern-text dark:text-modern-dark-text transition-colors flex-shrink-0 shadow"
              >
                {copiedCommand === commands[activeTab] ? (
                  <>
                    <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto bg-modern-darker rounded-sm p-4">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-all">
                {commands[activeTab]}
              </pre>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-5 bg-white dark:bg-modern-dark-card border border-gray-100 dark:border-modern-dark-border rounded-md shadow">
              <h3 className="text-lg font-semibold text-modern-text dark:text-modern-dark-text mb-4 flex items-center gap-2 font-display">
                <AlertCircle className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                Prerequisites
              </h3>
              <ul className="space-y-3 text-modern-text-light dark:text-modern-dark-text-dim">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>Internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>Administrator/Sudo access</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>Bash shell (Linux/macOS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>PowerShell 5.1+ (Windows)</span>
                </li>
              </ul>
            </div>

            <div className="card p-5 bg-white dark:bg-modern-dark-card border border-gray-100 dark:border-modern-dark-border rounded-md shadow">
              <h3 className="text-lg font-semibold text-modern-text dark:text-modern-dark-text mb-4 flex items-center gap-2 font-display">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                Verification
              </h3>
              <p className="text-modern-text-light dark:text-modern-dark-text-dim mb-4">
                After installation, verify everything works:
              </p>
              <div className="bg-modern-darker rounded-sm p-3 font-mono text-sm mb-3">
                <div className="flex items-center gap-2 text-green-400">
                  <span>$</span>
                  <code>./verify.sh</code>
                </div>
              </div>
              <div className="flex items-center gap-2 text-modern-text-light dark:text-modern-dark-text-dim">
                <RefreshCw className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-spin" />
                <span className="text-sm">
                  System check will run automatically
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -right-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Installation;
