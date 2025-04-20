import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InstructorLiveQuiz() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [results, setResults] = useState(null);

  const handleSocketMessage = (data) => {
    const { type } = data;
    
    switch (type) {
      case 'joined_quiz':
        setParticipants(data.participants);
        break;
        
      case 'quiz_ended':
        setResults(data.yourResult);
        break;
        
      case 'instructor_left':
        // Handle instructor leaving
        break;
        
      default:
        console.log('Unknown message type:', type);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Live Quiz Results</h1>
        <p className="text-gray-600">Quiz Results</p>
      </header>
      
      {results && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">Here's how you did:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="flex justify-between">
                <span className="text-gray-600">Participants:</span>
                <span className="font-medium">{participants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-medium">{results.summary?.averageScore || 0} points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Highest Score:</span>
                <span className="font-medium">{results.summary?.highestScore || 0} points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lowest Score:</span>
                <span className="font-medium">{results.summary?.lowestScore || 0} points</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Top Performers</h3>
              {results.results.slice(0, 3).map((student, index) => (
                <div key={student.id} className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                    index === 1 ? 'bg-gray-200 text-gray-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-600">
                      {student.correctAnswers}/{student.totalQuestions} correct
                    </div>
                  </div>
                  <div className="font-bold">{student.score} pts</div>
                </div>
              ))}
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-3">All Participants</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.results.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.score} points</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.correctAnswers}/{student.totalQuestions}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/instructor/quizzes')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 