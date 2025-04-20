import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Award, BookOpen } from 'lucide-react';

export default function StudentQuizzesPage() {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [pastQuizzes, setPastQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Sample data for development
  const sampleUpcomingQuizzes = [
    {
      id: 1,
      title: 'Web Development Basics',
      courseName: 'Introduction to Web Development',
      scheduledAt: '2023-04-25T15:30:00',
      duration: 30
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      courseName: 'JavaScript Programming',
      scheduledAt: '2023-04-27T14:00:00',
      duration: 45
    }
  ];

  const samplePastQuizzes = [
    {
      id: 3,
      title: 'HTML & CSS Quiz',
      courseName: 'Introduction to Web Development',
      completedAt: '2023-04-15T11:20:00',
      score: 85,
      totalQuestions: 10,
      correctAnswers: 8
    },
    {
      id: 4,
      title: 'Programming Basics',
      courseName: 'Computer Science 101',
      completedAt: '2023-04-10T09:45:00',
      score: 92,
      totalQuestions: 15,
      correctAnswers: 14
    }
  ];

  useEffect(() => {
    // For development, we'll use sample data
    // In production, this would fetch from the API
    setTimeout(() => {
      setUpcomingQuizzes(sampleUpcomingQuizzes);
      setPastQuizzes(samplePastQuizzes);
      setIsLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quizzes</h1>
        <button
          onClick={() => navigate('/student/quizzes/join')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Play size={18} />
          <span>Join Live Quiz</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Clock size={20} className="mr-2 text-blue-600" />
            Upcoming Quizzes
          </h2>
          
          {upcomingQuizzes.length === 0 ? (
            <div className="text-gray-500 italic text-center py-4">
              No upcoming quizzes scheduled
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingQuizzes.map(quiz => (
                <div key={quiz.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="font-medium text-lg mb-1">{quiz.title}</h3>
                  <div className="text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      {quiz.courseName}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {formatDate(quiz.scheduledAt)}
                    </div>
                    <div className="bg-green-50 text-green-700 px-2 py-1 rounded">
                      {quiz.duration} minutes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Award size={20} className="mr-2 text-green-600" />
            Past Quizzes
          </h2>
          
          {pastQuizzes.length === 0 ? (
            <div className="text-gray-500 italic text-center py-4">
              No past quizzes found
            </div>
          ) : (
            <div className="space-y-4">
              {pastQuizzes.map(quiz => (
                <div key={quiz.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{quiz.title}</h3>
                      <div className="text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          {quiz.courseName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Completed on {formatDate(quiz.completedAt)}
                      </div>
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg font-bold">
                      {quiz.score}%
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between text-gray-600 mb-1">
                      <span>Correct Answers</span>
                      <span>{quiz.correctAnswers}/{quiz.totalQuestions}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(quiz.correctAnswers / quiz.totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Quiz Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-2">Prepare Well</h3>
            <p className="text-sm text-gray-600">
              Review course materials before taking quizzes. Focus on key concepts and examples from your lessons.
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-2">Time Management</h3>
            <p className="text-sm text-gray-600">
              Keep an eye on the timer. Don't spend too much time on any single question.
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-2">Read Carefully</h3>
            <p className="text-sm text-gray-600">
              Make sure you understand what each question is asking before selecting an answer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 