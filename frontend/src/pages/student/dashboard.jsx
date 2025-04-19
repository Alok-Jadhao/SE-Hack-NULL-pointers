"use client"
import { BookOpen, Calendar, Clock, Users, Search, Bell, Plus } from 'lucide-react'
import { useState } from 'react'

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  // Example course data
  const watchedCourses = [
    {
      id: 1,
      title: "Product Design",
      progress: "2/8 Watched",
      category: "FRONTEND",
      image: "/course1.jpg",
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Software Developer",
        avatar: "/instructor1.jpg"
      }
    },
    {
      id: 2,
      title: "Beginner's Guide To Becoming A Professional Frontend Developer",
      progress: "2/8 Watched",
      category: "FRONTEND",
      image: "/course2.jpg",
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Software Developer",
        avatar: "/instructor1.jpg"
      }
    },
    {
      id: 3,
      title: "Product Design",
      progress: "2/8 Watched",
      category: "FRONTEND",
      image: "/course3.jpg",
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Software Developer",
        avatar: "/instructor1.jpg"
      }
    }
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      title: "React Components Assignment",
      course: "Frontend Development",
      dueDate: "2024-03-15 at 23:59"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Quiz",
      course: "Programming Basics",
      dueDate: "2024-03-18 at 14:00"
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "Database Management",
      dueDate: "2024-03-20 at 23:59"
    }
  ]

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search your course here...."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={24} />
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-purple-600 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-sm font-medium mb-2 inline-block">ONLINE COURSE</span>
          <h1 className="text-4xl font-bold mb-4">
            Sharpen Your Skills With<br />
            Professional Online Courses
          </h1>
          <button className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2">
            Join Now
            <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-sm">$</span>
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full">
          {/* Add decorative stars or patterns here */}
        </div>
      </div>

      {/* Continue Watching Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Continue Watching</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-full">
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 border border-gray-200 rounded-full">
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow">
                  <Plus size={20} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{course.progress}</span>
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
                <h3 className="font-medium mb-4">{course.title}</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-gray-500">{course.instructor.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <div className="space-y-4">
          {upcomingDeadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-lg font-medium">
                  {deadline.title.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{deadline.title}</h3>
                <p className="text-sm text-gray-500">{deadline.course}</p>
                <p className="text-sm text-gray-400">{deadline.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Mentor Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Mentor</h2>
          <button className="text-purple-600 text-sm font-medium">See All</button>
        </div>
        {/* Add mentor cards here if needed */}
      </div>
    </div>
  )
}