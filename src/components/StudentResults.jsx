import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import { supabase } from '../lib/supabaseClient'
import { getStudentAttempts } from '../services/studentService'

function StudentResults() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState([])
  const [filter, setFilter] = useState('all') // all, passed, failed

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/login'); return }
      const data = await getStudentAttempts(user.id)
      setAttempts(data)
    } catch (err) {
      console.error('Error loading results:', err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = attempts.filter(a => {
    if (filter === 'passed') return a.passed
    if (filter === 'failed') return !a.passed
    return true
  })

  const totalAttempts = attempts.length
  const passedCount = attempts.filter(a => a.passed).length
  const avgScore = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, a) => sum + (a.total_points > 0 ? (a.score / a.total_points) * 100 : 0), 0) / totalAttempts)
    : 0

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f6f6f8]">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading results...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
      <StudentSidebar />

      <main className="ml-64 flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-6">
          <nav className="flex text-sm text-slate-500 mb-2">
            <Link to="/student/dashboard" className="hover:text-[#5048e5] transition-colors">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 font-medium">Results</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-800">Quiz Results</h1>
          <p className="text-sm text-slate-500 mt-1">Review all your past quiz attempts and scores</p>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                <span className="material-icons-round">assignment</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Attempts</p>
                <h3 className="text-2xl font-bold text-slate-800">{totalAttempts}</h3>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <span className="material-icons-round">check_circle</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Passed</p>
                <h3 className="text-2xl font-bold text-slate-800">{passedCount}/{totalAttempts}</h3>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="material-icons-round">trending_up</span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg Score</p>
                <h3 className="text-2xl font-bold text-slate-800">{avgScore}%</h3>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['all', 'passed', 'failed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-[#5048e5] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {f} {f === 'all' ? `(${totalAttempts})` : f === 'passed' ? `(${passedCount})` : `(${totalAttempts - passedCount})`}
              </button>
            ))}
          </div>

          {/* Results Table */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <span className="material-icons-round text-5xl text-slate-300">history</span>
              <p className="text-slate-500 mt-3">No results found</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-semibold">Quiz</th>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Score</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((attempt) => {
                    const pct = attempt.total_points > 0 ? Math.round((attempt.score / attempt.total_points) * 100) : 0
                    return (
                      <tr key={attempt.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${attempt.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                              <span className="material-icons-round">quiz</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{attempt.quiz?.title || 'Quiz'}</p>
                              <p className="text-xs text-slate-500">{attempt.quiz?.unit?.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{attempt.quiz?.unit?.subject?.name || '—'}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{new Date(attempt.completed_at || attempt.started_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-800">{attempt.score}/{attempt.total_points}</span>
                          <span className="text-slate-400 text-sm ml-1">({pct}%)</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            attempt.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full ${attempt.passed ? 'bg-emerald-500' : 'bg-red-500'}"></span>
                            {attempt.passed ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default StudentResults
