import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

function MyCourses() {
  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-800 dark:text-white font-display min-h-screen flex overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-20 flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Enrolled Courses</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back! You have 2 assignments due today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input className="pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary w-64 text-slate-600 dark:text-slate-200" placeholder="Search courses..." type="text"/>
              <span className="material-icons-outlined absolute left-3 top-2 text-slate-400 text-lg">search</span>
            </div>
            <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
              <span className="material-icons-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
            </button>
          </div>
        </header>
        {/* Content Area */}
        <div className="p-8 flex-1 overflow-y-auto">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            {/* Tabs */}
            <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 inline-flex shadow-sm">
              <button className="px-4 py-2 rounded text-sm font-medium bg-primary text-white shadow-sm transition-all">
                In Progress
              </button>
              <button className="px-4 py-2 rounded text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                Completed
              </button>
              <button className="px-4 py-2 rounded text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                All Courses
              </button>
            </div>
            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-500 dark:text-slate-400">Sort by:</label>
              <select className="form-select bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded text-sm py-2 pl-3 pr-8 focus:ring-primary focus:border-primary">
                <option>Last Accessed</option>
                <option>Progress (Low to High)</option>
                <option>Progress (High to Low)</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Card 1 */}
            <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-40 overflow-hidden">
                <img alt="Abstract math symbols on blackboard" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2gkQpvyqoKUUdSLemXa8wk0s173yv8OcGn1X1StafRsuTQxUxlEWy4yqAAKSUT9oga-qNu1c_p6tXHh_QWk5mpHjH9BwMMIWNbguHxzGU7xsqrmfPUYQvFYJwvnNhMNb60I3gsEYVI55RqN48Ts3LMDdZlYqA7p_nBmdoUFa9yBMfT4r8rQfGiyG5nYiO4MdO7Z87LBieUa5ythupB-GNN6A7pritYrFCn5P6CNTXmIEUkbKG_DKJLUy4AFh2t6mjhHgICtBLp_Q"/>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary shadow-sm">
                  Math
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title="Advanced Calculus II">Advanced Calculus II</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">person</span>
                    Dr. Sarah Mitchell
                  </p>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-end text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="text-primary">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{width: '65%'}}></div>
                  </div>
                  <button className="w-full mt-4 bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Continue Learning</span>
                    <span className="material-icons-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Card 2 */}
            <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-40 overflow-hidden">
                <img alt="Laptop displaying code" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpbfmyTmPnMHuKmjv2TFyvXjNGTninFZHAjcv_c_v5z1mfKKFtaKFCmJMCBygbg2o3NKK_-_7AL3kJcffE9z2x0VOr4X6bFNnQP2w500KzYxL8aVw10ODLTdEVTjiFt3UN3LlWdvC4oozDtCE-qvd10I9GwHpNCQY7WLdmWdeOEEEVaJ8Qx0CMp6bWW6_6KMBhjMUJdE3zsohaZ0HYA3HscwzTwMv1MBVnFDJhDUQ1K1nHz5Nla2A6eqmi4cGbUyDQOJhoua8YnhM"/>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-purple-600 shadow-sm">
                  CS
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title="Web Development Fundamentals">Web Dev Fundamentals</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">person</span>
                    Prof. Alan Turing
                  </p>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-end text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="text-primary">32%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{width: '32%'}}></div>
                  </div>
                  <button className="w-full mt-4 bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Continue Learning</span>
                    <span className="material-icons-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Card 3 */}
            <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-40 overflow-hidden">
                <img alt="Person looking at business charts" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWdXg4p--kSq3toKPe2Ois63pttDFvKC8Ut31V7YtfAf15OzY770rx8oIRO8xbyESN56V4GWH7ovtA6QAwthVpQGyMJPO_u5yzCN5eslnx57-wf3Voz5FvC7wNb4hUyYHjDAFuMIubmuc6u_xMNPnR4LKPwbozjXSx4CLLdeFYWtAZ3KmtOGRorKBW_iYSOzz8egBUjMSjPpZtTfbb9rTmw613jWPfdirdIb0sdAqzUOBjns93KbzvGIp1cmCE1CAblMVNMKx_2Dc"/>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-green-600 shadow-sm">
                  Business
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title="Introduction to Business Ethics">Intro to Business Ethics</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">person</span>
                    Mrs. Linda Cole
                  </p>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-end text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="text-primary">88%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{width: '88%'}}></div>
                  </div>
                  <button className="w-full mt-4 bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Continue Learning</span>
                    <span className="material-icons-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Card 4 */}
            <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-40 overflow-hidden">
                <img alt="Colorful paint palettes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw9BqubyUDL2N9P-7eTDt-izegywrJKRrVG_3yabAMsQ8g4iLPwOOMnKLs7s1_fcM_-eNxCL6pBnGL2hYOF6XbNrH8i8z411X2S6bscdJld1W1i08JCEYgyPiynTyCyezysQyc-52aCHC5TNTsXfVLpa7VV_ex9qja-CtDeV1pjnMZqSyQzmfWw3EOaikWyVeX6C7vXTKkhu1JLtwEM7Kz3d4DB5X44TuXEDbOn9-SaLpaB8XdKB4995EHVBAo2DPuKCfchgi9fI4"/>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-pink-600 shadow-sm">
                  Art
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title="Modern Art History 101">Modern Art History 101</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">person</span>
                    Mr. Pablo P.
                  </p>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-end text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="text-slate-400">0%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000 w-0"></div>
                  </div>
                  <button className="w-full mt-4 border border-primary text-primary hover:bg-primary/5 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Start Course</span>
                    <span className="material-icons-outlined text-sm group-hover/btn:translate-x-1 transition-transform">play_arrow</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Card 5 */}
            <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-40 overflow-hidden">
                <img alt="DNA helix illustration" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgUG8owBGWorW4MXlX2HgoU9ei__3hSWqHDNxvKYDu7IhymYQhD3e3vmJJQ9SSTLZKqczZitvgOFoiGCGkKuwqm95SzKxTXme8Ha1C2dZWtE7__Pfvpj2kvmtWhXk60wFLvZrdB71Dg_fxrj4YTtgX1-TkzmpdWz_H4vhW9sji-J_EwEXJjx-Z-8iuIlam6EPd8DB2iKZBTl68yJNk0OinG_bZm7YWUaDfbEJ8OwfUMw9X0hXi9-0wzK_EaYxCDT8GrC-KLq0zzAU"/>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-green-500 shadow-sm">
                  Biology
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title="Molecular Biology">Molecular Biology</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">person</span>
                    Dr. Watson
                  </p>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-end text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="text-primary">45%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{width: '45%'}}></div>
                  </div>
                  <button className="w-full mt-4 bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Continue Learning</span>
                    <span className="material-icons-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Card 6 */}
            <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-40 overflow-hidden">
                <img alt="Old historic book" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZJ0W78JkBtZTNYGwCX_8mEDVMN1e_FCxLh5OzLzZRI0a8c9u0xjNfwglY2hbQM5v-ddtu3UT3XeDh21iczIso1oIBA8KZoEy04ojrHeMDhPRG6azf0oYctdqdoshG6o-aX6tw1nirZhc114CRpkaUlsW4lMVhomhnvEU41N-NxcMCgEryZ_utT6Oe5SopjNNgULMVZyBPBv7Dwugj6l1jB9KQtpdB-o7oUaHNk91D9MoYpyveQJgjl4_DQlL_tfWEuBH5yOR8VNA"/>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-yellow-600 shadow-sm">
                  History
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1" title="European History: 1900-1950">European History: 1900-1950</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">person</span>
                    Prof. Churchill
                  </p>
                </div>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between items-end text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="text-primary">12%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{width: '12%'}}></div>
                  </div>
                  <button className="w-full mt-4 bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Continue Learning</span>
                    <span className="material-icons-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <nav className="flex gap-2">
              <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled="">
                <span className="material-icons-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium">3</button>
              <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                <span className="material-icons-outlined text-sm">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyCourses
