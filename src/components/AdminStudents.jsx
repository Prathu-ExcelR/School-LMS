import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { getStudents, getClasses, getEnrollments } from '../services/adminService'
import { supabase } from '../lib/supabaseClient'

function AdminStudents() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Fetch all data in parallel
      const [studentsData, classesData, enrollmentsData] = await Promise.all([
        getStudents(),
        getClasses(),
        getEnrollments()
      ])
      
      setStudents(studentsData || [])
      setClasses(classesData || [])
      setEnrollments(enrollmentsData || [])
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load student data')
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get class name by ID
  const getClassName = (classId) => {
    const cls = classes.find(c => c.id === classId)
    return cls ? cls.name : 'N/A'
  }

  // Helper function to get enrolled subjects for a student
  const getStudentSubjects = (studentId) => {
    const studentEnrollments = enrollments.filter(e => e.student_id === studentId)
    const subjectNames = studentEnrollments.map(e => e.subject?.name || 'Unknown')
    return subjectNames.length > 0 ? subjectNames.join(', ') : 'None'
  }

  // Helper function to get parent email (using student's email as placeholder)
  const getParentEmail = (student) => {
    // In a real app, you'd have a separate parents table
    // For now, we'll use a placeholder
    return `${student.name.toLowerCase().replace(' ', '.')}@parent.com`
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">Student Management</h1>
          <p className="text-slate-500 text-sm mt-1">View student information and performance</p>
        </header>

        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <span className="material-icons-round text-sm">error</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-500">Loading students...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">All Students ({students.length})</h2>
                <button 
                  onClick={loadData}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="material-icons-round text-sm">refresh</span>
                  Refresh
                </button>
              </div>
              
              {students.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons-round text-slate-400 text-2xl">school</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No students found</h3>
                  <p className="text-slate-500">Students will appear here once they register.</p>
                </div>
              ) : (
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
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{student.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{student.email || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{getClassName(student.class_id)}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{getParentEmail(student)}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{getStudentSubjects(student.id)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <span className="text-sm font-semibold text-slate-700">80%</span>
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
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminStudents
