import { useState } from 'react'
import AdminSidebar from './AdminSidebar'

function AdminSubjects() {
  const [showModal, setShowModal] = useState(false)
  const [subjects] = useState([
    { id: 1, name: 'Mathematics', class: 'Class 3', teacher: 'Lana Smith', price: 'Free', students: 45, status: 'Active' },
    { id: 2, name: 'Science', class: 'Class 10', teacher: 'Lana Smith', price: 'Free', students: 52, status: 'Active' },
    { id: 3, name: 'English', class: 'Class 5', teacher: 'John Doe', price: 'Free', students: 42, status: 'Active' },
    { id: 4, name: 'Physics', class: 'Class 10', teacher: 'Sarah Johnson', price: '$50', students: 52, status: 'Active' }
  ])

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Subject Management</h1>
            <p className="text-slate-500 text-sm mt-1">Add and assign subjects</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="material-icons-round">add</span>
            Add Subject
          </button>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subject Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Teacher</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{subject.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{subject.class}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{subject.teacher}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{subject.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{subject.students}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {subject.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <span className="material-icons-round text-sm">edit</span>
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
            <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Subject</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Class</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Class</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  <option>Class 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Teacher</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Teacher</option>
                  <option>Lana Smith</option>
                  <option>John Doe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (Optional)</label>
                <input type="text" placeholder="Free or $50" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSubjects
