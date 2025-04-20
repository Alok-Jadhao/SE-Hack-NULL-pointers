import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './style.css'
import Page from './pages/student/page.jsx'
import InstructorLayout from './pages/instructor/layout.jsx'
import InstructorDashboard from './pages/instructor/page.jsx'
import StudentLayout from './pages/student/layout.jsx'
import StudentDashboardPage from './pages/student/page.jsx'
import Courses from './pages/student/courses.jsx'
import Assignments from './pages/student/assignments.jsx'
import Grades from './pages/student/grades.jsx'
import Messages from './pages/student/messages.jsx'
import Settings from './pages/student/settings.jsx'
import LoginPopup from './components/LoginPopup.jsx'
import SignupPopup from './components/SignupPopup.jsx'

// Helper function to get user data from storage
const getUserData = () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')
  const userJson = sessionStorage.getItem('user') || localStorage.getItem('user')
  if (token && userJson) {
    try {
      return JSON.parse(userJson)
    } catch (e) {
      console.error("Failed to parse user data:", e)
      // Clear invalid data
      sessionStorage.clear()
      localStorage.clear()
      return null
    }
  }
  return null
}

// Protected Route Component
function ProtectedRoute({ role, children }) {
  const currentUser = getUserData()
  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />
  }
  if (currentUser.role !== role) {
    // Logged in, but wrong role, redirect to their appropriate dashboard or a generic page
    // Or show an 'Unauthorized' page
    console.warn(`Access denied: Expected role "${role}", got "${currentUser.role}"`)
    // Simple redirect to login for now, adjust as needed
    return <Navigate to="/login" replace /> // Or redirect to a specific page based on currentUser.role
  }
  // Logged in with correct role, render the child component (Layout)
  return children
}

function App() {
  // No need for local state for role here, we read from storage in ProtectedRoute

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/register" element={<SignupPopup />} />

        {/* Student Routes */}
        <Route
          path="/student/*" // Use /* to match nested routes
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          {/* Define nested routes relative to StudentLayout */}
          {/* Note: Removed the outer "/" path for student layout */}
          <Route path="dashboard" element={<StudentDashboardPage />} /> {/* index might be better */}
          <Route path="courses" element={<Courses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="quizzes" element={<div>Quizzes Page</div>} />
          <Route path="grades" element={<Grades />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<div>Help Page</div>} />
          {/* Add a default/index route if needed, e.g., redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Instructor Routes */}
        <Route
          path="/instructor/*" // Use /* to match nested routes
          element={
            <ProtectedRoute role="instructor">
              <InstructorLayout />
            </ProtectedRoute>
          }
        >
          {/* Define nested routes relative to InstructorLayout */}
          {/* Note: Removed the outer "/" path for instructor layout */}
          <Route path="dashboard" element={<InstructorDashboard />} />
          {/* Add other instructor routes here */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Redirect Root Path */}
        {/* If logged in, redirect to appropriate dashboard, otherwise to login */}
        <Route path="/" element={<RootRedirect />} />

        {/* Catch-all for unmatched routes (optional) */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

// Helper component to handle root redirection
function RootRedirect() {
  const currentUser = getUserData()
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  // Redirect based on role
  if (currentUser.role === 'instructor') {
    return <Navigate to="/instructor/dashboard" replace />
  } else {
    // Default to student dashboard
    return <Navigate to="/student/dashboard" replace />
  }
}

export default App
