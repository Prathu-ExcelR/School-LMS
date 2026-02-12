
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

function Dashboard() {
  const navigate = useNavigate()


  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8] dark:bg-[#121121]">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto bg-[#f6f6f8] dark:bg-[#121121]">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-[#f6f6f8]/80 dark:bg-[#121121]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome, Rahul 👋</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monday, 24 October 2023</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all">
              <span className="material-icons-round">notifications</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Rahul Sharma</p>
                <span className="px-2 py-0.5 bg-[#5048e5]/10 text-[#5048e5] text-[10px] font-bold uppercase tracking-wider rounded-full">Student</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#5048e5]/20 border-2 border-[#5048e5] overflow-hidden">
                <img 
                  alt="Student Profile" 
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOgn9n5XepWkOwmu8g2ZwPwOh3BXJccxEfSZZV3QqyN5nQzDFxOd4DbS71TjtEku0LWjFS3GgiwlgrR3c4ebXVjaFR3_UbRMWL9qPCEDJdWgz_dn2g3ckN_gPTr4WNkj_LzA8xRGdXWhkPn2mmd2Z7WvcBd9ot2EUvA3BJGxjEa1A5k7bSZ9zK4eQxHgBUMTNZVpRnsDBk9QKTMy4kEZlD1NS6KFKP00fSt6h1xkNFGmh-QqtfUq9_a9xyIXtHJ5AA9IHc0KaKoFWx"
                />
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-8 space-y-8">
          {/* Stat Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <span className="material-icons-round text-3xl">trending_up</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Overall Progress</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">75.4%</h3>
              </div>
            </div>
            {/* Subjects Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <span className="material-icons-round text-3xl">auto_stories</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Enrolled Subjects</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">06</h3>
              </div>
            </div>
            {/* Quizzes Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-5 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                <span className="material-icons-round text-3xl">assignment_turned_in</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Completed Quizzes</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">12</h3>
              </div>
            </div>
          </section>
          
          {/* Subject Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">My Courses</h2>
              <button className="text-[#5048e5] font-semibold flex items-center gap-1 hover:underline">
                View All <span className="material-icons-round text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Maths Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                <div className="h-32 bg-indigo-50 dark:bg-indigo-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <span className="material-icons-round text-9xl">functions</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">Science & Math</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-slate-100">Mathematics</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Chapter 4: Advanced Algebra</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Course Progress</span>
                      <span className="text-[#5048e5]">60%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#5048e5] h-full rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#5048e5] hover:bg-[#5048e5]/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    Continue Learning
                    <span className="material-icons-round text-sm">play_arrow</span>
                  </button>
                </div>
              </div>
              
              {/* Science Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                <div className="h-32 bg-emerald-50 dark:bg-emerald-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <span className="material-icons-round text-9xl">science</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">Natural Science</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-slate-100">Science</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Unit 2: The Solar System</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Course Progress</span>
                      <span className="text-[#5048e5]">30%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#5048e5] h-full rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#5048e5] hover:bg-[#5048e5]/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    Continue Learning
                    <span className="material-icons-round text-sm">play_arrow</span>
                  </button>
                </div>
              </div>
              
              {/* Art Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:shadow-md transition-all">
                <div className="h-32 bg-amber-50 dark:bg-amber-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <span className="material-icons-round text-9xl">palette</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">Arts & Design</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-1 text-slate-900 dark:text-slate-100">Modern Art</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Lesson 8: Color Theory</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Course Progress</span>
                      <span className="text-[#5048e5]">90%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#5048e5] h-full rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#5048e5] hover:bg-[#5048e5]/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    Continue Learning
                    <span className="material-icons-round text-sm">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Bottom Layout: Calendar & Announcements */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Announcements */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Announcements</h2>
                <button className="text-slate-400 hover:text-[#5048e5] transition-colors">
                  <span className="material-icons-round">more_horiz</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="min-w-[48px] h-12 bg-[#5048e5]/10 text-[#5048e5] rounded-lg flex flex-col items-center justify-center font-bold">
                    <span className="text-lg leading-none">25</span>
                    <span className="text-[10px] uppercase">Oct</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Parent-Teacher Meeting</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Scheduled for upcoming Saturday at 10:00 AM in Main Hall.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-lg">
                  <div className="min-w-[48px] h-12 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg flex flex-col items-center justify-center font-bold">
                    <span className="text-lg leading-none">28</span>
                    <span className="text-[10px] uppercase">Oct</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Science Project Submission</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last day to submit your solar system models to Dr. Smith.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Deadline */}
            <div className="bg-[#5048e5] p-6 rounded-xl text-white shadow-lg shadow-[#5048e5]/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <span className="material-icons-round text-4xl mb-4">timer</span>
                <h3 className="text-xl font-bold mb-2">Next Deadline</h3>
                <p className="text-white/80 text-sm">Algebra Quiz: Chapter 4</p>
              </div>
              <div className="relative z-10 mt-8">
                <div className="text-3xl font-bold">14h : 22m</div>
                <p className="text-white/60 text-xs mt-1">Remaining until quiz closes</p>
                <button className="mt-6 w-full py-2.5 bg-white text-[#5048e5] font-bold rounded-lg hover:bg-slate-100 transition-colors">
                  Take Quiz Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
