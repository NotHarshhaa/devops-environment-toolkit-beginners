import React from "react";
import { motion } from "framer-motion";
import {
  Container,
  GitBranch,
  Cloud,
  Monitor,
  Code,
  Database,
  Terminal,
  Server,
  Shield,
  Zap,
  HardDriveIcon,
  Info,
} from "lucide-react";

const ToolsGrid = () => {
  const toolCategories = [
    {
      title: "Containerization",
      icon: Container,
      color: "blue",
      tools: ["Docker", "Docker Compose"],
      description: "Container management and orchestration",
      status: "Active",
    },
    {
      title: "Version Control",
      icon: GitBranch,
      color: "green",
      tools: ["Git", "GitHub CLI"],
      description: "Code versioning and GitHub integration",
      status: "Online",
    },
    {
      title: "CI/CD",
      icon: Zap,
      color: "yellow",
      tools: ["GitHub Actions"],
      description: "Automated testing and deployment",
      status: "Ready",
    },
    {
      title: "Infrastructure",
      icon: Server,
      color: "purple",
      tools: ["Terraform", "Ansible"],
      description: "Infrastructure as Code and configuration management",
      status: "Deployed",
    },
    {
      title: "Monitoring",
      icon: Monitor,
      color: "pink",
      tools: ["Prometheus", "Grafana", "Jaeger"],
      description: "System and application monitoring",
      status: "Scanning",
    },
    {
      title: "Development",
      icon: Code,
      color: "blue",
      tools: ["VS Code", "Extensions"],
      description: "Enhanced development experience",
      status: "Loaded",
    },
    {
      title: "Cloud CLI",
      icon: Cloud,
      color: "orange",
      tools: ["AWS CLI", "Azure CLI", "GCP CLI"],
      description: "Multi-cloud management",
      status: "Connected",
    },
    {
      title: "Database",
      icon: Database,
      color: "red",
      tools: ["PostgreSQL", "Redis"],
      description: "Database and caching solutions",
      status: "Running",
    },
    {
      title: "Utilities",
      icon: Terminal,
      color: "green",
      tools: ["jq", "curl", "wget", "tree"],
      description: "Essential command-line tools",
      status: "Ready",
    },
  ];

  // Define color classes type
  type ColorType =
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "pink"
    | "orange"
    | "red";

  type ColorClasses = {
    [key in ColorType]: {
      bg: string;
      text: string;
      border: string;
      icon: string;
      accent: string;
    };
  };

  // Return background and text color classes based on the color name
  const getColorClasses = (color: ColorType) => {
    const classes: ColorClasses = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800/50",
        icon: "text-blue-500 dark:text-blue-400",
        accent: "bg-blue-500 dark:bg-blue-400",
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800/50",
        icon: "text-green-500 dark:text-green-400",
        accent: "bg-green-500 dark:bg-green-400",
      },
      yellow: {
        bg: "bg-amber-50 dark:bg-amber-900/20",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800/50",
        icon: "text-amber-500 dark:text-amber-400",
        accent: "bg-amber-500 dark:bg-amber-400",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800/50",
        icon: "text-purple-500 dark:text-purple-400",
        accent: "bg-purple-500 dark:bg-purple-400",
      },
      pink: {
        bg: "bg-pink-50 dark:bg-pink-900/20",
        text: "text-pink-600 dark:text-pink-400",
        border: "border-pink-200 dark:border-pink-800/50",
        icon: "text-pink-500 dark:text-pink-400",
        accent: "bg-pink-500 dark:bg-pink-400",
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800/50",
        icon: "text-orange-500 dark:text-orange-400",
        accent: "bg-orange-500 dark:bg-orange-400",
      },
      red: {
        bg: "bg-red-50 dark:bg-red-900/20",
        text: "text-red-600 dark:text-red-400",
        border: "border-red-200 dark:border-red-800/50",
        icon: "text-red-500 dark:text-red-400",
        accent: "bg-red-500 dark:bg-red-400",
      },
    };
    return classes[color] || classes.blue;
  };

  return (
    <section
      id="tools"
      className="py-20 px-4 modern-bg relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-modern-full border border-purple-100 dark:border-purple-800/50">
            <span className="text-sm font-medium">Complete DevOps Stack</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-modern-text dark:text-modern-dark-text font-display">
            Essential <span className="gradient-text">DevOps Tools</span> for
            Beginners
          </h2>

          <p className="text-lg md:text-xl text-modern-text-light dark:text-modern-dark-text-dim max-w-3xl mx-auto">
            Everything you need to start your DevOps journey. From
            containerization to monitoring, we&apos;ve got you covered with
            industry-standard tools configured for beginners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {toolCategories.map((category, index) => {
            const colors = getColorClasses(category.color as ColorType);

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="card card-hover group relative"
              >
                {/* Status badge */}
                <div
                  className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-modern-full ${colors.bg} ${colors.border}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${colors.accent} animate-pulse`}
                  ></div>
                  <span className={`text-xs font-medium ${colors.text}`}>
                    {category.status}
                  </span>
                </div>

                <div
                  className={`w-14 h-14 rounded-modern-md ${colors.bg} flex items-center justify-center mb-4`}
                >
                  <category.icon className={`w-7 h-7 ${colors.icon}`} />
                </div>

                <h3 className="text-xl font-semibold text-modern-text dark:text-modern-dark-text mb-2 font-display">
                  {category.title}
                </h3>

                <p className="text-modern-text-light dark:text-modern-dark-text-dim mb-4">
                  {category.description}
                </p>

                {/* Tools list with modern styling */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <HardDriveIcon className="w-4 h-4 text-modern-text-light dark:text-modern-dark-text-dim" />
                    <span className="text-sm font-medium text-modern-text dark:text-modern-dark-text">
                      Included Tools
                    </span>
                  </div>
                  <div className="space-y-2">
                    {category.tools.map((tool, toolIndex) => (
                      <div
                        key={tool}
                        className="flex items-center text-sm text-modern-text-light dark:text-modern-dark-text-dim"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-3 ${colors.accent}`}
                        ></div>
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info button */}
                <button
                  className={`mt-2 inline-flex items-center gap-1.5 text-sm font-medium ${colors.text} hover:underline`}
                >
                  <Info className="w-4 h-4" />
                  <span>Learn more</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ToolsGrid;
