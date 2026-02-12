import TeacherSidebar from './TeacherSidebar'

function TeacherDashboard() {
  const stats = [
    { title: 'Assigned Subjects', value: '3', icon: 'menu_book', color: 'bg-blue-500' },
    { title: 'Total Students', value: '127', icon: 'school', color: 'bg-green-500' },
    { title: 'Units Created', value: '18', icon: 'library_books', color: 'bg-purple-500' },
    { title: 'Pending Reviews', value: '5', icon: 'rate_review', color: 'bg-orange-500' },
    { title: 'Avg Performance', value: '78%', icon: 'trending_up', color: 'bg-teal-500' }
  ]

  const recentActivity = [
    { action: 'Quiz completed', student: 'Alex Johnson', subject: 'Mathematics', time: '2 hours ago' },
    { action: 'Material uploaded', subject: 'Science - Unit 3', time: '5 hours ago' },
    { action: 'New enrollment', student: 'Emma Wilson', subject: 'Mathematics', time: '1 day ago' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Teacher Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, manage your subjects and students</p>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                    <span className="material-icons-round">{stat.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-slate-500 text-sm mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">My Subjects</h3>
              <div className="space-y-3">
                {[
                  { name: 'Mathematics', class: 'Class 3', students: 45, units: 8, color: 'bg-blue-500' },
                  { name: 'Science', class: 'Class 10', students: 52, units: 6, color: 'bg-green-500' },
                  { name: 'Physics', class: 'Class 10', students: 30, units: 4, color: 'bg-purple-500' }
                ].map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {subject.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{subject.name}</h4>
                      <p className="text-xs text-slate-500">{subject.class} • {subject.students} Students • {subject.units} Units</p>
                    </div>
                    <span className="material-icons-round text-slate-400">arrow_forward</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.student || activity.subject}</p>
                    </div>
                    <span className="text-xs text-slate-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Unit Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { unit: 'Maths - Unit 1', attempted: 30, passed: 22, failed: 8, avg: '72%' },
                { unit: 'Science - Unit 2', attempted: 52, passed: 45, failed: 7, avg: '85%' },
                { unit: 'Physics - Unit 1', attempted: 30, passed: 25, failed: 5, avg: '80%' }
              ].map((unit, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-3">{unit.unit}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Attempted:</span>
                      <span className="font-semibold">{unit.attempted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Passed:</span>
                      <span className="font-semibold text-green-600">{unit.passed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Failed:</span>
                      <span className="font-semibold text-red-600">{unit.failed}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-slate-500">Average:</span>
                      <span className="font-bold text-blue-600">{unit.avg}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherDashboard
