module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Modern color palette
        "modern-primary": "#3B82F6", // Blue
        "modern-secondary": "#8B5CF6", // Purple
        "modern-accent": "#10B981", // Green
        "modern-warning": "#F59E0B", // Amber
        "modern-error": "#EF4444", // Red
        "modern-info": "#0EA5E9", // Sky blue
        "modern-success": "#22C55E", // Green
        "modern-dark": "#1E293B", // Slate dark
        "modern-darker": "#0F172A", // Slate darker
        "modern-light": "#F8FAFC", // Slate lightest
        "modern-gray": "#334155", // Slate gray
        "modern-light-gray": "#94A3B8", // Slate light gray
        "modern-text": "#0F172A", // Slate darkest
        "modern-text-light": "#64748B", // Slate medium
        "modern-border": "#E2E8F0", // Slate light
        "modern-hover": "#2563EB", // Blue hover

        // Gradients for backgrounds
        "modern-gradient-from": "#3B82F6", // Blue
        "modern-gradient-via": "#8B5CF6", // Purple
        "modern-gradient-to": "#D946EF", // Fuchsia

        // Dark mode colors
        "modern-dark-primary": "#60A5FA", // Blue lighter
        "modern-dark-secondary": "#A78BFA", // Purple lighter
        "modern-dark-accent": "#34D399", // Green lighter
        "modern-dark-bg": "#0F172A", // Slate darker
        "modern-dark-card": "#1E293B", // Slate dark
        "modern-dark-text": "#F1F5F9", // Slate lightest
        "modern-dark-text-dim": "#94A3B8", // Slate light gray
        "modern-dark-border": "#334155", // Slate gray

        // Keeping the retro colors for compatibility/migration
        "retro-cyan": "#00bcd4",
        "retro-blue": "#2196f3",
        "retro-purple": "#9c27b0",
        "retro-pink": "#e91e63",
        "retro-green": "#4caf50",
        "retro-yellow": "#ffc107",
        "retro-orange": "#ff9800",
        "retro-red": "#f44336",
        "retro-dark": "#0a0a0a",
        "retro-darker": "#050505",
        "retro-gray": "#1a1a1a",
        "retro-light-gray": "#2a2a2a",
        "retro-text": "#00ff00",
        "retro-text-dim": "#00cc00",
        "retro-border": "#00bcd4",
        "retro-glow": "#00bcd4",
        "retro-light-bg": "#f8f9fa",
        "retro-light-card": "#ffffff",
        "retro-light-text": "#2c3e50",
        "retro-light-text-dim": "#6c757d",
        "retro-light-border": "#dee2e6",
        // Original colors for compatibility
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        devops: {
          blue: "#2563eb",
          green: "#10b981",
          orange: "#f59e0b",
          purple: "#8b5cf6",
          red: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        // Keeping original fonts for compatibility
        retro: ["Orbitron", "Courier New", "monospace"],
        cyber: ["Rajdhani", "Arial", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-left": "slideLeft 0.5s ease-out",
        "slide-right": "slideRight 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        "gradient-x": "gradientX 10s ease infinite",
        "gradient-y": "gradientY 10s ease infinite",
        "gradient-xy": "gradientXY 10s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientX: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        gradientY: {
          "0%, 100%": {
            "background-position": "50% 0%",
          },
          "50%": {
            "background-position": "50% 100%",
          },
        },
        gradientXY: {
          "0%, 100%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
        },
      },
      borderRadius: {
        modern: "0.5rem",
        "modern-sm": "0.375rem",
        "modern-lg": "0.75rem",
        "modern-xl": "1rem",
        "modern-2xl": "1.5rem",
        "modern-full": "9999px",
      },
      boxShadow: {
        modern:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "modern-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "modern-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "modern-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "modern-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "modern-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        // Keeping original shadows for compatibility
        retro: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
        "retro-purple": "0 0 10px #8000ff, 0 0 20px #8000ff, 0 0 30px #8000ff",
        "retro-pink": "0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080",
        "retro-green": "0 0 10px #00ff80, 0 0 20px #00ff80, 0 0 30px #00ff80",
      },
      textShadow: {
        modern: "0 1px 2px rgba(0, 0, 0, 0.1)",
        "modern-lg": "0 2px 4px rgba(0, 0, 0, 0.1)",
        // Keeping original text shadows for compatibility
        retro: "0 0 5px #00ffff, 0 0 10px #00ffff",
        "retro-purple": "0 0 5px #8000ff, 0 0 10px #8000ff",
        "retro-pink": "0 0 5px #ff0080, 0 0 10px #ff0080",
        "retro-green": "0 0 5px #00ff80, 0 0 10px #00ff80",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "modern-gradient":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
