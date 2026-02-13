import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import { supabase } from '../lib/supabaseClient'
import { getAllSubjects, getEnrolledSubjects, enrollInSubject, getStudentClassId } from '../services/studentService'

function BrowseCourses() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [allSubjects, setAllSubjects] = useState([])
  const [enrolledIds, setEnrolledIds] = useState(new Set())
  const [enrolling, setEnrolling] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }

      // Get student's class to filter subjects (fallback to all if missing)
      let classId = null
      try {
        classId = await getStudentClassId(user.id)
      } catch (e) {
        console.warn('Could not get student class_id, showing all subjects:', e.message)
      }
      console.log('Student classId:', classId)

      const [subjects, enrolled] = await Promise.all([
        getAllSubjects(classId),  // null classId = show all subjects
        getEnrolledSubjects(user.id)
      ])

      console.log('Subjects found:', subjects.length, subjects)
      setAllSubjects(subjects)

      setEnrolledIds(new Set(enrolled.map(e => e.subject?.id)))
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (subjectId) => {
    setEnrolling(subjectId)
    setMessage({ text: '', type: '' })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await enrollInSubject(user.id, subjectId)
      setEnrolledIds(prev => new Set([...prev, subjectId]))
      setMessage({ text: 'Successfully enrolled! Check "My Subjects".', type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (err) {
      console.error('Enrollment error:', err)
      setMessage({ text: 'Failed to enroll. You may already be enrolled.', type: 'error' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } finally {
      setEnrolling(null)
    }
  }

  const filteredSubjects = allSubjects.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.class?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const subjectIcons = ['functions', 'science', 'history_edu', 'palette', 'language', 'computer', 'psychology', 'biotech']
  const cardColors = [
    'from-indigo-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-blue-500',
    'from-purple-500 to-violet-600',
    'from-teal-500 to-emerald-600',
    'from-orange-500 to-red-500',
  ]

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f6f6f8]">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading courses...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      <StudentSidebar />

      <main className="ml-64 flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Available Courses</h1>
            <p className="text-sm text-slate-500">{allSubjects.length} courses available • {enrolledIds.size} enrolled</p>
          </div>
          <div className="relative w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons-round text-slate-400">search</span>
            </span>
            <input
              className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-[#5048e5] focus:border-[#5048e5] transition"
              placeholder="Search courses..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Toast */}
        {message.text && (
          <div className={`mx-8 mt-4 p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <span className="material-icons-round text-sm">{message.type === 'success' ? 'check_circle' : 'error'}</span>
            {message.text}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8">
          {/* Banner */}
          <div className="bg-gradient-to-r from-[#5048e5] to-blue-500 rounded-xl p-6 mb-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <span className="material-icons-round text-[200px] absolute -right-10 -top-10">auto_stories</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Expand Your Knowledge</h2>
              <p className="text-blue-100 max-w-lg">Enroll in new subjects to access study materials, take quizzes, and track your learning progress.</p>
            </div>
          </div>

          {/* Course Grid */}
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-icons-round text-6xl text-slate-300">search_off</span>
              <h3 className="text-lg font-bold text-slate-700 mt-4">No courses found</h3>
              <p className="text-slate-500 mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSubjects.map((subject, idx) => {
                const isEnrolled = enrolledIds.has(subject.id)
                const colorClass = cardColors[idx % cardColors.length]
                return (
                  <article key={subject.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                    <div className={`relative h-36 bg-gradient-to-br ${colorClass} overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                        <span className="material-icons-round text-white text-8xl">{subjectIcons[idx % subjectIcons.length]}</span>
                      </div>
                      {isEnrolled && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <span className="material-icons-round text-xs">check_circle</span>
                          Enrolled
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                          {subject.class?.name || 'General'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex-1 mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{subject.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{subject.description || 'No description available'}</p>
                      </div>
                      {isEnrolled ? (
                        <Link
                          to="/student/my-subjects"
                          className="w-full py-2.5 border-2 border-[#5048e5] text-[#5048e5] font-medium rounded-lg hover:bg-[#5048e5]/5 transition-colors flex items-center justify-center gap-2"
                        >
                          <span className="material-icons-round text-sm">visibility</span>
                          View Subject
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleEnroll(subject.id)}
                          disabled={enrolling === subject.id}
                          className="w-full py-2.5 bg-[#5048e5] hover:bg-[#5048e5]/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {enrolling === subject.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Enrolling...
                            </>
                          ) : (
                            <>
                              <span className="material-icons-round text-sm">add_circle</span>
                              Enroll Now
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default BrowseCourses
