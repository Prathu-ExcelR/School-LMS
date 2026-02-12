import { Link, useLocation, useNavigate } from 'react-router-dom'

function TeacherSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { path: '/teacher/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/teacher/subjects', icon: 'menu_book', label: 'My Subjects' },
    { path: '/teacher/units', icon: 'library_books', label: 'Units' },
    { path: '/teacher/materials', icon: 'folder', label: 'Materials' },
    { path: '/teacher/quizzes', icon: 'quiz', label: 'Quizzes' },
    { path: '/teacher/students', icon: 'school', label: 'Students' },
    { path: '/teacher/attendance', icon: 'fact_check', label: 'Attendance' },
    { path: '/teacher/analytics', icon: 'assessment', label: 'Analytics' }
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10">
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">
            <span className="material-icons-round text-2xl">school</span>
          </div>
          <div>
            <span className="text-lg font-bold text-slate-800">Teacher Portal</span>
            <p className="text-xs text-slate-500">Academic Control</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-green-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-slate-200">
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <span className="material-icons-round">logout</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default TeacherSidebar
