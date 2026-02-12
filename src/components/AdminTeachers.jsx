import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { getTeachers, addTeacher, updateTeacher, deleteTeacher, getClasses, getSubjects, assignTeacherToSubjects, getTeacherAssignments } from '../services/adminService'
import { supabase } from '../lib/supabaseClient'

function AdminTeachers() {
  const [showModal, setShowModal] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [classes, setClasses] = useState([])
  const [allSubjects, setAllSubjects] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [teacherAssignments, setTeacherAssignments] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [loadingAssignments, setLoadingAssignments] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [teachersData, classesData, subjectsData] = await Promise.all([
        getTeachers(),
        getClasses(),
        getSubjects()
      ])
      setTeachers(teachersData)
      setClasses(classesData)
      setAllSubjects(subjectsData)
      
      // Load assignments for each teacher
      const assignments = {}
      for (const teacher of teachersData) {
        const teacherAssigns = await getTeacherAssignments(teacher.id)
        assignments[teacher.id] = teacherAssigns
      }
      setTeacherAssignments(assignments)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleClassToggle = (classId) => {
    setSelectedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    )
  }

  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    )
  }

  const getAvailableSubjects = () => {
    return allSubjects.filter(subject => 
      selectedClasses.includes(subject.class_id)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Update teacher info
        const updatedTeacher = await updateTeacher(editingId, { 
          name: formData.name, 
          phone: formData.phone 
        })
        
        // Update assignments - first delete existing, then add new
        // Delete existing assignments
        await supabase
          .from('teacher_assignments')
          .delete()
          .eq('teacher_id', editingId)
        
        // Add new assignments
        if (selectedSubjects.length > 0) {
          const assignments = selectedSubjects.map(subjectId => {
            const subject = allSubjects.find(s => s.id === subjectId)
            return {
              teacher_id: editingId,
              subject_id: subjectId,
              class_id: subject.class_id
            }
          })
          
          await assignTeacherToSubjects(editingId, assignments)
        }
        
        console.log('Teacher updated successfully:', updatedTeacher)
      } else {
        // Add new teacher
        const newTeacher = await addTeacher(formData)
        
        const assignments = selectedSubjects.map(subjectId => {
          const subject = allSubjects.find(s => s.id === subjectId)
          return {
            subject_id: subjectId,
            class_id: subject.class_id
          }
        })
        
        if (assignments.length > 0) {
          await assignTeacherToSubjects(newTeacher.id, assignments)
        }
      }
      
      setShowModal(false)
      setFormData({ name: '', email: '', phone: '' })
      setSelectedClasses([])
      setSelectedSubjects([])
      setEditingId(null)
      loadData()
    } catch (error) {
      console.error('Error saving teacher:', error)
      alert('Error saving teacher: ' + error.message)
    }
  }

  const handleEdit = async (teacher) => {
    setEditingId(teacher.id)
    setFormData({ name: teacher.name, email: teacher.email, phone: teacher.phone || '' })
    setLoadingAssignments(true)
    
    // Load existing assignments for this teacher
    try {
      const assignments = await getTeacherAssignments(teacher.id)
      
      // Set selected classes based on existing assignments
      const classIds = [...new Set(assignments.map(a => a.class_id))].filter(Boolean)
      setSelectedClasses(classIds)
      
      // Set selected subjects based on existing assignments
      const subjectIds = assignments.map(a => a.subject_id).filter(Boolean)
      setSelectedSubjects(subjectIds)
      
    } catch (error) {
      console.error('Error loading teacher assignments:', error)
      // Reset selections if loading fails
      setSelectedClasses([])
      setSelectedSubjects([])
    } finally {
      setLoadingAssignments(false)
    }
    
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteTeacher(id)
        loadData()
      } catch (error) {
        console.error('Error deleting teacher:', error)
      }
    }
  }

  const getTeacherClassesAndSubjects = (teacherId) => {
    const assignments = teacherAssignments[teacherId] || []
    const classes = [...new Set(assignments.map(a => a.class?.name))].filter(Boolean).join(', ')
    const subjects = [...new Set(assignments.map(a => a.subject?.name))].filter(Boolean).join(', ')
    return { classes: classes || '-', subjects: subjects || '-' }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Teacher Management</h1>
            <p className="text-slate-500 text-sm mt-1">Add, assign and manage teachers</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="material-icons-round">add</span>
            Add Teacher
          </button>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Classes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subjects</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {teachers.map((teacher) => {
                  const { classes: teacherClasses, subjects: teacherSubjects } = getTeacherClassesAndSubjects(teacher.id)
                  return (
                  <tr key={teacher.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{teacher.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{teacher.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{teacher.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{teacherClasses}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{teacherSubjects}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(teacher)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <span className="material-icons-round text-sm">edit</span>
                        </button>
                        <button onClick={() => handleDelete(teacher.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <span className="material-icons-round text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingId ? 'Edit Teacher' : 'Add New Teacher'}</h2>
            
            {loadingAssignments && editingId && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-blue-700">Loading existing assignments...</span>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={editingId}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed" 
                  />
                  {editingId && <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone (Optional)</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-slate-700 mb-3">Assign Classes (Select Multiple)</label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                  {classes.map(cls => (
                    <label key={cls.id} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedClasses.includes(cls.id)}
                        onChange={() => handleClassToggle(cls.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{cls.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedClasses.length > 0 && (
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Assign Subjects (Based on Selected Classes)
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-slate-200 rounded-lg">
                    {getAvailableSubjects().map(subject => (
                      <label key={subject.id} className="flex items-center gap-2 p-3 hover:bg-slate-50 rounded cursor-pointer border border-slate-100">
                        <input 
                          type="checkbox"
                          checked={selectedSubjects.includes(subject.id)}
                          onChange={() => handleSubjectToggle(subject.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-slate-700">{subject.name}</span>
                          <span className="text-xs text-slate-500 ml-2">({subject.class?.name})</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {getAvailableSubjects().length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No subjects available for selected classes. Please add subjects first.</p>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => {
                  setShowModal(false)
                  setFormData({ name: '', email: '', phone: '' })
                  setSelectedClasses([])
                  setSelectedSubjects([])
                  setEditingId(null)
                }} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {editingId ? 'Update Teacher' : 'Add Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTeachers
