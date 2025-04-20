import { BookOpen, Clock, Users, Star, ChevronRight, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { coursesData } from '../../data/courses'
import SearchBar2 from './SearchBar2'
import { useUser } from '../context/UserContext'

export default function Courses() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('all')
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState(coursesData.slice(0, 3))
  const [availableCourses, setAvailableCourses] = useState(coursesData.slice(3))
  const [filteredEnrolledCourses, setFilteredEnrolledCourses] = useState(enrolledCourses)
  const [filteredAvailableCourses, setFilteredAvailableCourses] = useState(availableCourses)
  const { user, enrollInCourse, unenrollFromCourse } = useUser()

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'ai/ml', name: 'AI/ML' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'security', name: 'Security' },
    { id: 'devops', name: 'DevOps' }
  ]

  // Handle category filtering
  useEffect(() => {
    const filterCourses = (courses) => {
      if (activeTab === 'all') {
        return courses
      }
      return courses.filter(course => course.category.toLowerCase() === activeTab)
    }

    setFilteredEnrolledCourses(filterCourses(enrolledCourses))
    setFilteredAvailableCourses(filterCourses(availableCourses))
  }, [activeTab, enrolledCourses, availableCourses])

  // Handle search
  useEffect(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    if (searchQuery) {
      const filterBySearch = (courses) => {
        return courses.filter(course => 
          course.title.toLowerCase().includes(searchQuery) ||
          course.instructor.toLowerCase().includes(searchQuery) ||
          course.description.toLowerCase().includes(searchQuery) ||
          course.category.toLowerCase().includes(searchQuery)
        )
      }

      setFilteredEnrolledCourses(filterBySearch(enrolledCourses))
      setFilteredAvailableCourses(filterBySearch(availableCourses))
    } else {
      // If no search query, apply only category filter
      const filterCourses = (courses) => {
        if (activeTab === 'all') {
          return courses
        }
        return courses.filter(course => course.category.toLowerCase() === activeTab)
      }

      setFilteredEnrolledCourses(filterCourses(enrolledCourses))
      setFilteredAvailableCourses(filterCourses(availableCourses))
    }
  }, [searchParams, enrolledCourses, availableCourses, activeTab])

  const handleEnroll = (courseId) => {
    enrollInCourse(courseId)
    setShowEnrollmentModal(false)
    setSelectedCourse(null)
  }

  const handleUnenroll = (courseId) => {
    unenrollFromCourse(courseId)
  }

  return (
    <div className="p-6">
      <SearchBar2 />
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover-scale transition-all duration-300 hover:shadow-lg">
              <div className="h-48">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 progress-bar">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{course.progress}%</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Last accessed: {course.lastAccessed}</p>
                <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAvailableCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover-scale transition-all duration-300 hover:shadow-lg">
              <div className="h-48">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center modal fade-enter">
          <div className="bg-white rounded-lg p-6 max-w-md w-full transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-bold mb-4">Confirm Enrollment</h2>
            <p className="mb-4">You are about to enroll in:</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium">{selectedCourse.title}</h3>
              <p className="text-sm text-gray-500">Instructor: {selectedCourse.instructor}</p>
              <p className="text-sm text-gray-500">Duration: {selectedCourse.duration}</p>
              <p className="text-sm text-gray-500">Price: {selectedCourse.price}</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEnrollmentModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEnroll(selectedCourse.id)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 