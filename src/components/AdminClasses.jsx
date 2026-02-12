import { useState } from 'react'
import AdminSidebar from './AdminSidebar'

function AdminClasses() {
  const [showModal, setShowModal] = useState(false)
  const [classes] = useState([
    { id: 1, name: '1st Standard', students: 45, subjects: 'Maths, English, Science' },
    { id: 2, name: '2nd Standard', students: 42, subjects: 'Maths, English, Science' },
    { id: 3, name: '3rd Standard', students: 48, subjects: 'Maths, English, Science, Social' },
    { id: 4, name: '10th Standard', students: 52, subjects: 'Maths, Physics, Chemistry, Biology' }
  ])

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Class Management</h1>
            <p className="text-slate-500 text-sm mt-1">Create and manage classes</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="material-icons-round">add</span>
            Create Class
          </button>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{cls.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{cls.students} Students</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <span className="material-icons-round text-sm">edit</span>
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <span className="material-icons-round text-sm">delete</span>
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-2">Subjects:</p>
                  <p className="text-sm text-slate-700">{cls.subjects}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create New Class</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Class Name</label>
                <input type="text" placeholder="e.g., 5th Standard" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminClasses
