import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Copy, Check, Download, Github, Cpu, HardDrive, Zap } from 'lucide-react'

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
    { id: 'linux', label: 'Linux/macOS', icon: Terminal, color: 'retro-green' },
    { id: 'windows', label: 'Windows', icon: Terminal, color: 'retro-blue' },
    { id: 'manual', label: 'Manual', icon: Github, color: 'retro-purple' }
  ] as const

  return (
    <section id="installation" className="py-12 md:py-20 px-4 retro-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-retro">
            <span className="neon-green">
              ⚡ Quick Installation
            </span>
          </h2>
          <p className="text-base md:text-xl text-retro-text-dim max-w-3xl mx-auto font-cyber">
            Get started in minutes with our one-command installation. 
            Choose your platform and run the command below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="terminal bg-retro-darker border border-retro-border rounded-none p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          {/* System Status Header */}
          <div className="terminal mb-6 p-3 bg-retro-gray border border-retro-cyan">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-retro-green animate-pulse" />
                <span className="text-retro-green text-sm font-mono">SYSTEM_STATUS: READY</span>
                <div className="w-2 h-2 bg-retro-green rounded-none animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-3 h-3 text-retro-cyan" />
                <span className="text-retro-cyan text-xs font-mono">INSTALLATION_MODE</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-none font-mono transition-colors text-sm md:text-base whitespace-nowrap border ${
                  activeTab === tab.id
                    ? `bg-${tab.color} text-retro-dark border-${tab.color}`
                    : 'bg-retro-gray text-retro-text-dim border-retro-border hover:border-retro-cyan'
                }`}
              >
                <tab.icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Command Display */}
          <div className="terminal bg-retro-gray border border-retro-green rounded-none p-3 md:p-4 mb-4 overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-retro-text-dim text-xs md:text-sm">
                <Terminal className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-retro-green" />
                <span className="font-mono">devops-toolkit@install:~$</span>
              </div>
              <button
                onClick={() => copyToClipboard(commands[activeTab])}
                className="flex items-center gap-2 px-2 md:px-3 py-1 bg-retro-darker border border-retro-border hover:border-retro-cyan rounded-none text-xs md:text-sm text-retro-text transition-colors flex-shrink-0 font-mono"
              >
                {copiedCommand === commands[activeTab] ? (
                  <>
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-retro-green" />
                    <span className="hidden sm:inline">COPIED</span>
                    <span className="sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">COPY</span>
                    <span className="sm:hidden">📋</span>
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto">
              <pre className="text-retro-green font-mono text-xs md:text-sm whitespace-pre-wrap break-all">
                <span className="text-retro-green">$</span> {commands[activeTab]}
              </pre>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="terminal bg-retro-gray border border-retro-blue rounded-none p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-retro-blue mb-2 md:mb-3 flex items-center gap-2 font-retro">
                <Download className="w-4 h-4 md:w-5 md:h-5 text-retro-blue flex-shrink-0" />
                PREREQUISITES
              </h3>
              <div className="terminal bg-retro-darker border border-retro-border p-3 rounded-none">
                <ul className="text-retro-text-dim space-y-1 md:space-y-2 text-xs md:text-sm font-mono">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-retro-green rounded-none"></div>
                    Internet connection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-retro-green rounded-none"></div>
                    Administrator/Sudo access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-retro-green rounded-none"></div>
                    Bash shell (Linux/macOS)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-retro-green rounded-none"></div>
                    PowerShell 5.1+ (Windows)
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="terminal bg-retro-gray border border-retro-green rounded-none p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-retro-green mb-2 md:mb-3 flex items-center gap-2 font-retro">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-retro-green flex-shrink-0" />
                VERIFICATION
              </h3>
              <div className="terminal bg-retro-darker border border-retro-border p-3 rounded-none">
                <p className="text-retro-text-dim text-xs md:text-sm mb-2 font-mono">
                  After installation, verify everything works:
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-retro-green font-mono text-xs">$</span>
                  <code className="text-retro-green font-mono text-xs md:text-sm bg-retro-gray px-2 py-1 rounded-none block">
                    ./verify.sh
                  </code>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-retro-yellow animate-pulse" />
                  <span className="text-xs text-retro-yellow font-mono">SYSTEM_CHECK_IN_PROGRESS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Installation