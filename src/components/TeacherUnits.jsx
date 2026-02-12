import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import { getTeacherUnits, createUnit, updateUnit, deleteUnit } from '../services/teacherService'
import { supabase } from '../lib/supabaseClient'

function TeacherUnits() {
  const [showModal, setShowModal] = useState(false)
  const [editingUnit, setEditingUnit] = useState(null)
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [searchParams] = useSearchParams()
  const subjectId = searchParams.get('subject')

  useEffect(() => {
    loadUnits()
    loadSubjects()
  }, [subjectId])

  const loadUnits = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not authenticated')
        setLoading(false)
        return
      }
      
      const unitsData = await getTeacherUnits(user.id, subjectId)
      setUnits(unitsData)
      
    } catch (err) {
      console.error('Error loading units:', err)
      setError('Failed to load units')
    } finally {
      setLoading(false)
    }
  }

  const loadSubjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      // Get teacher's assigned subjects
      const { data, error } = await supabase
        .from('teacher_assignments')
        .select(`
          subject:subjects(id, name)
        `)
        .eq('teacher_id', user.id)
      
      if (!error && data) {
        const uniqueSubjects = [...new Map(data.map(item => [item.subject.id, item.subject])).values()]
        setSubjects(uniqueSubjects)
      }
    } catch (err) {
      console.error('Error loading subjects:', err)
    }
  }

  const handleAddUnit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const unitData = {
      name: formData.get('name'),
      description: formData.get('description'),
      subject_id: parseInt(formData.get('subject_id')),
      order_number: parseInt(formData.get('order_number'))
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      unitData.teacher_id = user.id
      
      if (editingUnit) {
        // Update existing unit
        await updateUnit(editingUnit.id, unitData)
      } else {
        // Create new unit
        await createUnit(unitData)
      }
      
      setShowModal(false)
      setEditingUnit(null)
      loadUnits()
      
      // Reset form
      e.target.reset()
    } catch (err) {
      console.error('Error saving unit:', err)
      alert('Failed to save unit')
    }
  }

  const handleEditUnit = (unit) => {
    setEditingUnit(unit)
    setShowModal(true)
  }

  const handleDeleteUnit = async (unitId) => {
    if (window.confirm('Are you sure you want to delete this unit? This will also delete all associated materials and quizzes.')) {
      try {
        await deleteUnit(unitId)
        loadUnits()
      } catch (err) {
        console.error('Error deleting unit:', err)
        alert('Failed to delete unit')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <TeacherSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading units...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-slate-50">
        <TeacherSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center p-8">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Units</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={loadUnits}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    )
  }

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
          {units.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <div className="text-slate-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Units Found</h3>
              <p className="text-slate-500 mb-6">{subjectId ? 'No units found for this subject.' : 'You haven\'t created any units yet.'}</p>
              <button 
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Your First Unit
              </button>
            </div>
          ) : (
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
                          <button 
                            onClick={() => handleEditUnit(unit)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit unit"
                          >
                            <span className="material-icons-round text-sm">edit</span>
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <span className="material-icons-round text-sm">folder</span>
                          </button>
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                            <span className="material-icons-round text-sm">quiz</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteUnit(unit.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete unit"
                          >
                            <span className="material-icons-round text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingUnit ? 'Edit Unit' : 'Add New Unit'}</h2>
            <form onSubmit={handleAddUnit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select 
                  name="subject_id" 
                  required
                  defaultValue={editingUnit?.subject_id || ''}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  defaultValue={editingUnit?.name || ''}
                  placeholder="e.g., Multiplication" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  rows="3" 
                  defaultValue={editingUnit?.description || ''}
                  placeholder="Brief description of what this unit covers"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order Number</label>
                <input 
                  type="number" 
                  name="order_number"
                  required
                  min="1"
                  defaultValue={editingUnit?.order || ''}
                  placeholder="1" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false)
                    setEditingUnit(null)
                  }} 
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingUnit ? 'Update Unit' : 'Add Unit'}
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
