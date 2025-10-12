import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Code,
  Monitor,
  Server,
  Cloud,
  LineChart,
} from "lucide-react";

const LearningPath = () => {
  const weeks = [
    {
      week: 1,
      title: "Containerization",
      icon: Code,
      color: "blue",
      topics: [
        "Learn Docker basics",
        "Create your first Dockerfile",
        "Use Docker Compose for multi-container apps",
        "Practice with the sample application",
      ],
    },
    {
      week: 2,
      title: "Version Control & CI/CD",
      icon: BookOpen,
      color: "green",
      topics: [
        "Master Git workflows",
        "Set up GitHub Actions",
        "Learn about automated testing",
        "Explore the CI/CD pipeline",
      ],
    },
    {
      week: 3,
      title: "Infrastructure as Code",
      icon: Server,
      color: "purple",
      topics: [
        "Learn Terraform basics",
        "Deploy infrastructure to AWS",
        "Practice with Ansible",
        "Understand configuration management",
      ],
    },
    {
      week: 4,
      title: "Monitoring & Observability",
      icon: LineChart,
      color: "pink",
      topics: [
        "Set up Prometheus and Grafana",
        "Learn about metrics and dashboards",
        "Practice with logging (ELK stack)",
        "Understand distributed tracing",
      ],
    },
    {
      week: 5,
      title: "Kubernetes",
      icon: Server,
      color: "blue",
      topics: [
        "Learn kubectl commands",
        "Deploy applications to Kubernetes",
        "Use Helm for package management",
        "Practice with microservices",
      ],
    },
    {
      week: 6,
      title: "Cloud Platforms",
      icon: Cloud,
      color: "orange",
      topics: [
        "Explore AWS services",
        "Try Azure resources",
        "Learn Google Cloud Platform",
        "Practice multi-cloud strategies",
      ],
    },
  ];

  // Define color classes type
  type ColorType = "blue" | "green" | "purple" | "pink" | "orange";

  type ColorClasses = {
    [key in ColorType]: {
      bg: string;
      text: string;
      border: string;
      icon: string;
      accent: string;
      number: string;
      progress: string;
    };
  };

  // Get color classes based on color name
  const getColorClasses = (color: ColorType) => {
    const classes: ColorClasses = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800/50",
        icon: "text-blue-500 dark:text-blue-400",
        accent: "bg-blue-500 dark:bg-blue-400",
        number: "bg-blue-500 dark:bg-blue-600 text-white",
        progress: "bg-blue-500 dark:bg-blue-400",
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800/50",
        icon: "text-green-500 dark:text-green-400",
        accent: "bg-green-500 dark:bg-green-400",
        number: "bg-green-500 dark:bg-green-600 text-white",
        progress: "bg-green-500 dark:bg-green-400",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800/50",
        icon: "text-purple-500 dark:text-purple-400",
        accent: "bg-purple-500 dark:bg-purple-400",
        number: "bg-purple-500 dark:bg-purple-600 text-white",
        progress: "bg-purple-500 dark:bg-purple-400",
      },
      pink: {
        bg: "bg-pink-50 dark:bg-pink-900/20",
        text: "text-pink-600 dark:text-pink-400",
        border: "border-pink-200 dark:border-pink-800/50",
        icon: "text-pink-500 dark:text-pink-400",
        accent: "bg-pink-500 dark:bg-pink-400",
        number: "bg-pink-500 dark:bg-pink-600 text-white",
        progress: "bg-pink-500 dark:bg-pink-400",
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800/50",
        icon: "text-orange-500 dark:text-orange-400",
        accent: "bg-orange-500 dark:bg-orange-400",
        number: "bg-orange-500 dark:bg-orange-600 text-white",
        progress: "bg-orange-500 dark:bg-orange-400",
      },
    };
    return classes[color] || classes.blue;
  };

  // Get subtitle based on week number
  const getSubtitle = (week: number) => {
    switch (week) {
      case 1:
        return "Foundation";
      case 2:
        return "Automation";
      case 3:
        return "Infrastructure";
      case 4:
        return "Observability";
      case 5:
        return "Orchestration";
      case 6:
        return "Cloud Mastery";
      default:
        return "";
    }
  };

  return (
    <section
      id="learning"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-800/50">
            <span className="text-sm font-medium">Structured Learning</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-modern-text dark:text-modern-dark-text font-display">
            Your DevOps <span className="gradient-text">Learning Path</span>
          </h2>

          <p className="text-lg md:text-xl text-modern-text-light dark:text-modern-dark-text-dim max-w-3xl mx-auto">
            Follow our structured 6-week learning path designed specifically for
            DevOps beginners. Each week builds upon the previous, taking you
            from novice to confident practitioner.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-modern-dark-border -ml-0.5 md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12 relative">
            {weeks.map((week, index) => {
              const colors = getColorClasses(week.color as ColorType);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col ${
                    isEven
                      ? "md:flex-row"
                      : "md:flex-row-reverse text-right md:text-left"
                  } relative`}
                >
                  {/* Week number circle on the timeline */}
                  <div className="absolute left-6 md:left-1/2 -ml-5 md:-ml-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 border-4 border-white dark:border-modern-darker shadow-md transform md:-translate-x-1/2">
                    <div
                      className={`w-full h-full rounded-full ${colors.number} flex items-center justify-center font-bold text-lg`}
                    >
                      {week.week}
                    </div>
                  </div>

                  {/* Content panel */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pr-16" : "md:pl-16"
                    } mb-6 md:mb-0 relative`}
                  >
                    <div className="card card-hover bg-white dark:bg-modern-dark-card shadow-md border border-gray-100 dark:border-modern-dark-border rounded-lg p-5">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-12 h-12 rounded-md ${colors.bg} flex items-center justify-center ${colors.border}`}
                        >
                          <week.icon className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-modern-text dark:text-modern-dark-text font-display">
                            {week.title}
                          </h3>
                          <p
                            className={`text-sm ${colors.text} font-medium mt-1`}
                          >
                            {getSubtitle(week.week)} • Week {week.week}
                          </p>
                        </div>
                      </div>

                      {/* Topics list */}
                      <div className="space-y-3 mb-6">
                        <h4 className="text-modern-text dark:text-modern-dark-text font-medium">
                          Learning Objectives
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          {week.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex items-start gap-2"
                            >
                              <div
                                className={`w-1.5 h-1.5 ${colors.accent} rounded-full mt-2`}
                              ></div>
                              <span className="text-sm text-modern-text-light dark:text-modern-dark-text-dim">
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-modern-text-light dark:text-modern-dark-text-dim font-medium">
                            Learning Progress
                          </span>
                          <span
                            className={`text-xs font-medium ${colors.text}`}
                          >
                            {Math.round((week.week / 6) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-modern-gray/30 rounded-full h-1.5">
                          <div
                            className={`h-1.5 ${colors.progress} rounded-full transition-all duration-1000`}
                            style={{ width: `${(week.week / 6) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-modern-primary to-modern-secondary dark:from-modern-dark-primary dark:to-modern-dark-secondary p-0.5 rounded-xl shadow-xl max-w-3xl mx-auto overflow-hidden">
            <div className="bg-white dark:bg-modern-darker rounded-lg p-8 relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-modern-text dark:text-modern-dark-text font-display">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-modern-text-light dark:text-modern-dark-text-dim mb-8 max-w-xl mx-auto">
                Join thousands of DevOps beginners who have accelerated their
                learning with our toolkit.
              </p>
              <a
                href="#installation"
                className="btn-primary text-base md:text-lg px-8 py-3 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Start Learning Now
              </a>

              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 right-0 w-60 h-60 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default LearningPath;
