import TeacherSidebar from './TeacherSidebar'

function TeacherStudents() {
  const students = [
    { id: 1, name: 'Alex Johnson', class: 'Class 10', subject: 'Mathematics', unitsCompleted: 6, totalUnits: 8, quizAvg: '75%', attendance: '96%', status: 'Active' },
    { id: 2, name: 'Emma Wilson', class: 'Class 3', subject: 'Mathematics', unitsCompleted: 8, totalUnits: 8, quizAvg: '85%', attendance: '100%', status: 'Active' },
    { id: 3, name: 'Michael Brown', class: 'Class 10', subject: 'Science', unitsCompleted: 4, totalUnits: 6, quizAvg: '88%', attendance: '92%', status: 'Active' },
    { id: 4, name: 'Sarah Davis', class: 'Class 10', subject: 'Science', unitsCompleted: 5, totalUnits: 6, quizAvg: '79%', attendance: '94%', status: 'Active' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">My Students</h1>
          <p className="text-slate-500 text-sm mt-1">Students enrolled in your subjects</p>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Units Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Quiz Avg</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Attendance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="material-icons-round text-blue-600">person</span>
                        </div>
                        <span className="text-sm font-medium text-slate-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.subject}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-24">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(student.unitsCompleted / student.totalUnits) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">
                          {student.unitsCompleted}/{student.totalUnits}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {student.quizAvg}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {student.attendance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <span className="material-icons-round text-sm">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="text-2xl font-bold text-slate-800">82%</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-purple-600">fact_check</span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Avg Attendance</p>
                  <h3 className="text-2xl font-bold text-slate-800">95%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherStudents
