import { useState } from 'react'
import TeacherSidebar from './TeacherSidebar'

function TeacherAttendance() {
  const [selectedDate] = useState('2024-02-15')
  const [attendance] = useState([
    { id: 1, name: 'Alex Johnson', subject: 'Mathematics', status: 'Present', date: '2024-02-15' },
    { id: 2, name: 'Emma Wilson', subject: 'Mathematics', status: 'Present', date: '2024-02-15' },
    { id: 3, name: 'Michael Brown', subject: 'Science', status: 'Absent', date: '2024-02-15' },
    { id: 4, name: 'Sarah Davis', subject: 'Science', status: 'Present', date: '2024-02-15' }
  ])

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Attendance Tracking</h1>
          <p className="text-slate-500 text-sm mt-1">Mark and view student attendance</p>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Mark Attendance</h3>
              <div className="flex items-center gap-4">
                <input 
                  type="date" 
                  value={selectedDate}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Physics</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {attendance.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="material-icons-round text-blue-600">person</span>
                        </div>
                        <span className="text-sm font-medium text-slate-800">{record.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{record.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{record.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'Present' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded hover:bg-green-200">
                          Present
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded hover:bg-red-200">
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Total Students</p>
              <h3 className="text-2xl font-bold text-slate-800">127</h3>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Present Today</p>
              <h3 className="text-2xl font-bold text-green-600">120</h3>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Absent Today</p>
              <h3 className="text-2xl font-bold text-red-600">7</h3>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Attendance Rate</p>
              <h3 className="text-2xl font-bold text-blue-600">94%</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherAttendance
