import AdminSidebar from './AdminSidebar'

function AdminReports() {
  const subjectPerformance = [
    { subject: 'Mathematics', class: 'Class 3', enrolled: 30, passed: 20, failed: 10, passRate: '67%' },
    { subject: 'Science', class: 'Class 10', enrolled: 52, passed: 45, failed: 7, passRate: '87%' },
    { subject: 'English', class: 'Class 5', enrolled: 42, passed: 38, failed: 4, passRate: '90%' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Performance insights and statistics</p>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-green-600">trending_up</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Overall Pass Rate</p>
                  <h3 className="text-2xl font-bold text-slate-800">82%</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-blue-600">school</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Avg. Attendance</p>
                  <h3 className="text-2xl font-bold text-slate-800">94%</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-purple-600">assignment</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Completion Rate</p>
                  <h3 className="text-2xl font-bold text-slate-800">76%</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Subject-wise Performance</h2>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Class</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Enrolled</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Passed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Failed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Pass Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjectPerformance.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{item.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.class}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.enrolled}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">{item.passed}</td>
                    <td className="px-6 py-4 text-sm text-red-600 font-semibold">{item.failed}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {item.passRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Teacher Activity Log</h2>
            <div className="space-y-3">
              {[
                { teacher: 'Lana Smith', activity: 'Uploaded study material', subject: 'Mathematics', time: '2 hours ago' },
                { teacher: 'John Doe', activity: 'Created quiz', subject: 'English', time: '5 hours ago' },
                { teacher: 'Sarah Johnson', activity: 'Last login', subject: 'History', time: '1 day ago' }
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="material-icons-round text-blue-600 text-sm">person</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{log.teacher}</p>
                      <p className="text-xs text-slate-500">{log.activity} - {log.subject}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminReports
