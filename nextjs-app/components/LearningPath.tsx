import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, ArrowRight, BookOpen, Code, Monitor, Cpu, HardDrive, Zap } from 'lucide-react'

const LearningPath = () => {
  const weeks = [
    {
      week: 1,
      title: 'Containerization',
      icon: Code,
      color: 'retro-cyan',
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
      color: 'retro-green',
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
      color: 'retro-purple',
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
      color: 'retro-pink',
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
      color: 'retro-blue',
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
      color: 'retro-orange',
      topics: [
        'Explore AWS services',
        'Try Azure resources',
        'Learn Google Cloud Platform',
        'Practice multi-cloud strategies'
      ]
    }
  ]

  return (
    <section id="learning-path" className="py-12 md:py-20 px-4 retro-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-retro">
            <span className="neon-yellow">
              🎓 Learning Path
            </span>
          </h2>
          <p className="text-base md:text-xl text-retro-text-dim max-w-3xl mx-auto font-cyber">
            Follow our structured 6-week learning path to master DevOps fundamentals. 
            Each week builds upon the previous, taking you from beginner to confident practitioner.
          </p>
        </motion.div>

        {/* System Status */}
        <div className="terminal mb-8 p-4 bg-retro-darker border border-retro-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-retro-green animate-pulse" />
              <span className="text-retro-green text-sm font-mono">LEARNING_SYSTEM: ACTIVE</span>
              <div className="w-2 h-2 bg-retro-green rounded-none animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-3 h-3 text-retro-cyan" />
              <span className="text-retro-cyan text-xs font-mono">PROGRESS_TRACKING: ENABLED</span>
            </div>
          </div>
        </div>

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
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-${week.color} border border-${week.color} rounded-none flex items-center justify-center text-retro-dark font-retro font-bold text-lg md:text-xl shadow-lg neon-text`}>
                  {week.week}
                </div>
              </div>

              {/* Content */}
              <div className={`card border-${week.color} bg-retro-gray/80 backdrop-blur-sm flex-1`}>
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 bg-${week.color} border border-${week.color} rounded-none flex items-center justify-center`}>
                    <week.icon className="w-5 h-5 md:w-6 md:h-6 text-retro-dark" />
                  </div>
                  <div>
                    <h3 className={`text-xl md:text-2xl font-bold text-${week.color} font-retro`}>
                      Week {week.week}: {week.title}
                    </h3>
                    <p className="text-sm md:text-base text-retro-text-dim font-cyber">
                      {week.week === 1 && 'Foundation'}
                      {week.week === 2 && 'Automation'}
                      {week.week === 3 && 'Infrastructure'}
                      {week.week === 4 && 'Observability'}
                      {week.week === 5 && 'Orchestration'}
                      {week.week === 6 && 'Cloud Mastery'}
                    </p>
                  </div>
                </div>

                {/* Terminal-style topics list */}
                <div className="terminal bg-retro-darker border border-retro-border p-4 rounded-none">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-3 h-3 text-retro-green" />
                    <span className="text-retro-green text-xs font-mono">LEARNING_OBJECTIVES</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {week.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2 md:gap-3">
                        <div className="w-1 h-1 bg-retro-green rounded-none animate-pulse"></div>
                        <span className="text-xs md:text-sm text-retro-text font-mono">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-4 bg-retro-darker border border-retro-border rounded-none p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-retro-text-dim font-mono">COMPLETION</span>
                    <span className="text-xs text-retro-green font-mono">{Math.round((week.week / 6) * 100)}%</span>
                  </div>
                  <div className="w-full bg-retro-gray rounded-none h-1">
                    <div 
                      className={`h-1 bg-${week.color} rounded-none transition-all duration-1000`}
                      style={{ width: `${(week.week / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {index < weeks.length - 1 && (
                <div className="hidden lg:block">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-retro-text-dim animate-pulse" />
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
          <div className="card border-retro-cyan bg-retro-gray/80 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-retro-cyan mb-3 md:mb-4 font-retro">
              Ready to Start Your Journey?
            </h3>
            <p className="text-sm md:text-base text-retro-text-dim mb-4 md:mb-6 font-cyber">
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