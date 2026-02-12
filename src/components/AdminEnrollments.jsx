import AdminSidebar from './AdminSidebar'

function AdminEnrollments() {
  const enrollments = [
    { id: 1, student: 'Alex Johnson', subject: 'Mathematics', class: 'Class 10', enrolledDate: '2024-01-15', payment: 'Paid' },
    { id: 2, student: 'Emma Wilson', subject: 'Science', class: 'Class 3', enrolledDate: '2024-01-20', payment: 'Paid' },
    { id: 3, student: 'Michael Brown', subject: 'English', class: 'Class 5', enrolledDate: '2024-02-01', payment: 'Not Paid' },
    { id: 4, student: 'Alex Johnson', subject: 'Physics', class: 'Class 10', enrolledDate: '2024-01-15', payment: 'Paid' }
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Enrollment Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track student enrollments and payments</p>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrolled Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{enrollment.student}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{enrollment.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{enrollment.class}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{enrollment.enrolledDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        enrollment.payment === 'Paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {enrollment.payment}
                      </span>
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

export default AdminEnrollments
