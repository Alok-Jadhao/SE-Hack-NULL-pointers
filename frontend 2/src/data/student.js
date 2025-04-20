export const studentData = {
  id: 'STU001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
  department: 'Computer Science',
  semester: '4th',
  enrollmentDate: '2023-09-01',
  totalCourses: 3,
  completedCourses: 1,
  inProgressCourses: 2,
  averageGrade: 'A-',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
  achievements: [
    {
      id: 'ACH001',
      title: 'Top Performer in Web Development',
      date: '2023-12-15',
      description: 'Achieved highest marks in Web Development course'
    },
    {
      id: 'ACH002',
      title: 'Hackathon Winner',
      date: '2023-11-20',
      description: 'Won first prize in annual coding competition'
    }
  ],
  notifications: [
    {
      id: 'NOT001',
      title: 'New Assignment Posted',
      course: 'Advanced Web Development',
      date: '2024-03-15',
      read: false
    },
    {
      id: 'NOT002',
      title: 'Course Update',
      course: 'Data Structures',
      date: '2024-03-14',
      read: true
    }
  ],
  upcomingDeadlines: [
    {
      id: 'DL001',
      title: 'Web Development Project',
      course: 'Advanced Web Development',
      dueDate: '2024-03-20',
      type: 'Project'
    },
    {
      id: 'DL002',
      title: 'Data Structures Quiz',
      course: 'Data Structures',
      dueDate: '2024-03-18',
      type: 'Quiz'
    }
  ],
  preferences: {
    theme: 'light',
    notifications: true,
    emailNotifications: true,
    language: 'en'
  }
} 