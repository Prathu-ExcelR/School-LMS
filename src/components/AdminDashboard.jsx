import AdminSidebar from './AdminSidebar'

function AdminDashboard() {
  const stats = [
    { title: 'Total Teachers', value: '24', icon: 'person', color: 'bg-blue-500' },
    { title: 'Total Students', value: '342', icon: 'school', color: 'bg-green-500' },
    { title: 'Total Classes', value: '12', icon: 'class', color: 'bg-purple-500' },
    { title: 'Total Subjects', value: '18', icon: 'menu_book', color: 'bg-orange-500' },
    { title: 'Active Courses', value: '45', icon: 'auto_stories', color: 'bg-indigo-500' },
    { title: 'Total Enrollments', value: '1,248', icon: 'assignment_turned_in', color: 'bg-teal-500' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">System Overview & Analytics</p>
        </header>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                    <span className="material-icons-round text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New teacher added', name: 'Sarah Johnson', time: '2 hours ago' },
                  { action: 'Class created', name: '11th Standard', time: '5 hours ago' },
                  { action: 'Subject assigned', name: 'Physics - Class 10', time: '1 day ago' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.name}</p>
                    </div>
                    <span className="text-xs text-slate-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="material-icons-round text-3xl">person_add</span>
                  <p className="text-sm font-semibold mt-2">Add Teacher</p>
                </button>
                <button className="p-4 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors">
                  <span className="material-icons-round text-3xl">add_circle</span>
                  <p className="text-sm font-semibold mt-2">Create Class</p>
                </button>
                <button className="p-4 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors">
                  <span className="material-icons-round text-3xl">library_add</span>
                  <p className="text-sm font-semibold mt-2">Add Subject</p>
                </button>
                <button className="p-4 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
                  <span className="material-icons-round text-3xl">assessment</span>
                  <p className="text-sm font-semibold mt-2">View Reports</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
