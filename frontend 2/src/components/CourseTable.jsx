import { useUser } from '../context/UserContext'

export default function CourseTable() {
  const { user } = useUser()

  const courses = [
    {
      id: 1,
      instructor: {
        name: "Prashant Kumar Singh",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "25/2/2023",
      type: "FRONTEND",
      title: "Understanding Concept Of React",
    },
    {
      id: 2,
      instructor: {
        name: "Ravi Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "25/2/2023",
      type: "BACKEND",
      title: "Node.js Fundamentals",
    },
    {
      id: 3,
      instructor: {
        name: "Devendra Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "25/2/2023",
      type: "DATABASE",
      title: "Database Design",
    },
  ]

  // Filter courses to only show enrolled ones
  const enrolledCourses = courses.filter(course => 
    user?.enrolledCourses?.includes(course.id.toString())
  )

  return (
    <div className="mt-8 mb-8">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
        <table className="w-full">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Instructor Name & Date</th>
              <th className="px-4 py-3 text-left">Course Type</th>
              <th className="px-4 py-3 text-left">Course Title</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                  No enrolled courses found
                </td>
              </tr>
            ) : (
              enrolledCourses.map((course) => (
                <tr 
                  key={course.id} 
                  className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <img
                          src={course.instructor.avatar || "/placeholder.svg"}
                          alt={course.instructor.name}
                          className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium group-hover:text-purple-600 transition-colors duration-300">
                          {course.instructor.name}
                        </div>
                        <div className="text-xs text-gray-500">{course.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full hover:bg-purple-200 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      {course.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm hover:text-purple-600 transition-colors duration-300">
                    {course.title}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded hover:bg-blue-200 hover:text-blue-700 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                    >
                      SHOW DETAILS
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
