const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || "test123";

export const seedData = {
  users: [
    {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@campus.edu',
      password: DEFAULT_PASSWORD,
      role: 'instructor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Prof. Michael Chen',
      email: 'michael.chen@campus.edu',
      password: DEFAULT_PASSWORD,
      role: 'instructor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@campus.edu',
      password: DEFAULT_PASSWORD,
      role: 'instructor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    {
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD,
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    {
      name: 'John Student',
      email: 'john.student@campus.edu',
      password: process.env.STUDENT_PASSWORD || DEFAULT_PASSWORD,
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  ],
};