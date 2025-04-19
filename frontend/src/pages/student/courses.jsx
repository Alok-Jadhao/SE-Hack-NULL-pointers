import { BookOpen, Clock, Users } from 'lucide-react'

export default function Courses() {
  // Example course data - replace with actual data from your backend
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      instructor: "Dr. Smith",
      progress: 75,
      duration: "12 weeks",
      students: 120,
      image: "/course1.jpg"
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      instructor: "Prof. Johnson",
      progress: 45,
      duration: "16 weeks",
      students: 95,
      image: "/course2.jpg"
    },
    {
      id: 3,
      title: "Web Development Fundamentals",
      instructor: "Ms. Williams",
      progress: 30,
      duration: "10 weeks",
      students: 150,
      image: "/course3.jpg"
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gray-200">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{course.students} students</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-600 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 