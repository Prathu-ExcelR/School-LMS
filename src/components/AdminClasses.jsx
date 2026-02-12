import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { getClasses, addClass, updateClass, deleteClass, getSubjects } from '../services/adminService'

function AdminClasses() {
  const [showModal, setShowModal] = useState(false)
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [className, setClassName] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [classesData, subjectsData] = await Promise.all([
        getClasses(),
        getSubjects()
      ])
      setClasses(classesData)
      setSubjects(subjectsData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const getClassSubjects = (classId) => {
    const classSubjects = subjects.filter(s => s.class_id === classId)
    return classSubjects.map(s => s.name).join(', ') || 'No subjects yet'
  }

  const getStudentCount = (classId) => {
    // TODO: Implement student count when students are added
    return 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateClass(editingId, className)
      } else {
        await addClass(className)
      }
      setShowModal(false)
      setClassName('')
      setEditingId(null)
      loadData()
    } catch (error) {
      console.error('Error saving class:', error)
    }
  }

  const handleEdit = (cls) => {
    setEditingId(cls.id)
    setClassName(cls.name)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteClass(id)
        loadData()
      } catch (error) {
        console.error('Error deleting class:', error)
      }
    }
  }

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
                    <p className="text-sm text-slate-500 mt-1">{getStudentCount(cls.id)} Students</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(cls)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <span className="material-icons-round text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDelete(cls.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <span className="material-icons-round text-sm">delete</span>
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-2">Subjects:</p>
                  <p className="text-sm text-slate-700">{getClassSubjects(cls.id)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingId ? 'Edit Class' : 'Create New Class'}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Class Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., 5th Standard" 
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => {
                  setShowModal(false)
                  setClassName('')
                  setEditingId(null)
                }} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {editingId ? 'Update Class' : 'Create Class'}
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
