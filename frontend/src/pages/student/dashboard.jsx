"use client"
import { BookOpen, Calendar, Clock, Users, Search, Bell, Plus, ChevronRight, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { studentData } from './dummyData'

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const { profile, watchedCourses, upcomingDeadlines, stats, recentActivity, notifications, mentors } = studentData

  return (
    <div className="p-6">
      {/* Profile and Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={profile.avatar} alt={profile.name} className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="text-xl font-semibold">Welcome back, {profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.department} - {profile.semester}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
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
          <div className="relative">
            <Bell size={24} className="cursor-pointer" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-xl font-semibold">{stats.totalCourses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-semibold">{stats.inProgressCourses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Hours Watched</p>
              <p className="text-xl font-semibold">{stats.totalHoursWatched}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Grade</p>
              <p className="text-xl font-semibold">{stats.averageGrade}%</p>
            </div>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
            <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  deadline.priority === 'High' ? 'bg-red-100' : 
                  deadline.priority === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <span className={`text-lg font-medium ${
                    deadline.priority === 'High' ? 'text-red-600' : 
                    deadline.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
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

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg font-medium">
                    {activity.type === 'quiz_completed' ? 'Q' : 
                     activity.type === 'assignment_submitted' ? 'A' : 'C'}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.course}</p>
                  {activity.score && (
                    <p className="text-sm text-gray-400">Score: {activity.score}%</p>
                  )}
                  <p className="text-sm text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mentors Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Mentors</h2>
          <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-4">
                <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{mentor.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.role}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Next Meeting</p>
                      <p className="text-sm font-medium">
                        {new Date(mentor.nextMeeting).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="p-2 bg-purple-100 text-purple-600 rounded-full">
                      <MessageSquare size={20} />
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