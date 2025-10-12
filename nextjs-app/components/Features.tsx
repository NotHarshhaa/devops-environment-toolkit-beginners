import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Clock,
  Users,
  Code,
  Database,
  ChevronRight,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Local Setup",
      description:
        "Get your entire DevOps environment running on your local machine in under 5 minutes with our optimized installation scripts.",
      iconColor: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      icon: Shield,
      title: "Beginner-Safe Configuration",
      description:
        "All tools come pre-configured with beginner-friendly settings and security best practices.",
      iconColor: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Clock,
      title: "Skip the Setup Hassle",
      description:
        "Skip weeks of manual configuration and environment setup. Focus on learning DevOps instead of fighting with installations.",
      iconColor: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Users,
      title: "Learning Community",
      description:
        "Join thousands of beginners learning DevOps together. Consistent environments for collaborative learning.",
      iconColor: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Code,
      title: "Beginner-First Design",
      description:
        "Built by DevOps practitioners, for beginners. Every tool is configured with learning and ease-of-use in mind.",
      iconColor: "text-pink-500 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
    },
    {
      icon: Database,
      title: "Complete Learning Stack",
      description:
        "From containers to monitoring, CI/CD to databases - everything you need to start your DevOps learning journey.",
      iconColor: "text-orange-500 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <section
      id="features"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-blue-50 dark:bg-blue-900/20 text-modern-primary dark:text-modern-dark-primary rounded-full border border-blue-100 dark:border-blue-800/50">
            <span className="text-sm font-medium">Why Choose Us</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-modern-text dark:text-modern-dark-text font-display">
            Designed for the DevOps{" "}
            <span className="gradient-text">Learning Journey</span>
          </h2>

          <p className="text-lg md:text-xl text-modern-text-light dark:text-modern-dark-text-dim max-w-3xl mx-auto">
            Experience the power of modern DevOps tools with a beginner-friendly
            approach that makes learning feel effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="card card-hover group"
            >
              <div
                className={`w-12 h-12 rounded-md ${feature.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>

              <h3 className="text-lg font-semibold text-modern-text dark:text-modern-dark-text mb-3 font-display">
                {feature.title}
              </h3>

              <p className="text-modern-text-light dark:text-modern-dark-text-dim leading-relaxed mb-4">
                {feature.description}
              </p>

              <div className="mt-auto pt-2 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <div className="inline-flex items-center text-modern-primary dark:text-modern-dark-primary font-medium">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-40 -right-40 w-80 h-80 bg-modern-accent/5 dark:bg-modern-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-modern-primary/5 dark:bg-modern-primary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Features;
