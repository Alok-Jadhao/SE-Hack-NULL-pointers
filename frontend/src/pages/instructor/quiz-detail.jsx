import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Edit, Trash, Copy, Users, Clock } from 'lucide-react';
import QuizCodeGenerator from '../../components/quiz/QuizCodeGenerator';

export default function QuizDetailPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/quizzes/${quizId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch quiz');
        
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError(error.message || 'Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuiz();
  }, [quizId]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!quiz) return null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/instructor/quizzes/edit/${quizId}`)}
            className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-200"
          >
            <Edit size={18} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => navigate(`/instructor/quizzes/live/${quizId}`)}
            className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-green-700"
          >
            <Play size={18} />
            <span>Start Live</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <div className="p-3 bg-blue-100 rounded-full mr-3">
            <Clock size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600">Duration</p>
            <p className="text-xl font-bold text-blue-800">{quiz.timeLimit} min</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 flex items-center">
          <div className="p-3 bg-green-100 rounded-full mr-3">
            <Users size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-green-600">Passing Score</p>
            <p className="text-xl font-bold text-green-800">{quiz.passingScore}%</p>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 flex items-center">
          <div className="p-3 bg-purple-100 rounded-full mr-3">
            <Copy size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-purple-600">Questions</p>
            <p className="text-xl font-bold text-purple-800">{quiz.questions?.length || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Code Generator for Live Session */}
      <QuizCodeGenerator quizId={quizId} />
      
      {/* Quiz Questions Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Quiz Questions</h2>
        
        {quiz.questions && quiz.questions.length > 0 ? (
          <div className="space-y-6">
            {quiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="border rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">Question {qIndex + 1}</h3>
                  <span className="text-sm text-gray-500">{question.points || 1} point{(question.points || 1) !== 1 ? 's' : ''}</span>
                </div>
                <p className="mb-4">{question.questionText}</p>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div 
                      key={oIndex}
                      className={`p-3 rounded-lg ${option.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}
                    >
                      {option.text}
                      {option.isCorrect && <span className="ml-2 text-green-600 text-sm">(Correct)</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No questions in this quiz</p>
        )}
      </div>
    </div>
  );
} 