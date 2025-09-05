module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Retro-tech color palette - more readable versions
        'retro-cyan': '#00bcd4',
        'retro-blue': '#2196f3',
        'retro-purple': '#9c27b0',
        'retro-pink': '#e91e63',
        'retro-green': '#4caf50',
        'retro-yellow': '#ffc107',
        'retro-orange': '#ff9800',
        'retro-red': '#f44336',
        'retro-dark': '#0a0a0a',
        'retro-darker': '#050505',
        'retro-gray': '#1a1a1a',
        'retro-light-gray': '#2a2a2a',
        'retro-text': '#00ff00',
        'retro-text-dim': '#00cc00',
        'retro-border': '#00bcd4',
        'retro-glow': '#00bcd4',
        // Light theme colors
        'retro-light-bg': '#f8f9fa',
        'retro-light-card': '#ffffff',
        'retro-light-text': '#2c3e50',
        'retro-light-text-dim': '#6c757d',
        'retro-light-border': '#dee2e6',
        // Keep original colors for compatibility
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        devops: {
          blue: '#2563eb',
          green: '#10b981',
          orange: '#f59e0b',
          purple: '#8b5cf6',
          red: '#ef4444',
        }
      },
      fontFamily: {
        'retro': ['Orbitron', 'Courier New', 'monospace'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'cyber': ['Rajdhani', 'Arial', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'scan-line': 'scanLine 2s linear infinite',
        'terminal-blink': 'terminalBlink 1s step-end infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        pulseNeon: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
            textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff'
          },
          '50%': { 
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff'
          },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        terminalBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'retro': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        'retro-purple': '0 0 10px #8000ff, 0 0 20px #8000ff, 0 0 30px #8000ff',
        'retro-pink': '0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080',
        'retro-green': '0 0 10px #00ff80, 0 0 20px #00ff80, 0 0 30px #00ff80',
      },
      textShadow: {
        'retro': '0 0 5px #00ffff, 0 0 10px #00ffff',
        'retro-purple': '0 0 5px #8000ff, 0 0 10px #8000ff',
        'retro-pink': '0 0 5px #ff0080, 0 0 10px #ff0080',
        'retro-green': '0 0 5px #00ff80, 0 0 10px #00ff80',
      },
    },
  },
  plugins: [],
}
