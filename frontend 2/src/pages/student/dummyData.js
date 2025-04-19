export const studentData = {
  profile: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/student-avatar.jpg",
    enrollmentDate: "2024-01-15",
    department: "Computer Science",
    semester: "Spring 2024"
  },
  
  stats: {
    totalCourses: 6,
    completedCourses: 2,
    inProgressCourses: 3,
    upcomingCourses: 1,
    averageGrade: 85,
    totalHoursWatched: 45
  },

  watchedCourses: [
    {
      id: 1,
      title: "Advanced React Development",
      progress: "4/8 Watched",
      category: "FRONTEND",
      image: "/course1.jpg",
      lastWatched: "2024-03-14T15:30:00",
      instructor: {
        name: "Prashant Kumar Singh",
        role: "Senior Software Developer",
        avatar: "/instructor1.jpg"
      }
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      progress: "3/10 Watched",
      category: "BACKEND",
      image: "/course2.jpg",
      lastWatched: "2024-03-13T10:15:00",
      instructor: {
        name: "Sarah Johnson",
        role: "Backend Engineer",
        avatar: "/instructor2.jpg"
      }
    },
    {
      id: 3,
      title: "Database Design & Optimization",
      progress: "5/6 Watched",
      category: "DATABASE",
      image: "/course3.jpg",
      lastWatched: "2024-03-12T14:45:00",
      instructor: {
        name: "Michael Chen",
        role: "Database Architect",
        avatar: "/instructor3.jpg"
      }
    }
  ],

  upcomingDeadlines: [
    {
      id: 1,
      title: "React Components Assignment",
      course: "Advanced React Development",
      dueDate: "2024-03-15 at 23:59",
      type: "Assignment",
      priority: "High"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Quiz",
      course: "Programming Basics",
      dueDate: "2024-03-18 at 14:00",
      type: "Quiz",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "Database Design & Optimization",
      dueDate: "2024-03-20 at 23:59",
      type: "Project",
      priority: "High"
    }
  ],

  recentActivity: [
    {
      id: 1,
      type: "quiz_completed",
      course: "Advanced React Development",
      title: "React Hooks Quiz",
      score: 85,
      date: "2024-03-14T16:30:00"
    },
    {
      id: 2,
      type: "assignment_submitted",
      course: "Node.js Backend Development",
      title: "Express.js API Project",
      status: "Submitted",
      date: "2024-03-13T11:45:00"
    },
    {
      id: 3,
      type: "course_started",
      course: "Database Design & Optimization",
      title: "Started new course",
      date: "2024-03-12T09:15:00"
    }
  ],

  mentors: [
    {
      id: 1,
      name: "Dr. Emily Parker",
      role: "Senior Instructor",
      department: "Computer Science",
      avatar: "/mentor1.jpg",
      expertise: ["Web Development", "Software Architecture"],
      availability: "Mon-Fri, 9AM-5PM",
      nextMeeting: "2024-03-15T14:00:00"
    },
    {
      id: 2,
      name: "Prof. James Wilson",
      role: "Technical Mentor",
      department: "Software Engineering",
      avatar: "/mentor2.jpg",
      expertise: ["Database Systems", "Cloud Computing"],
      availability: "Tue-Thu, 10AM-4PM",
      nextMeeting: "2024-03-16T11:00:00"
    }
  ],

  notifications: [
    {
      id: 1,
      type: "deadline_reminder",
      title: "Assignment Due Soon",
      message: "React Components Assignment is due in 2 days",
      course: "Advanced React Development",
      date: "2024-03-13T09:00:00",
      read: false
    },
    {
      id: 2,
      type: "grade_released",
      title: "New Grade Available",
      message: "Your JavaScript Quiz grade has been released",
      course: "Programming Basics",
      date: "2024-03-12T15:30:00",
      read: true
    },
    {
      id: 3,
      type: "course_update",
      title: "New Course Material",
      message: "New lecture videos added to Database Design course",
      course: "Database Design & Optimization",
      date: "2024-03-11T10:15:00",
      read: false
    }
  ]
}; 