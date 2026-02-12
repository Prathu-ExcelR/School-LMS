import { Link, useLocation, useNavigate } from 'react-router-dom'

function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/teachers', icon: 'person', label: 'Teachers' },
    { path: '/admin/classes', icon: 'class', label: 'Classes' },
    { path: '/admin/subjects', icon: 'menu_book', label: 'Subjects' },
    { path: '/admin/students', icon: 'school', label: 'Students' },
    { path: '/admin/enrollments', icon: 'assignment_turned_in', label: 'Enrollments' },
    { path: '/admin/reports', icon: 'assessment', label: 'Reports' }
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10">
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <span className="material-icons-round text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <span className="text-lg font-bold text-slate-800">Admin Panel</span>
            <p className="text-xs text-slate-500">System Control</p>
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
                ? 'bg-blue-600 text-white shadow-md'
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

export default AdminSidebar
