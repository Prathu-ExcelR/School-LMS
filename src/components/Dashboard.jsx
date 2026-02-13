import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import { supabase } from '../lib/supabaseClient'
import { getStudentDashboardStats, getEnrolledSubjects, getStudentAttempts } from '../services/studentService'

function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [studentName, setStudentName] = useState('')
  const [stats, setStats] = useState({ enrolledSubjects: 0, completedQuizzes: 0, passedQuizzes: 0, avgScore: 0 })
  const [enrolledSubjects, setEnrolledSubjects] = useState([])
  const [recentAttempts, setRecentAttempts] = useState([])

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }

      setStudentName(user.user_metadata?.name || user.email?.split('@')[0] || 'Student')

      const [dashStats, subjects, attempts] = await Promise.all([
        getStudentDashboardStats(user.id),
        getEnrolledSubjects(user.id),
        getStudentAttempts(user.id)
      ])

      setStats(dashStats)
      setEnrolledSubjects(subjects.slice(0, 3))
      setRecentAttempts(attempts.slice(0, 3))
    } catch (err) {
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  const subjectColors = [
    { bg: 'bg-indigo-50', icon: 'bg-indigo-500', text: 'text-indigo-600', iconName: 'functions' },
    { bg: 'bg-emerald-50', icon: 'bg-emerald-500', text: 'text-emerald-600', iconName: 'science' },
    { bg: 'bg-amber-50', icon: 'bg-amber-500', text: 'text-amber-600', iconName: 'history_edu' },
    { bg: 'bg-pink-50', icon: 'bg-pink-500', text: 'text-pink-600', iconName: 'palette' },
    { bg: 'bg-cyan-50', icon: 'bg-cyan-500', text: 'text-cyan-600', iconName: 'language' },
    { bg: 'bg-purple-50', icon: 'bg-purple-500', text: 'text-purple-600', iconName: 'computer' },
  ]

  const getColor = (index) => subjectColors[index % subjectColors.length]

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f6f6f8]">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading dashboard...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      <StudentSidebar />

      <main className="ml-64 flex-1 overflow-y-auto bg-[#f6f6f8]">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-[#f6f6f8]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {studentName} 👋</h1>
            <p className="text-sm text-slate-500">{dateStr}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-full transition-all">
              <span className="material-icons-round">notifications</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{studentName}</p>
                <span className="px-2 py-0.5 bg-[#5048e5]/10 text-[#5048e5] text-[10px] font-bold uppercase tracking-wider rounded-full">Student</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#5048e5] flex items-center justify-center text-white font-bold text-lg">
                {studentName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stat Cards */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                <span className="material-icons-round text-3xl">auto_stories</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Enrolled Subjects</p>
                <h3 className="text-2xl font-bold text-slate-900">{String(stats.enrolledSubjects).padStart(2, '0')}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <span className="material-icons-round text-3xl">assignment_turned_in</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Quizzes Completed</p>
                <h3 className="text-2xl font-bold text-slate-900">{String(stats.completedQuizzes).padStart(2, '0')}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <span className="material-icons-round text-3xl">emoji_events</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Quizzes Passed</p>
                <h3 className="text-2xl font-bold text-slate-900">{String(stats.passedQuizzes).padStart(2, '0')}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="material-icons-round text-3xl">trending_up</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Average Score</p>
                <h3 className="text-2xl font-bold text-slate-900">{stats.avgScore}%</h3>
              </div>
            </div>
          </section>

          {/* Subject Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">My Subjects</h2>
              <Link to="/student/my-subjects" className="text-[#5048e5] font-semibold flex items-center gap-1 hover:underline">
                View All <span className="material-icons-round text-sm">arrow_forward</span>
              </Link>
            </div>
            {enrolledSubjects.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <span className="material-icons-round text-6xl text-slate-300 mb-4">menu_book</span>
                <h3 className="text-lg font-bold text-slate-700 mb-2">No Subjects Yet</h3>
                <p className="text-slate-500 mb-6">Browse available courses and enroll to get started!</p>
                <Link to="/student/browse" className="px-6 py-3 bg-[#5048e5] hover:bg-[#5048e5]/90 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-2">
                  <span className="material-icons-round text-sm">explore</span>
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledSubjects.map((enrollment, idx) => {
                  const color = getColor(idx)
                  return (
                    <div key={enrollment.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                      <div className={`h-28 ${color.bg} relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                          <span className="material-icons-round text-9xl">{color.iconName}</span>
                        </div>
                        <div className="absolute bottom-3 left-4">
                          <span className={`px-3 py-1 ${color.icon} text-white text-[10px] font-bold uppercase rounded-full tracking-wider`}>
                            {enrollment.subject?.class?.name || 'General'}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-bold mb-1 text-slate-900">{enrollment.subject?.name}</h4>
                        <p className="text-slate-500 text-sm mb-4">{enrollment.subject?.description || 'No description'}</p>
                        <Link
                          to={`/student/my-subjects`}
                          className="w-full py-3 bg-[#5048e5] hover:bg-[#5048e5]/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          View Subject
                          <span className="material-icons-round text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Bottom: Recent Activity & Quick Actions */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Recent Quiz Attempts */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Quiz Activity</h2>
                <Link to="/student/results" className="text-slate-400 hover:text-[#5048e5] transition-colors text-sm font-medium">
                  View All →
                </Link>
              </div>
              {recentAttempts.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-icons-round text-4xl text-slate-300">quiz</span>
                  <p className="text-slate-500 mt-2">No quizzes attempted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentAttempts.map((attempt) => (
                    <div key={attempt.id} className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className={`min-w-[48px] h-12 ${attempt.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} rounded-lg flex items-center justify-center`}>
                        <span className="material-icons-round">{attempt.passed ? 'check_circle' : 'cancel'}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-sm text-slate-900">{attempt.quiz?.title || 'Quiz'}</h5>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {attempt.quiz?.unit?.subject?.name} • Score: {attempt.score}/{attempt.total_points}
                          ({attempt.total_points > 0 ? Math.round((attempt.score / attempt.total_points) * 100) : 0}%)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${attempt.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {attempt.passed ? 'Passed' : 'Failed'}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {new Date(attempt.completed_at || attempt.started_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-[#5048e5] p-6 rounded-xl text-white shadow-lg shadow-[#5048e5]/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <span className="material-icons-round text-4xl mb-4">rocket_launch</span>
                <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                <p className="text-white/80 text-sm">Jump right into your learning journey</p>
              </div>
              <div className="relative z-10 mt-6 space-y-3">
                <Link to="/student/quizzes" className="w-full py-2.5 bg-white text-[#5048e5] font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                  <span className="material-icons-round text-lg">quiz</span>
                  Take a Quiz
                </Link>
                <Link to="/student/browse" className="w-full py-2.5 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                  <span className="material-icons-round text-lg">explore</span>
                  Browse Courses
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
