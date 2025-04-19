import { BookOpen, Clock, Users, Search, Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { studentData } from './dummyData'

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const { watchedCourses, stats } = studentData

  const allCourses = [
    ...watchedCourses,
    {
      id: 4,
      title: "Advanced JavaScript Concepts",
      progress: "0/10 Watched",
      category: "FRONTEND",
      image: "/course4.jpg",
      instructor: {
        name: "Alex Thompson",
        role: "Senior JavaScript Developer",
        avatar: "/instructor4.jpg"
      }
    },
    {
      id: 5,
      title: "Cloud Computing Fundamentals",
      progress: "0/8 Watched",
      category: "CLOUD",
      image: "/course5.jpg",
      instructor: {
        name: "Maria Garcia",
        role: "Cloud Solutions Architect",
        avatar: "/instructor5.jpg"
      }
    }
  ]

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || course.category === filter
    return matchesSearch && matchesFilter
  })

  const categories = ['all', ...new Set(allCourses.map(course => course.category))]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
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
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = parseInt(course.progress.split('/')[0])
          const total = parseInt(course.progress.split('/')[1])
          const progressPercentage = Math.round((progress / total) * 100)

          return (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <span className="absolute top-4 right-4 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{course.instructor.name}</p>
                    <p className="text-xs text-gray-500">{course.instructor.role}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-purple-600">{progressPercentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-purple-600 rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progress} of {total} lessons</span>
                    <span>{course.progress}</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  {progress === 0 ? 'Start Learning' : 'Continue Learning'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 