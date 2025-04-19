import { Calendar, Clock, FileText, Search, Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { studentData } from './dummyData'

export default function Assignments() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const { upcomingDeadlines, watchedCourses } = studentData

  // Transform upcomingDeadlines into assignments
  const assignments = upcomingDeadlines.map(deadline => ({
    id: deadline.id,
    title: deadline.title,
    course: deadline.course,
    dueDate: deadline.dueDate.split(' at ')[0],
    status: Math.random() > 0.5 ? 'submitted' : 'pending',
    description: `Complete the ${deadline.title} for ${deadline.course}. This assignment covers important concepts and will help you practice your skills.`,
    type: deadline.type,
    priority: deadline.priority
  }))

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || assignment.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateTimeRemaining = (dueDate) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? `${diffDays} days` : 'Due today'
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assignments..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">{assignment.title}</h2>
                <p className="text-gray-600">{assignment.course}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
                  {assignment.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{assignment.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Time remaining: {calculateTimeRemaining(assignment.dueDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText size={16} />
                <span>Type: {assignment.type}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                View Details
              </button>
              {assignment.status === 'pending' && (
                <button className="px-4 py-2 bg-white border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  Submit Assignment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 