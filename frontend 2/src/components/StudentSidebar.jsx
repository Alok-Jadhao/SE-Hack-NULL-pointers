import { Link, useNavigate } from 'react-router-dom'
import { 
  Home, BookOpen, FileText, MessageSquare, Settings, HelpCircle, LogOut, 
  ChevronLeft, ChevronRight, Bell, Calendar, FileCheck, BookMarked, 
  Clock, AlertCircle, GraduationCap, PenTool, Rocket, Brain, Code, 
  BookOpenCheck, FileSpreadsheet, Lightbulb, Trophy, Award, Star
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'

export default function StudentSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => {
    if (!isMobile) {
      setIsOpen(!isOpen)
    }
  }

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login')
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/student/courses' },
    { icon: FileText, label: 'Assignments', path: '/student/assignments' },
    { icon: MessageSquare, label: 'Messages', path: '/student/messages' },
    { icon: Settings, label: 'Settings', path: '/student/settings' },
    { icon: HelpCircle, label: 'Help', path: '/student/help' },
  ]

  // Example upcoming deadlines with enhanced icons
  const upcomingDeadlines = [
    { 
      id: 1, 
      title: 'React Project Submission', 
      course: 'Web Development', 
      dueDate: '2024-03-15', 
      type: 'assignment',
      icon: Code,
      priority: 'high',
      badgeIcon: Rocket
    },
    { 
      id: 2, 
      title: 'Midterm Exam', 
      course: 'Data Structures', 
      dueDate: '2024-03-20', 
      type: 'exam',
      icon: Brain,
      priority: 'urgent',
      badgeIcon: Trophy
    },
    { 
      id: 3, 
      title: 'Research Paper', 
      course: 'Computer Science', 
      dueDate: '2024-03-25', 
      type: 'assignment',
      icon: Lightbulb,
      priority: 'medium',
      badgeIcon: Star
    },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-600'
      case 'high':
        return 'bg-orange-100 text-orange-600'
      case 'medium':
        return 'bg-yellow-100 text-yellow-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className={`bg-white border-r border-gray-200 h-[150vh] flex flex-col relative left-0 top-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Top Section */}
      <div className="flex-none">
        <div className="p-4 flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold text-purple-600">EduHub</h1>}
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {isOpen && (
              <div>
                <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">ID: {user.id}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600"
            >
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Notifications */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600">
            <Bell size={20} />
            {isOpen && <span>Notifications</span>}
          </div>
        </div>
      </div>

      {/* Middle Section - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Upcoming Deadlines */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={20} className="text-purple-600" />
            {isOpen && <h3 className="font-semibold text-sm">Upcoming Deadlines</h3>}
          </div>
          {isOpen && (
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div 
                  key={deadline.id} 
                  className="flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${getPriorityColor(deadline.priority)}`}>
                      <deadline.icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{deadline.title}</span>
                        <span className="text-xs text-purple-600 flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(deadline.dueDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          deadline.type === 'exam' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <deadline.badgeIcon size={12} />
                          {deadline.type}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <GraduationCap size={12} />
                          {deadline.course}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section - Fixed */}
      <div className="flex-none border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 w-full"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
} 