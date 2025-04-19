import { User, Bell, Lock, Globe, Moon, Sun, Mail, Phone, Calendar, BookOpen, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { studentData } from './dummyData'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('English')
  const { profile, stats } = studentData

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <User className="text-purple-600" size={20} />
            </div>
            <h2 className="text-lg font-semibold">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Change Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={profile.email}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue={profile.phone}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  defaultValue={profile.department}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <BookOpen size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="font-medium">{stats.enrolledCourses}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Calendar size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Completed Courses</p>
                  <p className="font-medium">{stats.completedCourses}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Bell size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Notifications</p>
                  <p className="font-medium">{stats.notifications}</p>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Bell className="text-purple-600" size={20} />
            </div>
            <h2 className="text-lg font-semibold">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Assignment Reminders</h3>
                <p className="text-sm text-gray-500">Get reminders for upcoming assignments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Course Updates</h3>
                <p className="text-sm text-gray-500">Get notified about new course content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Lock className="text-purple-600" size={20} />
            </div>
            <h2 className="text-lg font-semibold">Security Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Update Password
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Globe className="text-purple-600" size={20} />
            </div>
            <h2 className="text-lg font-semibold">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 appearance-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 