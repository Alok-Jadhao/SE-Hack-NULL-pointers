import { useState } from 'react'
import './style.css'
import Page from './pages/page.jsx'
import InstructorLayout from './pages/instructor/layout.jsx'
import InstructorDashboard from './pages/instructor/page.jsx'

function App() {
  const [userRole, setUserRole] = useState('student') // This should come from your auth system

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'instructor' ? (
        <InstructorLayout>
          <InstructorDashboard />
        </InstructorLayout>
      ) : (
        <Page />
      )}
    </div>
  )
}

export default App
