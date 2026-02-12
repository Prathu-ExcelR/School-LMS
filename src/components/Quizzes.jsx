import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

function Quizzes() {
  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-800 dark:text-slate-100 font-display min-h-screen flex overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-4 md:p-8 lg:px-12 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex text-sm text-slate-500 dark:text-slate-400 mb-2">
              <Link to="/dashboard" className="hover:text-[#137fec] cursor-pointer transition-colors">Dashboard</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800 dark:text-white font-medium">Quizzes &amp; Assessments</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">Your Assessments</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">Keep track of upcoming quizzes to unlock new units and review your past performance.</p>
          </div>
          {/* Quick Stats Widget */}
          <div className="flex gap-4">
            <div className="bg-white dark:bg-[#1b2733] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-[140px]">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Avg. Score</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#137fec]">88%</span>
                <span className="text-xs text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">
                  <span className="material-icons text-sm mr-0.5">trending_up</span> +2%
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1b2733] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 min-w-[140px]">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Due This Week</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-amber-500">2</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Quizzes</span>
              </div>
            </div>
          </div>
        </header>

        {/* Pending Quizzes Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-icons text-amber-500">pending_actions</span>
              Pending Quizzes
            </h2>
            <span className="text-sm font-medium bg-[#137fec]/10 text-[#137fec] px-3 py-1 rounded-full">3 Active</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card 1: Urgent */}
            <div className="bg-white dark:bg-[#1b2733] rounded-2xl p-6 shadow-sm border-l-4 border-amber-500 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-icons text-8xl text-[#137fec]">functions</span>
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="bg-[#137fec]/10 text-[#137fec] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Mathematics 101</div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-amber-500">Due in 24h</span>
                  <span className="text-sm text-slate-800 dark:text-white font-bold">Oct 24</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Algebra Mid-term Review</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 relative z-10">Covers linear equations and inequalities. 25 questions, 45 minutes.</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons text-base">timer</span> 45m
                </div>
                <button className="bg-[#137fec] hover:bg-[#0e5cb0] text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-[#137fec]/20 transition-all transform active:scale-95 flex items-center gap-2">
                  Start Quiz
                  <span className="material-icons text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card 2: Locked Next Unit */}
            <div className="bg-white dark:bg-[#1b2733] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-[#137fec]/30 transition-colors relative">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">History 202</div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Due: Oct 28</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">World War I: Causes &amp; Effects</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Unit assessment. Must score &gt;70% to proceed.</p>
              {/* Locked Alert */}
              <div className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-3 flex items-start gap-3">
                <span className="material-icons text-red-500 text-lg mt-0.5">lock</span>
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-0.5">Next Unit Locked</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pass this quiz to unlock "The Interwar Period".</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons text-base">timer</span> 60m
                </div>
                <button className="bg-[#137fec] hover:bg-[#0e5cb0] text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-[#137fec]/20 transition-all transform active:scale-95 flex items-center gap-2">
                  Start Quiz
                  <span className="material-icons text-sm">play_arrow</span>
                </button>
              </div>
            </div>

            {/* Card 3: Standard */}
            <div className="bg-white dark:bg-[#1b2733] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-[#137fec]/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Biology 101</div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Due: Nov 02</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Cellular Respiration</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Chapter 4 Review Quiz. Multiple choice and short answer.</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons text-base">timer</span> 30m
                </div>
                <button className="bg-white dark:bg-[#1b2733] border-2 border-[#137fec] text-[#137fec] hover:bg-[#137fec] hover:text-white px-5 py-2.5 rounded-lg font-medium transition-all transform active:scale-95 flex items-center gap-2">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Attempted Quizzes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-icons text-emerald-500">check_circle</span>
              Attempted Quizzes
            </h2>
            <button className="text-sm text-[#137fec] hover:text-[#0e5cb0] font-medium flex items-center gap-1">
              View All History
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="bg-white dark:bg-[#1b2733] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="px-6 py-4 font-semibold">Quiz Info</th>
                    <th className="px-6 py-4 font-semibold">Course</th>
                    <th className="px-6 py-4 font-semibold">Date Taken</th>
                    <th className="px-6 py-4 font-semibold">Score</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {/* Row 1 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <span className="material-icons">science</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">Kinematics Quiz</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Physics I</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Physics</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 20, 2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        85% Passed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-slate-500 hover:text-[#137fec] transition-colors">
                        View Results
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                          <span className="material-icons">auto_stories</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">Poetry Analysis</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">English Lit</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Literature</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 18, 2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        92% Passed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-slate-500 hover:text-[#137fec] transition-colors">
                        View Results
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="material-icons">public</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">Euro. Geography</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Map Quiz</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Geography</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 15, 2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        58% Failed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-[#137fec] hover:text-[#0e5cb0] underline transition-colors">
                        Retake Quiz
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">Showing recent 3 attempted quizzes</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Quizzes
