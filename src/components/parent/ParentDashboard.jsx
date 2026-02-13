import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ParentSidebar from './ParentSidebar'
import { supabase } from '../../lib/supabaseClient'
import { getParentChildren, getChildProgressData } from '../../services/parentService'

function ParentDashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [children, setChildren] = useState([])
    const [selectedChild, setSelectedChild] = useState(null)
    const [progressData, setProgressData] = useState(null)

    useEffect(() => {
        loadParentData()
    }, [])

    useEffect(() => {
        if (selectedChild) {
            console.log('selectedChild changed:', selectedChild)
            console.log('student_id to use:', selectedChild.student_id)
            loadChildProgress(selectedChild.student_id)
        }
    }, [selectedChild])

    const loadParentData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { navigate('/login'); return }

            console.log('Current parent user:', user.id)

            const childrenData = await getParentChildren(user.id)
            console.log('Children data loaded:', childrenData)
            setChildren(childrenData)

            // Auto-select first child if available
            if (childrenData.length > 0) {
                console.log('Setting selected child:', childrenData[0])
                setSelectedChild(childrenData[0])
            }
        } catch (err) {
            console.error('Error loading parent data:', err)
        } finally {
            setLoading(false)
        }
    }

    const loadChildProgress = async (studentId) => {
        try {
            console.log('Loading progress for student:', studentId)
            const data = await getChildProgressData(studentId)
            console.log('Progress data received:', data)
            setProgressData(data)
        } catch (err) {
            console.error('Error loading child progress:', err)
        }
    }

    const barColors = ['bg-[#5048e5]', 'bg-emerald-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-amber-500']

    if (loading) {
        return (
            <div className="flex h-screen bg-[#f6f6f8]">
                <ParentSidebar />
                <main className="flex-1 flex items-center justify-center ml-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5048e5] mx-auto"></div>
                        <p className="mt-4 text-slate-500">Loading dashboard...</p>
                    </div>
                </main>
            </div>
        )
    }

    // No children linked
    if (children.length === 0) {
        return (
            <div className="flex h-screen bg-[#f6f6f8]">
                <ParentSidebar />
                <main className="flex-1 flex items-center justify-center ml-64">
                    <div className="text-center bg-white rounded-xl p-8 shadow-sm border border-slate-200 max-w-md">
                        <span className="material-icons text-6xl text-slate-300">family_restroom</span>
                        <h2 className="text-xl font-bold text-slate-800 mt-4">No Children Linked</h2>
                        <p className="text-slate-500 mt-2">Your account is not linked to any student account yet. Please contact the school administrator.</p>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
            <ParentSidebar />

            <div className="ml-64 flex-1 flex flex-col h-full overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shrink-0 justify-between">
                    <nav className="flex text-sm text-slate-500">
                        <Link to="/parent/dashboard" className="hover:text-[#5048e5] transition-colors">
                            <span className="text-[#5048e5] font-medium">Parent Dashboard</span>
                        </Link>
                    </nav>

                    {/* Child Selector */}
                    {children.length > 1 && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Viewing:</span>
                            <select
                                value={selectedChild?.student_id || ''}
                                onChange={(e) => {
                                    const child = children.find(c => c.student_id === e.target.value)
                                    setSelectedChild(child)
                                }}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#5048e5] focus:border-transparent outline-none"
                            >
                                {children.map((child) => (
                                    <option key={child.student_id} value={child.student_id}>
                                        {child.student?.name || 'Unknown'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Child Info Header */}
                        {selectedChild?.student && (
                            <div className="bg-gradient-to-r from-[#5048e5] to-purple-600 rounded-xl p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="material-icons text-3xl">person</span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">{selectedChild.student.name}</h1>
                                        <p className="text-purple-100">{selectedChild.student.email}</p>
                                        {selectedChild.student.class && (
                                            <p className="text-sm text-purple-200 mt-1">Class: {selectedChild.student.class.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {progressData && (
                            <>
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium mb-1">Avg Score</p>
                                            <h3 className="text-2xl font-bold text-slate-800">{progressData.stats.avgScore || 0}%</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                                            <span className="material-icons-round">grade</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium mb-1">Enrolled Subjects</p>
                                            <h3 className="text-2xl font-bold text-slate-800">{progressData.stats.enrolledSubjects || 0}</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                                            <span className="material-icons-round">menu_book</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium mb-1">Quizzes Completed</p>
                                            <h3 className="text-2xl font-bold text-slate-800">{progressData.stats.completedQuizzes || 0}</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                                            <span className="material-icons-round">assignment_turned_in</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium mb-1">Pass Rate</p>
                                            <h3 className="text-2xl font-bold text-slate-800">
                                                {progressData.stats.completedQuizzes > 0 ? Math.round((progressData.stats.passedQuizzes / progressData.stats.completedQuizzes) * 100) : 0}%
                                            </h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                            <span className="material-icons-round">trending_up</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Subject Performance Chart */}
                                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                                        <h2 className="text-lg font-bold text-slate-800 mb-6">Subject Performance</h2>
                                        {progressData.subjectPerformance.length === 0 ? (
                                            <div className="text-center py-8 text-slate-400">
                                                <span className="material-icons-round text-4xl">bar_chart</span>
                                                <p className="mt-2">No quiz data available yet</p>
                                            </div>
                                        ) : (
                                            <div className="h-[220px] flex items-end gap-6 pb-4 border-b border-slate-200">
                                                {progressData.subjectPerformance.map((subj, idx) => (
                                                    <div key={subj.id} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                                                        <div className="absolute -top-8 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            {subj.avg}% avg
                                                        </div>
                                                        <div
                                                            className={`w-full ${barColors[idx % barColors.length]} rounded-t transition-all hover:opacity-90`}
                                                            style={{ height: `${Math.max(subj.avg, 5)}%` }}
                                                        ></div>
                                                        <div className="mt-2 text-xs font-medium text-slate-500 text-center truncate w-full">{subj.name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Completion Ring */}
                                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Pass Rate</h2>
                                        <div className="relative flex items-center justify-center py-4">
                                            <svg className="w-40 h-40" viewBox="0 0 36 36">
                                                <path
                                                    className="stroke-slate-200"
                                                    fill="none"
                                                    strokeWidth="3.8"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <path
                                                    className="stroke-[#5048e5]"
                                                    fill="none"
                                                    strokeWidth="2.8"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${progressData.stats.completedQuizzes > 0 ? Math.round((progressData.stats.passedQuizzes / progressData.stats.completedQuizzes) * 100) : 0}, 100`}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-bold text-slate-800">
                                                    {progressData.stats.completedQuizzes > 0 ? Math.round((progressData.stats.passedQuizzes / progressData.stats.completedQuizzes) * 100) : 0}%
                                                </span>
                                                <span className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Passed</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 text-center mt-2">
                                            {progressData.stats.passedQuizzes} of {progressData.stats.completedQuizzes} quizzes passed
                                        </p>
                                    </div>
                                </div>

                                {/* Subject Details Cards */}
                                {progressData.subjectPerformance.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Subject Breakdown</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {progressData.subjectPerformance.map((subj, idx) => (
                                                <div key={subj.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className={`w-10 h-10 ${barColors[idx % barColors.length]} rounded-lg flex items-center justify-center text-white font-bold`}>
                                                            {subj.name.charAt(0)}
                                                        </div>
                                                        <h3 className="font-bold text-slate-800">{subj.name}</h3>
                                                    </div>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-500">Quizzes Taken</span>
                                                            <span className="font-semibold">{subj.attempts}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-500">Passed</span>
                                                            <span className="font-semibold text-emerald-600">{subj.passed}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-500">Failed</span>
                                                            <span className="font-semibold text-red-600">{subj.attempts - subj.passed}</span>
                                                        </div>
                                                        <div className="flex justify-between pt-2 border-t">
                                                            <span className="text-slate-500">Avg Score</span>
                                                            <span className="font-bold text-[#5048e5]">{subj.avg}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Recent Quiz Results */}
                                {progressData.attempts.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-bold text-slate-800">Recent Quiz Results</h2>
                                            <Link to="/parent/results" className="text-sm text-[#5048e5] hover:underline font-medium">
                                                View All →
                                            </Link>
                                        </div>
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
                                                    {progressData.attempts.slice(0, 5).map((attempt) => {
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
                                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${attempt.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                                                        }`}>
                                                                        <span className={`w-1.5 h-1.5 rounded-full ${attempt.passed ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                                        {attempt.passed ? 'Passed' : 'Failed'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="h-10"></div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ParentDashboard
