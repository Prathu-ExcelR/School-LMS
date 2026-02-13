import { Link, useLocation, useNavigate } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-10 transition-all duration-300">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5048e5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5048e5]/20">
            <span className="material-icons-round text-2xl">school</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#5048e5]">EduFlow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link
          to="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive('/dashboard')
              ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#5048e5] dark:hover:text-[#5048e5]'
            }`}
        >
          <span className={`material-icons-round transition-colors ${isActive('/dashboard') ? 'text-white' : 'text-slate-400 group-hover:text-[#5048e5]'}`}>dashboard</span>
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          to="/my-courses"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive('/my-courses')
              ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#5048e5] dark:hover:text-[#5048e5]'
            }`}
        >
          <span className={`material-icons-round transition-colors ${isActive('/my-courses') ? 'text-white' : 'text-slate-400 group-hover:text-[#5048e5]'}`}>book</span>
          <span className="font-medium">My Courses</span>
        </Link>

        <Link
          to="/browse-courses"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive('/browse-courses')
              ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#5048e5] dark:hover:text-[#5048e5]'
            }`}
        >
          <span className={`material-icons-round transition-colors ${isActive('/browse-courses') ? 'text-white' : 'text-slate-400 group-hover:text-[#5048e5]'}`}>grid_view</span>
          <span className="font-medium">Browse Courses</span>
        </Link>

        <Link
          to="/quizzes"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive('/quizzes')
              ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#5048e5] dark:hover:text-[#5048e5]'
            }`}
        >
          <span className={`material-icons-round transition-colors ${isActive('/quizzes') ? 'text-white' : 'text-slate-400 group-hover:text-[#5048e5]'}`}>assignment</span>
          <span className="font-medium">Quizzes</span>
        </Link>

        <Link
          to="/progress"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive('/progress')
              ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#5048e5] dark:hover:text-[#5048e5]'
            }`}
        >
          <span className={`material-icons-round transition-colors ${isActive('/progress') ? 'text-white' : 'text-slate-400 group-hover:text-[#5048e5]'}`}>insights</span>
          <span className="font-medium">Progress</span>
        </Link>
      </nav>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-500 rounded-xl transition-all duration-200 group"
        >
          <span className="material-icons-round text-slate-400 group-hover:text-red-500 transition-colors">logout</span>
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar