import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  students: number;
  completion: number;
  quizzes: number;
  thumbnail: string;
}

export function InstructorDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    avgCompletion: 0,
    activeQuizzes: 0,
  });

  useEffect(() => {
    // Fetch instructor dashboard data
    // Mock data for now
    setCourses([
      {
        id: '1',
        title: 'Advanced Web Development',
        students: 124,
        completion: 68,
        quizzes: 8,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      },
      {
        id: '2',
        title: 'Modern JavaScript',
        students: 89,
        completion: 72,
        quizzes: 6,
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      },
      {
        id: '3',
        title: 'React Masterclass',
        students: 156,
        completion: 54,
        quizzes: 10,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      },
    ]);

    setStats({
      totalCourses: 3,
      totalStudents: 369,
      avgCompletion: 65,
      activeQuizzes: 24,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Instructor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your courses and track student performance
          </p>
        </div>
        <button
          onClick={() => navigate('/create-course')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Courses</p>
              <h3 className="text-3xl font-bold">{stats.totalCourses}</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">+2 this month</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Students</p>
              <h3 className="text-3xl font-bold">{stats.totalStudents}</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">+45 this month</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Avg Completion</p>
              <h3 className="text-3xl font-bold">{stats.avgCompletion}%</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">+5% this month</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Active Quizzes</p>
              <h3 className="text-3xl font-bold">{stats.activeQuizzes}</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">+3 this week</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <h2 className="mb-6">My Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="relative h-48 bg-muted">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold">{course.title}</h3>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur rounded-lg text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{course.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{course.completion}%</p>
                    <p className="text-xs text-muted-foreground">Completion</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{course.quizzes}</p>
                    <p className="text-xs text-muted-foreground">Quizzes</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/courses/${course.id}/edit`)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/performance?course=${course.id}`)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Recent Student Activity</h3>
          <div className="space-y-4">
            {[
              { student: 'Alice Johnson', action: 'Completed Module 3', course: 'Web Dev', time: '5 min ago' },
              { student: 'Bob Smith', action: 'Scored 95% on Quiz', course: 'JavaScript', time: '12 min ago' },
              { student: 'Carol Davis', action: 'Started Module 5', course: 'React', time: '1 hour ago' },
              { student: 'David Lee', action: 'Submitted Assignment', course: 'Web Dev', time: '2 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {activity.student.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{activity.student}</h4>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.course} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Performance Overview</h3>
          <div className="space-y-4">
            {[
              { course: 'Advanced Web Development', avgScore: 87, trend: '+5%' },
              { course: 'Modern JavaScript', avgScore: 82, trend: '+3%' },
              { course: 'React Masterclass', avgScore: 79, trend: '-2%' },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.course}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.avgScore}%</span>
                    <span className={`text-xs ${
                      item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${item.avgScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/performance')}
            className="w-full mt-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            View Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
