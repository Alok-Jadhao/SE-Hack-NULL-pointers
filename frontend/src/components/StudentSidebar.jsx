import { Home, BookOpen, ClipboardList, BarChart2, MessageSquare, Settings, LogOut, HelpCircle, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Calendar from "./Calendar"
import { studentData } from "../pages/student/dummyData"

export default function StudentSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { profile, stats, notifications } = studentData

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} />, path: "/student/courses" },
    { id: "assignments", label: "Assignments", icon: <ClipboardList size={20} />, path: "/student/assignments" },
    { id: "quizzes", label: "Quizzes", icon: <ClipboardList size={20} />, path: "/student/quizzes" },
    { id: "grades", label: "Grades & Analytics", icon: <BarChart2 size={20} />, path: "/student/grades" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} />, path: "/student/messages" },
    { id: "settings", label: "Settings", icon: <Settings size={20} />, path: "/student/settings" },
  ]

  const unreadNotifications = notifications.filter(n => !n.read).length
  const progressPercentage = Math.round((stats.completedCourses / stats.totalCourses) * 100)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative`}>
      {/* Collapse Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-0 top-4 p-1 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-transform duration-300 hover:scale-110 z-10"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Top Section - Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white ring-2 ring-purple-500">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {!isCollapsed && (
              <div>
                <div className="font-semibold">Hello, {profile.name.split(' ')[0]}!</div>
                <div className="text-xs text-gray-500">{profile.department}</div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isCollapsed && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Course Progress</span>
              <span className="text-purple-600">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-purple-600 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{stats.completedCourses} completed</span>
              <span>{stats.totalCourses} total</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center gap-3 w-full px-4 py-3 text-sm ${
              location.pathname === item.path
                ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Calendar Section */}
      {!isCollapsed && <Calendar />}

      {/* Footer Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <Link to="/student/help" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <HelpCircle size={20} />
            <span className="text-sm">Help & Support</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full text-left"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}
    </div>
  )
} 