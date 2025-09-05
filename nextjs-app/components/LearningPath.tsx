import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, ArrowRight, BookOpen, Code, Monitor } from 'lucide-react'

const LearningPath = () => {
  const weeks = [
    {
      week: 1,
      title: 'Containerization',
      icon: Code,
      color: 'bg-blue-500',
      topics: [
        'Learn Docker basics',
        'Create your first Dockerfile',
        'Use Docker Compose for multi-container apps',
        'Practice with the sample application'
      ]
    },
    {
      week: 2,
      title: 'Version Control & CI/CD',
      icon: BookOpen,
      color: 'bg-green-500',
      topics: [
        'Master Git workflows',
        'Set up GitHub Actions',
        'Learn about automated testing',
        'Explore the CI/CD pipeline'
      ]
    },
    {
      week: 3,
      title: 'Infrastructure as Code',
      icon: Monitor,
      color: 'bg-purple-500',
      topics: [
        'Learn Terraform basics',
        'Deploy infrastructure to AWS',
        'Practice with Ansible',
        'Understand configuration management'
      ]
    },
    {
      week: 4,
      title: 'Monitoring & Observability',
      icon: Monitor,
      color: 'bg-red-500',
      topics: [
        'Set up Prometheus and Grafana',
        'Learn about metrics and dashboards',
        'Practice with logging (ELK stack)',
        'Understand distributed tracing'
      ]
    },
    {
      week: 5,
      title: 'Kubernetes',
      icon: Code,
      color: 'bg-indigo-500',
      topics: [
        'Learn kubectl commands',
        'Deploy applications to Kubernetes',
        'Use Helm for package management',
        'Practice with microservices'
      ]
    },
    {
      week: 6,
      title: 'Cloud Platforms',
      icon: Monitor,
      color: 'bg-orange-500',
      topics: [
        'Explore AWS services',
        'Try Azure resources',
        'Learn Google Cloud Platform',
        'Practice multi-cloud strategies'
      ]
    }
  ]

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            🎓 Learning Path
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow our structured 6-week learning path to master DevOps fundamentals. 
            Each week builds upon the previous, taking you from beginner to confident practitioner.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {weeks.map((week, index) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-6 md:gap-8"
            >
              {/* Week Number & Icon */}
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 md:w-20 md:h-20 ${week.color} rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg`}>
                  {week.week}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${week.color} rounded-lg flex items-center justify-center`}>
                    <week.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Week {week.week}: {week.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      {week.week === 1 && 'Foundation'}
                      {week.week === 2 && 'Automation'}
                      {week.week === 3 && 'Infrastructure'}
                      {week.week === 4 && 'Observability'}
                      {week.week === 5 && 'Orchestration'}
                      {week.week === 6 && 'Cloud Mastery'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {week.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-2 md:gap-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {index < weeks.length - 1 && (
                <div className="hidden lg:block">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
              Join thousands of developers who have accelerated their DevOps learning with our toolkit.
            </p>
            <button className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LearningPath
