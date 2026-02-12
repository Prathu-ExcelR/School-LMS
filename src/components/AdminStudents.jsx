import AdminSidebar from './AdminSidebar'

function AdminStudents() {
  const students = [
    { id: 1, name: 'Alex Johnson', email: 'alex@student.com', class: 'Class 10', parent: 'Jane Doe', subjects: 'Maths, Science, Physics', progress: '78%' },
    { id: 2, name: 'Emma Wilson', email: 'emma@student.com', class: 'Class 3', parent: 'Robert Wilson', subjects: 'Maths, English', progress: '85%' },
    { id: 3, name: 'Michael Brown', email: 'michael@student.com', class: 'Class 5', parent: 'Sarah Brown', subjects: 'English, Science', progress: '72%' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Student Management</h1>
          <p className="text-slate-500 text-sm mt-1">View student information and performance</p>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Parent Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrolled Subjects</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.parent}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.subjects}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: student.progress }}></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{student.progress}</span>
                      </div>
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
        </div>
      </main>
    </div>
  )
}

export default AdminStudents
