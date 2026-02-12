function InfoSection() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                alt="Teacher helping a student on a tablet"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4H4gygfnlsH-BXgiZHB_FcUG6IscCdXtSXl7aHDe9EJqly_ak9H7ZZbtrxKDlJIE1pJj4RClQ8E5iG3YwwK8qUbqfiC27ciZGp9AhGFoVdP7fKsA90LFzC-zMj8XrisD9G7-l9AqDuvtkmdeElc37fmzOAVhzo7P2YqDB3kXCmiCM7wqe3YOLUIaJiouEf6xD7kzDmlpggM9fG34EuaDbSA4PE7Dlsg86ir1UNpbqWpJtI3IvjVlNN6TpmoFdBdkr9ZHxZ2qh68Y"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">&ldquo;EduPulse transformed our classroom dynamics.&rdquo;</p>
                <p className="text-sm opacity-80 mt-1">- Sarah Jenkins, Head Teacher</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-1/2 -left-12 transform -translate-y-1/2 w-full h-full border-2 border-primary/20 rounded-2xl"></div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Bridging the gap between <span className="text-primary">home and school</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe that education is a collaborative effort. Our platform provides the transparency needed to build trust and foster a supportive learning environment.
            </p>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <span className="material-icons">notifications_active</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Instant Notifications</h4>
                  <p className="mt-2 text-gray-600">
                    Never miss an assignment deadline or a parent-teacher meeting again with our smart alert system.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <span className="material-icons">devices</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Anywhere Access</h4>
                  <p className="mt-2 text-gray-600">
                    Whether you&apos;re on a desktop, tablet, or mobile, your classroom is always just a click away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
