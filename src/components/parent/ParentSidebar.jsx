import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

function ParentSidebar() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    const menuItems = [
        { path: '/parent/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/parent/progress', icon: 'trending_up', label: 'Child Progress' },
        { path: '/parent/results', icon: 'assignment', label: 'Quiz Results' },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-40">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <Link to="/parent/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#5048e5] rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white text-lg">school</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800">EduPulse</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 overflow-y-auto">
                <div className="mb-4">
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(item.path)
                                            ? 'bg-[#5048e5] text-white shadow-md'
                                            : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className="material-icons text-xl">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="material-icons text-purple-600">family_restroom</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">Parent</p>
                        <p className="text-xs text-slate-500">Viewing Child Progress</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <span className="material-icons text-lg">logout</span>
                    Sign Out
                </button>
            </div>
        </aside>
    )
}

export default ParentSidebar
