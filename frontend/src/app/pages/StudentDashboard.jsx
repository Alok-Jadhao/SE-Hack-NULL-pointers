import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  Play,
  CheckCircle2
} from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';



export function StudentDashboard() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    quizzesTaken: 0,
    averageScore: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    // Fetch dashboard data from your backend
    // Mock data for now
    setEnrolledCourses([
      {
        id: '1',
        title: 'Advanced Web Development',
        instructor: 'Dr. Sarah Johnson',
        progress: 65,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
        nextLesson: 'React Hooks Deep Dive',
        totalLessons: 24,
        completedLessons: 16,
      },
      {
        id: '2',
        title: 'Data Structures & Algorithms',
        instructor: 'Prof. Michael Chen',
        progress: 40,
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
        nextLesson: 'Binary Search Trees',
        totalLessons: 30,
        completedLessons: 12,
      },
      {
        id: '3',
        title: 'Machine Learning Fundamentals',
        instructor: 'Dr. Emily Rodriguez',
        progress: 25,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
        nextLesson: 'Linear Regression',
        totalLessons: 20,
        completedLessons: 5,
      },
    ]);

    setRecentQuizzes([
      { title: 'React Components Quiz', score: 92, rank: 3, date: '2 hours ago' },
      { title: 'Algorithm Complexity', score: 88, rank: 5, date: 'Yesterday' },
      { title: 'Database Design Battle', score: 95, rank: 1, date: '2 days ago' },
    ]);

    setStats({
      totalCourses: 3,
      completedCourses: 0,
      quizzesTaken: 12,
      averageScore: 91,
      currentStreak: 7,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2">Welcome back! 👋</h1>
        <p className="text-muted-foreground">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Enrolled Courses</p>
              <h3 className="text-3xl font-bold">{stats.totalCourses}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Average Score</p>
              <h3 className="text-3xl font-bold">{stats.averageScore}%</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-pink-100 text-sm mb-1">Quizzes Taken</p>
              <h3 className="text-3xl font-bold">{stats.quizzesTaken}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">Current Streak</p>
              <h3 className="text-3xl font-bold">{stats.currentStreak} days</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2>Continue Learning</h2>
            <button
              onClick={() => navigate('/courses')}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-40 sm:h-auto bg-muted relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-medium">
                        {course.completedLessons}/{course.totalLessons} Lessons
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {course.progress}%
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Play className="w-4 h-4" />
                        <span>Next: {course.nextLesson}</span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        Continue
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Quiz Results */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Recent Quiz Results</h3>
              <button
                onClick={() => navigate('/quiz-battle')}
                className="text-sm text-primary hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentQuizzes.map((quiz, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    quiz.rank === 1
                      ? 'bg-yellow-500 text-white'
                      : quiz.rank <= 3
                      ? 'bg-blue-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    #{quiz.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{quiz.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{quiz.score}% score</span>
                      <span>•</span>
                      <span>{quiz.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/quiz-battle')}
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Join Quiz Battle
            </button>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-6">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Assignment Due</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Web Dev Project - Due in 2 days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Quiz Available</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Algorithm Quiz - Opens tomorrow
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Week Warrior!</h3>
              <p className="text-sm text-white/90 mb-4">
                You've maintained a 7-day learning streak. Keep it up!
              </p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-white rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
