import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import { getTeacherSubjectDetails } from '../services/teacherService'
import { supabase } from '../lib/supabaseClient'

function TeacherSubjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('User not authenticated')
        setLoading(false)
        return
      }
      
      // Fetch teacher's subjects
      const subjectData = await getTeacherSubjectDetails(user.id)
      setSubjects(subjectData)
      
    } catch (err) {
      console.error('Error loading subjects:', err)
      setError('Failed to load subjects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <TeacherSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading subjects...</p>
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Subjects</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button 
              onClick={loadSubjects}
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
        <header className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
          <p className="text-slate-500 text-sm mt-1">Subjects assigned to you by admin</p>
        </header>

        <div className="p-8">
          {subjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Subjects Assigned</h3>
              <p className="text-slate-500 mb-6">You don't have any subjects assigned yet. Please contact your administrator.</p>
              <button 
                onClick={loadSubjects}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-32 ${subject.color} relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{subject.name}</h3>
                      <p className="text-sm opacity-90">{subject.class}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Students</p>
                        <p className="text-lg font-bold text-slate-800">{subject.students}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Units</p>
                        <p className="text-lg font-bold text-slate-800">{subject.units}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Materials</p>
                        <p className="text-lg font-bold text-slate-800">{subject.materials}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Quizzes</p>
                        <p className="text-lg font-bold text-slate-800">{subject.quizzes}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Avg Score</span>
                        <span className="text-lg font-bold text-green-600">{subject.avgScore}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link 
                        to={`/teacher/units?subject=${subject.id}`} 
                        className="px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors text-center"
                      >
                        View Units
                      </Link>
                      <Link 
                        to={`/teacher/students?subject=${subject.id}`} 
                        className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors text-center"
                      >
                        Students
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default TeacherSubjects
