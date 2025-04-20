"use client"
import { BookOpen, Calendar, Clock, Users, Search, Bell, Plus, Star, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MentorSection from "../../components/MentorSection"
import CourseTable from "../../components/CourseTable"
import { coursesData } from '../../data/courses'
import SearchBar2 from './SearchBar2'
export default function StudentDashboard() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [enrolledCourses, setEnrolledCourses] = useState(coursesData.slice(0, 3))

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/student/courses?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleViewAssignments = () => {
    navigate('/student/assignments')
  }

  const handleViewAllCourses = () => {
    navigate('/student/courses')
  }

  const handleCourseNavigation = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(enrolledCourses.length / 3) - 1) {
      setCurrentPage(prev => prev + 1)
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleViewDeadlineDetails = (id) => {
    navigate(`/student/assignments/${id}`)
  }

  const handleViewAllDeadlines = () => {
    navigate('/student/assignments')
  }

  const handleViewAllAnnouncements = () => {
    navigate('/student/announcements')
  }

  const handleViewNotifications = () => {
    navigate('/student/notifications')
  }

  const handleContinueLearning = (courseId) => {
    navigate(`/student/courses/${courseId}`)
  }

  return (
    <div className="p-6">

      {/* Search Bar */}
     <SearchBar2 />
      {/* Hero Banner */}
      
    <div className="mx-4 mb-8 z-1 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-4 right-4 text-white/20">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-12 right-12 text-white/20">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-20 text-white/20">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-sm font-medium mb-2">ONLINE COURSE</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Sharpen Your Skills With
          <br />
          Professional Online Courses
        </h1>
        <button className="bg-black text-white rounded-full px-5 py-2 flex items-center gap-2 text-sm font-medium">
          Join Now
          <div className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">$</div>
        </button>
      </div>
    </div>
  



      {/* My Courses Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <button 
            onClick={handleViewAllCourses}
            className="text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            View All Courses
          </button>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.slice(currentPage * 3, (currentPage + 1) * 3).map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">{course.title}</h2>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
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
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.completedModules}/{course.modules} modules</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
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

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                    <button 
                      onClick={() => handleContinueLearning(course.id)}
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-700"
                    >
                      Continue Learning
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {enrolledCourses.length > 3 && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleCourseNavigation('prev')}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handleCourseNavigation('next')}
                disabled={currentPage >= Math.ceil(enrolledCourses.length / 3) - 1}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      {/* <div className="mb-8"> */}
        {/* <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Deadlines</h2>
          <button 
            onClick={handleViewAllDeadlines}
            className="text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            View All Deadlines
          </button>
        </div> */}
        {/* <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y">
            {[
              {
                id: 1,
                title: "Web Development Project",
                course: "Advanced Web Development",
                dueDate: "2024-03-15",
                timeLeft: "3 days left"
              },
              {
                id: 2,
                title: "Data Structures Assignment",
                course: "Data Structures & Algorithms",
                dueDate: "2024-03-18",
                timeLeft: "6 days left"
              },
              {
                id: 3,
                title: "Machine Learning Quiz",
                course: "Machine Learning Fundamentals",
                dueDate: "2024-03-20",
                timeLeft: "8 days left"
              }
            ].map((deadline) => (
              <div key={deadline.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{deadline.title}</h3>
                    <p className="text-sm text-gray-500">{deadline.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{deadline.dueDate}</p>
                    <p className="text-sm text-gray-500">{deadline.timeLeft}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      {/* </div> */}

      {/* Recent Announcements */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Announcements</h2>
          <button 
            onClick={handleViewAllAnnouncements}
            className="text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            View All Announcements
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y">
            {[
              {
                id: 1,
                title: "New Course Material Available",
                content: "The new module for Web Development is now available. Please check it out!",
                date: "2024-03-10",
                time: "10:30 AM"
              },
              {
                id: 2,
                title: "Assignment Submission Reminder",
                content: "Don't forget to submit your Data Structures assignment by Friday.",
                date: "2024-03-09",
                time: "2:15 PM"
              },
              {
                id: 3,
                title: "Upcoming Workshop",
                content: "Join us for a special workshop on Machine Learning this weekend.",
                date: "2024-03-08",
                time: "11:00 AM"
              }
            ].map((announcement) => (
              <div key={announcement.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{announcement.title}</h3>
                    <p className="text-sm text-gray-500">{announcement.content}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{announcement.date}</p>
                    <p className="text-sm text-gray-500">{announcement.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <MentorSection /> */}
      <CourseTable />

    </div>
  )
}