import { useState } from 'react'
import TeacherSidebar from './TeacherSidebar'

function TeacherUnits() {
  const [showModal, setShowModal] = useState(false)
  const [units] = useState([
    { id: 1, name: 'Numbers', subject: 'Mathematics', order: 1, materials: 3, quiz: true, students: 45, avgScore: '75%' },
    { id: 2, name: 'Addition', subject: 'Mathematics', order: 2, materials: 4, quiz: true, students: 45, avgScore: '82%' },
    { id: 3, name: 'Subtraction', subject: 'Mathematics', order: 3, materials: 3, quiz: true, students: 45, avgScore: '68%' },
    { id: 4, name: 'Cell Structure', subject: 'Science', order: 1, materials: 5, quiz: true, students: 52, avgScore: '88%' },
    { id: 5, name: 'Photosynthesis', subject: 'Science', order: 2, materials: 4, quiz: true, students: 52, avgScore: '79%' }
  ])

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Unit Management</h1>
            <p className="text-slate-500 text-sm mt-1">Create and organize learning units</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="material-icons-round">add</span>
            Add Unit
          </button>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Unit Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Materials</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Quiz</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Avg Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {units.map((unit) => (
                  <tr key={unit.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-700">
                        {unit.order}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{unit.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{unit.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{unit.materials}</td>
                    <td className="px-6 py-4">
                      {unit.quiz ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Created
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{unit.students}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{unit.avgScore}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <span className="material-icons-round text-sm">edit</span>
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <span className="material-icons-round text-sm">folder</span>
                        </button>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                          <span className="material-icons-round text-sm">quiz</span>
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <span className="material-icons-round text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Unit</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Mathematics - Class 3</option>
                  <option>Science - Class 10</option>
                  <option>Physics - Class 10</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit Name</label>
                <input type="text" placeholder="e.g., Multiplication" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows="3" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order Number</label>
                <input type="number" placeholder="1" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherUnits
