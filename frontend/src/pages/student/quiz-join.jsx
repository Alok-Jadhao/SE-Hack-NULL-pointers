import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinQuizPage() {
  const [quizCode, setQuizCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!quizCode.trim()) {
      setError('Please enter a quiz code');
      return;
    }
    
    setIsJoining(true);
    setError('');
    
    try {
      // Verify the quiz code exists
      const response = await fetch(`http://localhost:8000/api/quizzes/verify/${quizCode}`);
      
      if (!response.ok) {
        throw new Error('Invalid quiz code');
      }
      
      const data = await response.json();
      
      // Navigate to the live quiz session with the quiz ID
      navigate(`/student/quizzes/live/${data.quizId}`);
    } catch (error) {
      console.error('Error joining quiz:', error);
      setError(error.message || 'Failed to join quiz');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Join a Quiz</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="quizCode" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Quiz Code
            </label>
            <input
              type="text"
              id="quizCode"
              placeholder="e.g. QUIZ123"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              The quiz code will be provided by your instructor
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 flex items-center justify-center"
            disabled={isJoining}
          >
            {isJoining ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining Quiz...
              </>
            ) : (
              'Join Quiz'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 