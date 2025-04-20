import { BarChart2, TrendingUp, Award } from 'lucide-react'

export default function Grades() {
  // Example grades data - replace with actual data from your backend
  const courses = [
    {
      id: 1,
      name: "Data Structures and Algorithms",
      grade: 85,
      assignments: [
        { name: "Midterm Exam", grade: 90, weight: 30 },
        { name: "Final Project", grade: 85, weight: 40 },
        { name: "Quizzes", grade: 80, weight: 30 }
      ]
    },
    {
      id: 2,
      name: "Web Development Fundamentals",
      grade: 92,
      assignments: [
        { name: "HTML/CSS Project", grade: 95, weight: 30 },
        { name: "JavaScript Assignment", grade: 90, weight: 30 },
        { name: "Final Project", grade: 90, weight: 40 }
      ]
    },
    {
      id: 3,
      name: "Database Systems",
      grade: 78,
      assignments: [
        { name: "SQL Queries", grade: 75, weight: 25 },
        { name: "Database Design", grade: 80, weight: 35 },
        { name: "Final Exam", grade: 80, weight: 40 }
      ]
    }
  ]

  const overallGPA = 85 // Example GPA

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Grades & Analytics</h1>

      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart2 className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500">Overall GPA</p>
              <p className="text-2xl font-bold">{overallGPA}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500">Performance Trend</p>
              <p className="text-2xl font-bold">+5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Award className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500">Top Course</p>
              <p className="text-2xl font-bold">Web Development</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course-wise Grades */}
      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{course.name}</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{course.grade}%</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-600 rounded-full" 
                    style={{ width: `${course.grade}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {course.assignments.map((assignment, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{assignment.name}</p>
                    <p className="text-sm text-gray-500">Weight: {assignment.weight}%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{assignment.grade}%</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-purple-600 rounded-full" 
                        style={{ width: `${assignment.grade}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 