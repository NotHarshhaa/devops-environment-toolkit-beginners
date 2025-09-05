import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Copy, Check, Download, Github } from 'lucide-react'

const Installation = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'linux' | 'windows' | 'manual'>('linux')

  const commands = {
    linux: 'curl -fsSL https://raw.githubusercontent.com/NotHarshhaa/devops-environment-toolkit-beginners/master/install.sh | bash',
    windows: 'iwr -useb https://raw.githubusercontent.com/NotHarshhaa/devops-environment-toolkit-beginners/master/install.ps1 | iex',
    manual: `git clone https://github.com/NotHarshhaa/devops-environment-toolkit-beginners
cd devops-environment-toolkit-beginners
chmod +x install.sh
./install.sh`
  }

  const copyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(command)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const tabs = [
    { id: 'linux', label: 'Linux/macOS', icon: Terminal },
    { id: 'windows', label: 'Windows', icon: Terminal },
    { id: 'manual', label: 'Manual', icon: Github }
  ] as const

  return (
    <section className="py-12 md:py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            ⚡ Quick Installation
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get started in minutes with our one-command installation. 
            Choose your platform and run the command below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-devops-blue text-white'
                    : 'bg-gray-700 dark:bg-gray-600 text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-500'
                }`}
              >
                <tab.icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Command Display */}
          <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-gray-300 text-xs md:text-sm">
                <Terminal className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                Terminal
              </div>
              <button
                onClick={() => copyToClipboard(commands[activeTab])}
                className="flex items-center gap-2 px-2 md:px-3 py-1 bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 rounded text-xs md:text-sm text-gray-300 transition-colors flex-shrink-0"
              >
                {copiedCommand === commands[activeTab] ? (
                  <>
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                    <span className="hidden sm:inline">Copied!</span>
                    <span className="sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Copy</span>
                    <span className="sm:hidden">📋</span>
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto">
              <pre className="text-green-400 font-mono text-xs md:text-sm whitespace-pre-wrap break-all">
                {commands[activeTab]}
              </pre>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 md:w-5 md:h-5 text-devops-blue flex-shrink-0" />
                Prerequisites
              </h3>
              <ul className="text-gray-300 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li>• Internet connection</li>
                <li>• Administrator/Sudo access</li>
                <li>• Bash shell (Linux/macOS)</li>
                <li>• PowerShell 5.1+ (Windows)</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                Verification
              </h3>
              <p className="text-gray-300 text-xs md:text-sm mb-2">
                After installation, verify everything works:
              </p>
              <code className="text-green-400 font-mono text-xs md:text-sm bg-gray-900 dark:bg-gray-950 px-2 py-1 rounded block">
                ./verify.sh
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Installation
