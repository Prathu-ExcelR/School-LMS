function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to transform your school?</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of educators and students who are already unlocking their potential with EduPulse.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            className="bg-white text-primary font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            href="#"
          >
            Get Started Now
          </a>
          <a
            className="bg-primary-dark/40 border border-white/30 text-white font-semibold py-4 px-8 rounded-lg hover:bg-primary-dark/60 transition-colors backdrop-blur-sm"
            href="#"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
