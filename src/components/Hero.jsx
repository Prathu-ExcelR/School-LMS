function Hero() {
  return (
    <section className="relative pt-20 pb-40 lg:pt-32 lg:pb-64 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-primary text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          New: Enhanced Analytics Dashboard
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
          Structured Learning,<br /> <span className="text-primary">Better Results</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Manage your entire school ecosystem from a single, intuitive interface. Provide students with the clarity they need to succeed and teachers with the insights to guide them.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-2"
            href="#"
          >
            Start Free Trial
            <span className="material-icons text-base">arrow_forward</span>
          </a>
          <a
            className="bg-white text-gray-700 border border-gray-200 hover:border-primary/50 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
            href="#"
          >
            <span className="material-icons text-primary text-xl">play_circle_outline</span>
            See How It Works
          </a>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mb-24 lg:-mb-48">
        <div className="relative rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden ring-1 ring-gray-900/5">
          {/* Browser Chrome Bar */}
          <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="bg-white text-xs text-gray-400 py-1 px-3 rounded-md inline-block border border-gray-200 w-64 truncate">
                app.edupulse.com/student/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex h-[400px] lg:h-[600px] bg-gray-50 text-left">
            {/* Sidebar */}
            <div className="w-16 lg:w-64 bg-white border-r border-gray-200 flex flex-col py-6">
              <div className="px-6 mb-8 hidden lg:flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="material-icons text-white text-sm">school</span>
                </div>
                <span className="font-bold text-lg text-gray-800">EduPulse</span>
              </div>

              <div className="flex flex-col gap-1 px-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg cursor-pointer">
                  <span className="material-icons">dashboard</span>
                  <span className="font-medium hidden lg:block">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <span className="material-icons">book</span>
                  <span className="font-medium hidden lg:block">My Courses</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <span className="material-icons">assignment</span>
                  <span className="font-medium hidden lg:block">Assignments</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <span className="material-icons">bar_chart</span>
                  <span className="font-medium hidden lg:block">Grades</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <span className="material-icons">calendar_today</span>
                  <span className="font-medium hidden lg:block">Schedule</span>
                </div>
              </div>

              <div className="mt-auto px-6 hidden lg:block">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-primary mb-1">Upcoming Exam</p>
                  <p className="text-xs text-gray-500 mb-3">Physics 101 Midterm in 2 days</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8 overflow-hidden relative">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, Alex! 👋</h2>
                  <p className="text-gray-500">You have 3 assignments due this week.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 shadow-sm">
                    <span className="material-icons">notifications</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKLZx-XNzfRi_uTkAYp8Get7_cAmCr31Y3q5rbRCpZFQDQdn_YSfAj3QJUy_1QJmGkENaxTF4NzUDalnxccTNWP9dbRN1c-2yBIawse79_YFhNBWlTn7-aACnHzk5eHaqIBFUABIcXUIXsc70lAdW9iohrcNRg9vlEaLS-4PiqzyVFXynKv2f8KqhU237B4MjFBdG_E20wVMGRT3sXH7J7h-M9OwZa3EArmu_2MVcX7VYuQXXTE0oaPXMPu9sroJgSEoH5TKP0a3w"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                      <span className="material-icons">check_circle</span>
                    </div>
                    <span className="text-xs font-semibold bg-green-50 text-green-600 px-2 py-1 rounded">+12%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">92%</h3>
                  <p className="text-sm text-gray-500">Average Grade</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-primary">
                      <span className="material-icons">access_time</span>
                    </div>
                    <span className="text-xs font-semibold bg-blue-50 text-primary px-2 py-1 rounded">On Track</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">24h</h3>
                  <p className="text-sm text-gray-500">Learning Time</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                      <span className="material-icons">emoji_events</span>
                    </div>
                    <span className="text-xs font-semibold bg-purple-50 text-purple-600 px-2 py-1 rounded">Top 10%</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">14</h3>
                  <p className="text-sm text-gray-500">Certificates Earned</p>
                </div>
              </div>

              {/* Continue Learning */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">Continue Learning</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 text-2xl font-bold">M</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Mathematics 101</h4>
                    <p className="text-xs text-gray-500 mb-2">Chapter 4: Calculus</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600">
                    <span className="material-icons">play_arrow</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold">S</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Science Lab</h4>
                    <p className="text-xs text-gray-500 mb-2">Unit 2: Chemistry Basics</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600">
                    <span className="material-icons">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative blurs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </section>
  )
}

export default Hero
