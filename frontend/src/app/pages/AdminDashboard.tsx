import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, BookOpen, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats] = useState({
    totalUsers: 1247,
    totalCourses: 89,
    totalQuizzes: 342,
    activeUsers: 823,
    newUsers: 45,
  });
  const [flaggedItems, setFlaggedItems] = useState([
    { id: 1, content: 'Inappropriate comment in forum', course: 'Web Development', reporter: 'Student', status: 'pending' },
    { id: 2, content: 'Quiz answer dispute', course: 'Algorithms', reporter: 'Student', status: 'pending' },
    { id: 3, content: 'Copyright concern in materials', course: 'Design Basics', reporter: 'Instructor', status: 'reviewing' },
  ]);

  const handleApprove = (id: number) => {
    setFlaggedItems(items => items.filter(i => i.id !== id));
    toast.success('Content approved and restored');
  };

  const handleRemove = (id: number) => {
    setFlaggedItems(items => items.filter(i => i.id !== id));
    toast.success('Content removed successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor platform activity and manage content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Users</p>
              <h3 className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</h3>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600">+{stats.newUsers} this week</p>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Courses</p>
              <h3 className="text-3xl font-bold">{stats.totalCourses}</h3>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600">+8 this month</p>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Active Users</p>
              <h3 className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</h3>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600">+12% today</p>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Flagged Content</p>
              <h3 className="text-3xl font-bold">{flaggedItems.length}</h3>
              <div className="flex items-center gap-2 mt-2">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600">-3 from last week</p>
              </div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Recent Platform Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New course created', by: 'Dr. Sarah Johnson', time: '5 min ago', type: 'course' },
              { action: 'Content flagged for review', by: 'System', time: '15 min ago', type: 'flag' },
              { action: 'New instructor registered', by: 'Prof. Michael Chen', time: '1 hour ago', type: 'user' },
              { action: 'Quiz battle completed', by: '156 students', time: '2 hours ago', type: 'quiz' },
              { action: 'Course content updated', by: 'Dr. Emily Rodriguez', time: '3 hours ago', type: 'course' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'course' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  activity.type === 'flag'   ? 'bg-orange-100 dark:bg-orange-900/30' :
                  activity.type === 'user'   ? 'bg-purple-100 dark:bg-purple-900/30' :
                                               'bg-green-100 dark:bg-green-900/30'
                }`}>
                  {activity.type === 'course' && <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {activity.type === 'flag'   && <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                  {activity.type === 'user'   && <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  {activity.type === 'quiz'   && <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">By {activity.by} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/performance')}
            className="w-full mt-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors text-sm"
          >
            View Full Activity Log
          </button>
        </div>

        {/* Flagged Content */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Flagged Content Review</h3>
          {flaggedItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium mb-1">All clear!</p>
              <p className="text-sm">No flagged content to review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {flaggedItems.map((item) => (
                <div key={item.id} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium">{item.content}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.course} • Reported by {item.reporter}
                      </p>
                    </div>
                    <span className={`shrink-0 text-xs px-2 py-1 rounded-full ${
                      item.status === 'pending'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => toast.info(`Reviewing: "${item.content}"`)}
                      className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Platform Stats Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-6">Platform Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), sub: `${stats.activeUsers} active today`, color: 'from-blue-500 to-blue-600' },
            { label: 'Total Courses', value: stats.totalCourses, sub: '+8 this month', color: 'from-purple-500 to-purple-600' },
            { label: 'Total Quizzes', value: stats.totalQuizzes, sub: 'Across all courses', color: 'from-pink-500 to-pink-600' },
            { label: 'New Users', value: stats.newUsers, sub: 'This week', color: 'from-orange-500 to-orange-600' },
          ].map((item, i) => (
            <div key={i} className={`bg-gradient-to-br ${item.color} rounded-xl p-5 text-white`}>
              <div className="text-3xl font-bold mb-1">{item.value}</div>
              <div className="text-sm font-medium mb-1">{item.label}</div>
              <div className="text-xs text-white/80">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
