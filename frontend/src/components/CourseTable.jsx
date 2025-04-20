export default function CourseTable() {
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
      type: "FRONTEND",
      title: "Understanding Concept Of React",
    },
  ]

  return (
    <div className="px-4 mb-8">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
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
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">{course.instructor.name}</div>
                      <div className="text-xs text-gray-500">{course.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">{course.type}</span>
                </td>
                <td className="px-4 py-3 text-sm">{course.title}</td>
                <td className="px-4 py-3">
                  <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded">SHOW DETAILS</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
