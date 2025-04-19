import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './style.css'
import Page from './pages/student/page.jsx'
import InstructorLayout from './pages/instructor/layout.jsx'
import InstructorDashboard from './pages/instructor/page.jsx'
import StudentLayout from './pages/student/layout.jsx'
import StudentDashboard from './pages/student/dashboard.jsx'
import Courses from './pages/student/courses.jsx'
import Assignments from './pages/student/assignments.jsx'
import Grades from './pages/student/grades.jsx'
import Messages from './pages/student/messages.jsx'
import Settings from './pages/student/settings.jsx'

function App() {
  const [userRole, setUserRole] = useState('student') // This should come from your auth system

  return (
    <BrowserRouter>
      <Routes>
        {userRole === 'instructor' ? (
          <Route path="/" element={<InstructorLayout />}>
            <Route index element={<InstructorDashboard />} />
            {/* Add other instructor routes here */}
          </Route>
        ) : (
          <Route path="/" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="student/dashboard" element={<Page />} />
            <Route path="student/courses" element={<Courses />} />
            <Route path="student/assignments" element={<Assignments />} />
            <Route path="student/quizzes" element={<div>Quizzes Page</div>} />
            <Route path="student/grades" element={<Grades />} />
            <Route path="student/messages" element={<Messages />} />
            <Route path="student/settings" element={<Settings />} />
            <Route path="student/help" element={<div>Help Page</div>} />
            <Route path="logout" element={<div>Logout Page</div>} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
