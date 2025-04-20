import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 'STU2024001',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@student.edu',
    phone: '+91 9876543210',
    bio: 'Final year Computer Science student at IIT Delhi. Passionate about AI, Machine Learning, and Web Development. Currently working on a project in Natural Language Processing.',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
    role: 'student',
    department: 'Computer Science',
    year: 'Final Year',
    enrollmentNumber: '2020CS12345',
    enrolledCourses: ['1', '2', '3'],
    createdAt: '2020-08-01',
    lastLogin: '2024-03-20',
    timezone: 'UTC+5:30',
    language: 'English',
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    autoSave: true,
    academicInfo: {
      cgpa: '8.5',
      semester: '8th',
      specialization: 'Artificial Intelligence',
      advisor: 'Dr. Rajesh Kumar'
    },
    contactInfo: {
      emergencyContact: '+91 9876543211',
      address: 'Hostel Block C, Room 304, IIT Delhi',
      parentEmail: 'parent.sharma@email.com'
    }
  })

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }))
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 