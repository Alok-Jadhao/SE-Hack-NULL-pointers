import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Award, Target, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function PerformancePage() {
  const [timeRange, setTimeRange] = useState('week');

  const performanceData = [
    { date: 'Mon', score: 85, quizzes: 3 },
    { date: 'Tue', score: 88, quizzes: 2 },
    { date: 'Wed', score: 92, quizzes: 4 },
    { date: 'Thu', score: 87, quizzes: 3 },
    { date: 'Fri', score: 95, quizzes: 5 },
    { date: 'Sat', score: 90, quizzes: 2 },
    { date: 'Sun', score: 93, quizzes: 3 },
  ];

  const skillsData = [
    { skill: 'React', score: 92 },
    { skill: 'Algorithms', score: 85 },
    { skill: 'Database', score: 78 },
    { skill: 'ML/AI', score: 72 },
    { skill: 'Design', score: 88 },
  ];

  const courseProgress = [
    { course: 'Web Development', completed: 65, total: 100, grade: 'A' },
    { course: 'Algorithms', completed: 40, total: 100, grade: 'B+' },
    { course: 'Machine Learning', completed: 25, total: 100, grade: 'B' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress, identify strengths, and improve your learning outcomes
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Average Score</p>
              <h3 className="text-3xl font-bold">91%</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+5% from last week</span>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Quizzes Completed</p>
              <h3 className="text-3xl font-bold">22</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+8 this week</span>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Study Time</p>
              <h3 className="text-3xl font-bold">18.5h</h3>
              <div className="flex items-center gap-1 mt-2 text-red-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">-2h from last week</span>
              </div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Achievements</p>
              <h3 className="text-3xl font-bold">12</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+3 this week</span>
              </div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Performance Trend */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Quiz Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="quizzes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skills Radar */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="skill" stroke="var(--color-muted-foreground)" />
              <PolarRadiusAxis stroke="var(--color-muted-foreground)" />
              <Radar
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Course Progress */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-6">Course Progress</h3>
          <div className="space-y-6">
            {courseProgress.map((course, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{course.course}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.completed}% complete
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      course.grade.startsWith('A') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      course.grade.startsWith('B') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      Grade: {course.grade}
                    </div>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${course.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-accent rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 rounded-lg p-2 mt-0.5">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Recommendation</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on Database Systems to improve your overall performance. 
                  Consider reviewing SQL optimization techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-6">Recent Achievements</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Week Warrior', description: '7-day learning streak', color: 'from-orange-500 to-red-500' },
            { title: 'Quiz Master', description: 'Scored 95%+ on 5 quizzes', color: 'from-purple-500 to-pink-500' },
            { title: 'Top Performer', description: 'Ranked #3 in React Battle', color: 'from-blue-500 to-cyan-500' },
            { title: 'Fast Learner', description: 'Completed 3 modules this week', color: 'from-green-500 to-emerald-500' },
          ].map((achievement, index) => (
            <div key={index} className={`bg-gradient-to-br ${achievement.color} rounded-xl p-6 text-white`}>
              <Award className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">{achievement.title}</h4>
              <p className="text-sm text-white/90">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
