import { useState, useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { supabase } from '../lib/supabaseClient'

function TeacherStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Get current teacher's ID
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Please login as a teacher')
        setLoading(false)
        return
      }
      
      // Get teacher's assigned subjects
      const { data: assignments, error: assignError } = await supabase
        .from('teacher_assignments')
        .select(`
          subject_id,
          class_id,
          subject:subjects(name),
          class:classes(name)
        `)
        .eq('teacher_id', user.id)
      
      if (assignError) throw assignError
      
      if (!assignments || assignments.length === 0) {
        setStudents([])
        setLoading(false)
        return
      }
      
      // Get all students enrolled in teacher's subjects
      const subjectIds = assignments.map(a => a.subject_id)
      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select(`
          student_id,
          subject_id,
          student:users(name, email, class_id),
          subject:subjects(name)
        `)
        .in('subject_id', subjectIds)
      
      if (enrollError) throw enrollError
      
      // Process unique students
      const uniqueStudents = {}
      enrollments.forEach(enrollment => {
        const studentId = enrollment.student_id
        if (!uniqueStudents[studentId]) {
          uniqueStudents[studentId] = {
            id: studentId,
            name: enrollment.student?.name || 'Unknown Student',
            email: enrollment.student?.email || 'N/A',
            class: enrollment.student?.class_id ? 
              assignments.find(a => a.class_id === enrollment.student.class_id)?.class?.name || 'N/A' : 'N/A',
            subjects: [],
            unitsCompleted: 4, // Placeholder
            totalUnits: 8,     // Placeholder
            quizAvg: '80%',    // Placeholder
            attendance: '95%', // Placeholder
            status: 'Active'
          }
        }
        if (enrollment.subject?.name && !uniqueStudents[studentId].subjects.includes(enrollment.subject.name)) {
          uniqueStudents[studentId].subjects.push(enrollment.subject.name)
        }
      })
      
      setStudents(Object.values(uniqueStudents))
    } catch (err) {
      console.error('Error loading students:', err)
      setError('Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">My Students</h1>
          <p className="text-slate-500 text-sm mt-1">Students enrolled in your subjects</p>
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
            <>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">My Students ({students.length})</h2>
                  <button 
                    onClick={loadStudents}
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
                    <p className="text-slate-500">Students enrolled in your subjects will appear here.</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subjects</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Units Progress</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Quiz Avg</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Attendance</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="material-icons-round text-blue-600">person</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{student.subjects.join(', ') || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-200 rounded-full h-2 w-24">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${(student.unitsCompleted / student.totalUnits) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-slate-700">
                                {student.unitsCompleted}/{student.totalUnits}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                              {student.quizAvg}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              {student.attendance}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              {student.status}
                            </span>
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

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="material-icons-round text-blue-600">school</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Total Students</p>
                      <h3 className="text-2xl font-bold text-slate-800">{students.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="material-icons-round text-green-600">trending_up</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Avg Performance</p>
                      <h3 className="text-2xl font-bold text-slate-800">82%</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="material-icons-round text-purple-600">fact_check</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Avg Attendance</p>
                      <h3 className="text-2xl font-bold text-slate-800">95%</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default TeacherStudents
