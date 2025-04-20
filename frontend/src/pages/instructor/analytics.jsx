import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, Book, Award, Clock, BarChart, PieChart, LineChart, Download } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Sample data for development
  const sampleData = {
    overview: {
      totalStudents: 142,
      totalCourses: 8,
      completionRate: 68,
      averageTime: 4.2 // hours
    },
    monthlyStudents: [
      { month: 'Jan', count: 22 },
      { month: 'Feb', count: 28 },
      { month: 'Mar', count: 36 },
      { month: 'Apr', count: 42 },
      { month: 'May', count: 48 },
      { month: 'Jun', count: 54 },
      { month: 'Jul', count: 62 },
      { month: 'Aug', count: 74 },
      { month: 'Sep', count: 86 },
      { month: 'Oct', count: 98 },
      { month: 'Nov', count: 118 },
      { month: 'Dec', count: 142 }
    ],
    courseEngagement: [
      { name: 'Web Development Basics', students: 48, completion: 72 },
      { name: 'Advanced React', students: 36, completion: 82 },
      { name: 'Database Design', students: 24, completion: 68 },
      { name: 'Mobile App Development', students: 32, completion: 64 },
      { name: 'UI/UX Design Principles', students: 28, completion: 78 },
    ],
    quizPerformance: [
      { name: 'HTML Fundamentals', average: 85 },
      { name: 'CSS Selectors', average: 78 },
      { name: 'JavaScript Basics', average: 72 },
      { name: 'React Components', average: 68 },
      { name: 'API Integration', average: 74 },
    ],
    studentActivity: {
      morning: 22,
      afternoon: 38,
      evening: 28,
      night: 12
    }
  };

  useEffect(() => {
    // For development, we'll use sample data
    // In production, this would be an API call:
    // const fetchAnalytics = async () => {
    //   try {
    //     const response = await axios.get(`${API_ENDPOINTS.INSTRUCTOR_ANALYTICS}?timeRange=${timeRange}`);
    //     setAnalyticsData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching analytics data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchAnalytics();

    // Using sample data for now
    setTimeout(() => {
      setAnalyticsData(sampleData);
      setIsLoading(false);
    }, 1000); // Simulate loading
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        
        <div className="flex">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button 
              className={`px-4 py-2 text-sm ${timeRange === 'week' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('week')}
            >
              Week
            </button>
            <button 
              className={`px-4 py-2 text-sm ${timeRange === 'month' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('month')}
            >
              Month
            </button>
            <button 
              className={`px-4 py-2 text-sm ${timeRange === 'year' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('year')}
            >
              Year
            </button>
          </div>

          <button 
            className="ml-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
            onClick={() => alert('Export analytics data')}
          >
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Students</p>
              <h3 className="text-2xl font-bold">{analyticsData.overview.totalStudents}</h3>
              <p className="text-xs text-green-500 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Courses</p>
              <h3 className="text-2xl font-bold">{analyticsData.overview.totalCourses}</h3>
              <p className="text-xs text-green-500 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +2 new this month
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Book size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
              <h3 className="text-2xl font-bold">{analyticsData.overview.completionRate}%</h3>
              <p className="text-xs text-green-500 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +5% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Award size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg. Course Time</p>
              <h3 className="text-2xl font-bold">{analyticsData.overview.averageTime} hrs</h3>
              <p className="text-xs text-red-500 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                -0.8 hrs from last month
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Student Growth</h3>
            <div className="flex items-center text-gray-500">
              <LineChart size={18} className="mr-2" />
              <span className="text-sm">Monthly data</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end">
            {analyticsData.monthlyStudents.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-4/5 bg-purple-500 hover:bg-purple-600 rounded-t-sm" 
                  style={{ height: `${(month.count / 142) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{month.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Course Engagement</h3>
            <div className="flex items-center text-gray-500">
              <BarChart size={18} className="mr-2" />
              <span className="text-sm">Top 5 courses</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {analyticsData.courseEngagement.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{course.name}</span>
                  <span className="text-sm text-gray-500">{course.students} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${course.completion}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right text-gray-500 mt-1">{course.completion}% completion</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Quiz Performance</h3>
            <div className="flex items-center text-gray-500">
              <BarChart size={18} className="mr-2" />
              <span className="text-sm">Average scores</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {analyticsData.quizPerformance.map((quiz, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{quiz.name}</span>
                  <span className="text-sm text-gray-500">{quiz.average}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${quiz.average >= 80 
                      ? 'bg-green-500' 
                      : quiz.average >= 70 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'}`} 
                    style={{ width: `${quiz.average}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Student Activity</h3>
            <div className="flex items-center text-gray-500">
              <PieChart size={18} className="mr-2" />
              <span className="text-sm">Time of day</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <h4 className="text-lg font-medium text-blue-800">Morning</h4>
                <p className="text-3xl font-bold text-blue-600 mt-2">{analyticsData.studentActivity.morning}%</p>
                <p className="text-xs text-blue-500 mt-1">6 AM - 12 PM</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 text-center">
                <h4 className="text-lg font-medium text-yellow-800">Afternoon</h4>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{analyticsData.studentActivity.afternoon}%</p>
                <p className="text-xs text-yellow-500 mt-1">12 PM - 6 PM</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <h4 className="text-lg font-medium text-purple-800">Evening</h4>
                <p className="text-3xl font-bold text-purple-600 mt-2">{analyticsData.studentActivity.evening}%</p>
                <p className="text-xs text-purple-500 mt-1">6 PM - 12 AM</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <h4 className="text-lg font-medium text-gray-800">Night</h4>
                <p className="text-3xl font-bold text-gray-600 mt-2">{analyticsData.studentActivity.night}%</p>
                <p className="text-xs text-gray-500 mt-1">12 AM - 6 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 