import TeacherSidebar from './TeacherSidebar'

function TeacherAnalytics() {
  const subjectAnalytics = [
    { subject: 'Mathematics', class: 'Class 3', students: 45, avgScore: '78%', passRate: '82%', unitsCompleted: 8 },
    { subject: 'Science', class: 'Class 10', students: 52, avgScore: '85%', passRate: '90%', unitsCompleted: 6 },
    { subject: 'Physics', class: 'Class 10', students: 30, avgScore: '80%', passRate: '87%', unitsCompleted: 4 }
  ]

  const unitPerformance = [
    { unit: 'Numbers', subject: 'Mathematics', attempted: 45, passed: 37, failed: 8, avgScore: '75%' },
    { unit: 'Addition', subject: 'Mathematics', attempted: 45, passed: 40, failed: 5, avgScore: '82%' },
    { unit: 'Cell Structure', subject: 'Science', attempted: 52, passed: 47, failed: 5, avgScore: '88%' },
    { unit: 'Photosynthesis', subject: 'Science', attempted: 52, passed: 45, failed: 7, avgScore: '85%' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Performance insights and statistics</p>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-blue-600">school</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Students</p>
                  <h3 className="text-2xl font-bold text-slate-800">127</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-green-600">trending_up</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Avg Performance</p>
                  <h3 className="text-2xl font-bold text-slate-800">81%</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-purple-600">check_circle</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Pass Rate</p>
                  <h3 className="text-2xl font-bold text-slate-800">86%</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-orange-600">fact_check</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Attendance</p>
                  <h3 className="text-2xl font-bold text-slate-800">94%</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Subject Analytics</h2>
            <div className="space-y-4">
              {subjectAnalytics.map((subject, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800">{subject.subject}</h3>
                      <p className="text-sm text-slate-500">{subject.class}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                      {subject.students} Students
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Avg Score</p>
                      <p className="text-lg font-bold text-green-600">{subject.avgScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Pass Rate</p>
                      <p className="text-lg font-bold text-blue-600">{subject.passRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Units Completed</p>
                      <p className="text-lg font-bold text-purple-600">{subject.unitsCompleted}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Unit Performance Breakdown</h2>
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Unit</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Attempted</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Passed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Failed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Avg Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Pass Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {unitPerformance.map((unit, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{unit.unit}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{unit.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{unit.attempted}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{unit.passed}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">{unit.failed}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{unit.avgScore}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(unit.passed / unit.attempted) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">
                          {Math.round((unit.passed / unit.attempted) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherAnalytics
