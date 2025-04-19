import { Calendar, Clock, FileText } from 'lucide-react'

export default function Assignments() {
  // Example assignments data - replace with actual data from your backend
  const assignments = [
    {
      id: 1,
      title: "Data Structures Project",
      course: "Data Structures and Algorithms",
      dueDate: "2024-03-15",
      status: "pending",
      description: "Implement a binary search tree with the following operations..."
    },
    {
      id: 2,
      title: "Web Development Assignment",
      course: "Web Development Fundamentals",
      dueDate: "2024-03-20",
      status: "submitted",
      description: "Create a responsive website using HTML, CSS, and JavaScript..."
    },
    {
      id: 3,
      title: "Database Design",
      course: "Database Systems",
      dueDate: "2024-03-25",
      status: "pending",
      description: "Design and implement a database schema for a library management system..."
    }
  ]

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">{assignment.title}</h2>
                <p className="text-gray-600">{assignment.course}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{assignment.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Time remaining: 5 days</span>
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