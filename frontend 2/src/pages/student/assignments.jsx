import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assignmentsData } from '../../data/assignments'
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, BookOpen, Download, Upload, Award, Code, FileCode, Smartphone } from 'lucide-react'

export default function Assignments() {
  const navigate = useNavigate()
  const [assignments, setAssignments] = useState(assignmentsData)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
  }

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true
    return assignment.status === filter
  })

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    if (sortBy === 'points') {
      return b.points - a.points
    }
    return 0
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'overdue':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getAssignmentIcon = (type) => {
    switch (type) {
      case 'project':
        return <FileCode className="w-5 h-5 text-purple-500" />
      case 'coding':
        return <Code className="w-5 h-5 text-blue-500" />
      case 'design':
        return <Smartphone className="w-5 h-5 text-pink-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <option value="all">All Assignments</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="points">Sort by Points</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAssignments.map((assignment, index) => (
            <div
              key={assignment.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(assignment.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    hoveredCard === assignment.id ? 'bg-purple-100 scale-110' : 'bg-purple-50'
                  }`}>
                    {getAssignmentIcon(assignment.type)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800 mb-1 transition-colors duration-200 hover:text-purple-600 line-clamp-1">
                      {assignment.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{assignment.course}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Award className="w-3 h-3" />
                        <span>{assignment.points} pts</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    getStatusColor(assignment.status)
                  }`}>
                    {getStatusIcon(assignment.status)}
                    <span className="capitalize font-medium">{assignment.status}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{assignment.description}</p>
                </div>

                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-gray-800 mb-1">Grading Criteria</h3>
                  <ul className="space-y-1">
                    {assignment.gradingCriteria.slice(0, 2).map((criterion, index) => (
                      <li key={index} className="flex items-center gap-1 text-xs text-gray-600 group">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full transition-all duration-200 group-hover:scale-150"></div>
                        <span className="group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">{criterion}</span>
                      </li>
                    ))}
                    {assignment.gradingCriteria.length > 2 && (
                      <li className="text-xs text-purple-600">+{assignment.gradingCriteria.length - 2} more</li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {assignment.resources.slice(0, 2).map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 text-xs"
                    >
                      <BookOpen className="w-3 h-3 text-purple-500" />
                      <span className="line-clamp-1">{resource.title}</span>
                    </a>
                  ))}
                  {assignment.resources.length > 2 && (
                    <span className="text-xs text-purple-600">+{assignment.resources.length - 2} more</span>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <p className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {assignment.submissionType}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 text-xs">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 text-xs">
                      <Upload className="w-3 h-3" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 