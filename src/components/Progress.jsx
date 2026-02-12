import Sidebar from './Sidebar'

function Progress() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8] dark:bg-[#121121]">
      <Sidebar />
      
      <div className="ml-64 flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <nav className="flex text-sm text-slate-500">
              <a className="hover:text-[#5048e5] transition-colors" href="#">Home</a>
              <span className="mx-2">/</span>
              <span className="text-[#5048e5] font-medium">Progress Analytics</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700">
              <span className="material-icons-round text-slate-400 text-lg">calendar_today</span>
              <span className="text-sm font-medium">Spring Semester 2024</span>
              <span className="material-icons-round text-slate-400 text-lg cursor-pointer">expand_more</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 dark:text-white">Alex Johnson</div>
                <div className="text-xs text-slate-500">Grade 10</div>
              </div>
              <img 
                alt="Student profile picture" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7pelurVJvmp-DZ4csfxW62GGnHMMXLTNyom8wRyFjWKqh59-9bPNutnS3CIOih24uOQO8Wr-1EDTV0Mabwm8-Rf9Fcgbx_bnKjxMAOfJgJ2PGsRxh2KkkxEO8OVWMsIg88tezdX5nC9RdjkRlruJr39J6LPJK8fkOs9-4XMLZUinKSR0MKC10HZ-ZXvlti5LuY6OzOIJrcYBBNzywDUwTxxBAhB43qQ1F-IpDbrlE8g7Z9pAyw408Ac6zwliwagQ7QjvgOWIimoA"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Academic Overview</h1>
                <p className="text-slate-500 mt-1">Track your detailed performance across all enrolled courses.</p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[#5048e5] font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                <span className="material-icons-round text-lg">download</span>
                Export Report
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Current GPA</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">3.8</h3>
                  <span className="text-xs text-green-500 flex items-center gap-1 mt-1 font-medium">
                    <span className="material-icons-round text-xs">trending_up</span> +0.2 vs last term
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-icons-round">grade</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Attendance Rate</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">96%</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    No absences this week
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                  <span className="material-icons-round">fact_check</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Study Hours</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">24.5h</h3>
                  <span className="text-xs text-green-500 flex items-center gap-1 mt-1 font-medium">
                    <span className="material-icons-round text-xs">trending_up</span> +12% this week
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                  <span className="material-icons-round">schedule</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Assignments</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">12/15</h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    3 pending submission
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500">
                  <span className="material-icons-round">assignment_turned_in</span>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Charts */}
              <div className="lg:col-span-2 space-y-6">
                {/* Subject Performance Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Subject Performance</h2>
                    <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm text-slate-600 dark:text-slate-300 rounded-lg focus:ring-2 focus:ring-[#5048e5]/50 cursor-pointer py-1 px-3">
                      <option>Mid-Term Scores</option>
                      <option>Final Scores</option>
                      <option>Quizzes Average</option>
                    </select>
                  </div>
                  <div className="h-[200px] flex items-end gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                    {[
                      { name: 'Math', value: 85, color: 'bg-[#5048e5]' },
                      { name: 'Sci', value: 92, color: 'bg-indigo-500' },
                      { name: 'Hist', value: 78, color: 'bg-purple-500' },
                      { name: 'Eng', value: 88, color: 'bg-pink-500' },
                      { name: 'Art', value: 95, color: 'bg-teal-500' },
                      { name: 'PE', value: 100, color: 'bg-orange-500' }
                    ].map((subject) => (
                      <div key={subject.name} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                        <div className="absolute -top-8 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          {subject.value}%
                        </div>
                        <div className={`w-full ${subject.color} rounded-t transition-all hover:opacity-90`} style={{ height: `${subject.value}%` }}></div>
                        <div className="mt-2 text-xs font-medium text-slate-500">{subject.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Chart Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Overall Completion Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Total Completion</h2>
                    <p className="text-sm text-slate-500 mb-6">Overall progress across all active courses.</p>
                    <div className="relative flex items-center justify-center py-4">
                      <svg className="w-48 h-48" viewBox="0 0 36 36">
                        <path
                          className="stroke-slate-200 dark:stroke-slate-700"
                          fill="none"
                          strokeWidth="3.8"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="stroke-[#5048e5]"
                          fill="none"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeDasharray="78, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-slate-800 dark:text-white">78%</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Completed</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Keep it up! You're on track to finish early.</p>
                    </div>
                  </div>

                  {/* Upcoming Deadlines */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Upcoming Deadlines</h2>
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Math Algebra Quiz</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Due: Tomorrow, 10:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-white">History Essay Draft</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Due: Friday, 11:59 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Physics Lab Report</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Due: Next Monday</p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-2 text-sm text-[#5048e5] font-medium hover:bg-[#5048e5]/5 rounded-lg transition-colors">
                      View Calendar
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Sidebar Widgets */}
              <div className="space-y-6">
                {/* Parent Link Status */}
                <div className="bg-gradient-to-br from-[#5048e5] to-blue-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons-round text-white/90">family_restroom</span>
                        <span className="text-sm font-bold uppercase tracking-wider text-white/80">Parent Link</span>
                      </div>
                      <h3 className="text-lg font-bold">Connected</h3>
                      <p className="text-sm text-white/80 mt-1">Jane Doe (Mother)</p>
                    </div>
                    <div className="h-3 w-3 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse"></div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/20 relative z-10">
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <span>Last viewed</span>
                      <span>Today, 9:42 AM</span>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Milestones</h2>
                    <span className="text-xs font-semibold bg-[#5048e5]/10 text-[#5048e5] px-2 py-1 rounded">Total: 12</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center shrink-0">
                        <span className="material-icons-round text-yellow-600 dark:text-yellow-500 text-2xl">emoji_events</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">Math Whiz - Level 1</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Scored 95%+ in Algebra</p>
                        <div className="mt-1 text-[10px] text-slate-400 font-medium">Earned 2 days ago</div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                        <span className="material-icons-round text-green-600 dark:text-green-500 text-2xl">verified</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">Perfect Attendance</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Month of October</p>
                        <div className="mt-1 text-[10px] text-slate-400 font-medium">Earned 1 week ago</div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                        <span className="material-icons-round text-blue-600 dark:text-blue-500 text-2xl">psychology</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">Science Fair Finalist</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Project submission complete</p>
                        <div className="mt-1 text-[10px] text-slate-400 font-medium">Earned 2 weeks ago</div>
                      </div>
                    </div>
                  </div>
                  <a className="block p-3 text-center text-sm font-medium text-[#5048e5] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    View All Certificates
                  </a>
                </div>

                {/* Teacher Feedback */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Recent Feedback</h3>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 relative">
                    <span className="material-icons-round absolute top-2 left-2 text-slate-300 text-xl transform -scale-x-100">format_quote</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 pl-6 italic">
                      "Excellent improvement in essay structure, Alex. Keep focusing on your thesis statements."
                    </p>
                    <div className="mt-3 flex items-center gap-2 justify-end">
                      <img 
                        alt="Teacher profile picture" 
                        className="w-6 h-6 rounded-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0y6NTvupUpXzdG_BGnrSxSCMMtyB5yh2fS8AkSxQDInWKthJyAG9YB3uamtDODdn4wR_wSR2hVBS_yZU4qp2pFxMxBv1KQXE-DMuuPi-XcbawO_7kjHHv4tkkn8dzH-GNw5Q_UtMDns-hGU7GvfbOOoaxFJw5oWGTyMDyZmc5Ar5r-mO7xS7v8_k-f3FfUyaP2SBGd6exm5JejFyRZzhT7ERKyArBtNXkWPItQMEdlEYOlTS-RFCwQZHUc5jMBqu6ecKcD42zjnU"
                      />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Mrs. Robinson</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Spacer */}
            <div className="h-10"></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Progress
