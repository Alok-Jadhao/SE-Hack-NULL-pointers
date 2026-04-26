/**
 * Seed data for Campus LMS
 * Contains sample courses, instructors, and quizzes for testing
 */

export const seedData = {
  users: [
    {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@campus.edu',
      password: 'instructor123',
      role: 'instructor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Prof. Michael Chen',
      email: 'michael.chen@campus.edu',
      password: 'instructor123',
      role: 'instructor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@campus.edu',
      password: 'instructor123',
      role: 'instructor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    {
      name: 'John Student',
      email: 'john.student@campus.edu',
      password: 'student123',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  ],

  courses: [
    {
      title: 'Advanced Web Development',
      description: 'Master modern web development with React, Node.js, TypeScript, and best practices',
      category: 'Web Development',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      modules: [
        {
          title: 'React Fundamentals',
          description: 'Learn React basics and hooks',
          content: 'https://example.com/react-intro',
          contentType: 'video',
          duration: 60,
          order: 1,
          isLocked: false,
        },
        {
          title: 'State Management',
          description: 'Redux and Context API',
          content: 'https://example.com/state-management',
          contentType: 'video',
          duration: 90,
          order: 2,
          isLocked: false,
        },
      ],
      isPublished: true,
    },
    {
      title: 'Data Structures & Algorithms',
      description: 'Build a strong foundation in computer science fundamentals with hands-on coding',
      category: 'Computer Science',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      modules: [
        {
          title: 'Fundamental Data Structures',
          description: 'Arrays, Linked Lists, Stacks, Queues',
          content: 'https://example.com/data-structures',
          contentType: 'video',
          duration: 120,
          order: 1,
          isLocked: false,
        },
        {
          title: 'Sorting Algorithms',
          description: 'Quick Sort, Merge Sort, Heap Sort',
          content: 'https://example.com/sorting',
          contentType: 'video',
          duration: 100,
          order: 2,
          isLocked: false,
        },
      ],
      isPublished: true,
    },
    {
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to ML concepts, algorithms, and practical applications',
      category: 'AI & ML',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      modules: [
        {
          title: 'ML Basics',
          description: 'Supervised and Unsupervised Learning',
          content: 'https://example.com/ml-basics',
          contentType: 'video',
          duration: 75,
          order: 1,
          isLocked: false,
        },
      ],
      isPublished: true,
    },
  ],

  quizzes: [
    {
      title: 'Advanced React Quiz',
      description: 'Test your React knowledge',
      questions: [
        {
          question: 'What is the purpose of useCallback in React?',
          options: [
            'To optimize performance by memoizing callbacks',
            'To handle async operations',
            'To manage state',
            'To create side effects',
          ],
          correctAnswer: 0,
          points: 10,
          timeLimit: 30,
        },
        {
          question: 'Which hook is used for side effects in React?',
          options: [
            'useState',
            'useEffect',
            'useContext',
            'useReducer',
          ],
          correctAnswer: 1,
          points: 10,
          timeLimit: 30,
        },
      ],
      passingScore: 70,
      maxParticipants: 50,
    },
    {
      title: 'Data Structures Basics',
      description: 'Test your knowledge of basic data structures',
      questions: [
        {
          question: 'What is the time complexity of searching in a balanced BST?',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
          correctAnswer: 1,
          points: 10,
          timeLimit: 30,
        },
        {
          question: 'What data structure uses LIFO principle?',
          options: ['Queue', 'Stack', 'Array', 'Tree'],
          correctAnswer: 1,
          points: 10,
          timeLimit: 30,
        },
      ],
      passingScore: 60,
      maxParticipants: 50,
    },
  ],
};

