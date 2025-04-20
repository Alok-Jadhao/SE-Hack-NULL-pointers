import { Home, BookOpen, ClipboardList, Users, BarChart2, Settings, LogOut, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function InstructorSidebar() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState("dashboard")
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/instructor/dashboard" },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} />, path: "/instructor/courses" },
    { id: "quizzes", label: "Quizzes", icon: <ClipboardList size={20} />, path: "/instructor/quizzes" },
    { id: "students", label: "Students", icon: <Users size={20} />, path: "/instructor/students" },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={20} />, path: "/instructor/analytics" },
    { id: "settings", label: "Settings", icon: <Settings size={20} />, path: "/instructor/settings" },
  ]

  const handleMenuItemClick = (id, path) => {
    setActiveItem(id)
    navigate(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative`}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-0 top-4 p-1 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-transform duration-300 hover:scale-110 z-10"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 font-bold text-xl text-[#3A506B]">
          <span>TIPS-G</span>
        </div>
        {!isCollapsed && (
          <div className="text-sm text-gray-500 mt-1">Instructor Dashboard</div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white ring-2 ring-purple-500">
              <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-semibold">Prashant Kumar</div>
              <div className="text-xs text-gray-500">Instructor</div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuItemClick(item.id, item.path)}
            className={`flex items-center gap-3 w-full px-4 py-3 text-sm ${
              activeItem === item.id
                ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            onClick={() => navigate('/instructor/help')}
          >
            <HelpCircle size={20} />
            <span className="text-sm">Help & Support</span>
          </button>
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  )
} 