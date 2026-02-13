import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function StudentSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { path: '/student/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/student/my-subjects', icon: 'menu_book', label: 'My Subjects' },
    { path: '/student/browse', icon: 'explore', label: 'Available Courses' },
    { path: '/student/quizzes', icon: 'quiz', label: 'Quizzes' },
    { path: '/student/results', icon: 'emoji_events', label: 'Results' },
    { path: '/student/progress', icon: 'insights', label: 'Progress' },
    { path: '/student/profile', icon: 'person', label: 'Profile' }
  ]

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10">
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5048e5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5048e5]/20">
            <span className="material-icons-round text-2xl">school</span>
          </div>
          <div>
            <span className="text-lg font-bold text-[#5048e5]">EduFlow</span>
            <p className="text-xs text-slate-500">Student Portal</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20'
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#5048e5]'
            }`}
          >
            <span className="material-icons-round">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <span className="material-icons-round">logout</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default StudentSidebar
