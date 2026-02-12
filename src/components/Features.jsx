function Features() {
  const features = [
    {
      icon: 'local_library',
      title: 'Structured Learning',
      description: 'Organized curriculum paths tailored to individual student needs. Create modules, assignments, and quizzes effortlessly.',
      linkText: 'Learn more',
    },
    {
      icon: 'insights',
      title: 'Track Progress',
      description: 'Real-time analytics and grade tracking for students and teachers. Visualize performance trends and identify areas for improvement.',
      linkText: 'View analytics',
    },
    {
      icon: 'family_restroom',
      title: 'Parent Involvement',
      description: 'Seamless communication tools to keep guardians in the loop. Automated updates on attendance, grades, and school events.',
      linkText: 'Connect families',
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-gray-50 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase mb-2">Why Choose EduPulse</h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything you need to excel</p>
          <p className="text-lg text-gray-600">
            Our platform is designed to streamline administrative tasks and enhance the learning experience for everyone involved.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                <span className="material-icons text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <a className="mt-4 inline-flex items-center text-primary font-medium hover:underline" href="#">
                {feature.linkText} <span className="material-icons text-sm ml-1">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
