import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const QuizCodeGenerator = ({ quizId }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCode = async () => {
    setIsLoading(true);
    setError('');
    setCopied(false);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:8000/api/quizzes/${quizId}/generate-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate access code');
      }
      
      const data = await response.json();
      setAccessCode(data.accessCode);
    } catch (error) {
      console.error('Error generating code:', error);
      setError(error.message || 'Failed to generate access code');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Quiz Access Code</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md">
          {error}
        </div>
      )}
      
      {!accessCode ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Generate an access code to share with your students.
            They'll use this code to join the live quiz session.
          </p>
          
          <button
            onClick={generateCode}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center mx-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Access Code'
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-4">
            <div className="text-xl font-mono font-bold tracking-wider text-purple-600">{accessCode}</div>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Copy to clipboard"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={generateCode}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Generate new code"
                disabled={isLoading}
              >
                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
          
          {copied && (
            <div className="text-green-600 text-sm mb-4">
              Code copied to clipboard!
            </div>
          )}
          
          <p className="text-sm text-gray-600">
            This code is valid for 24 hours. Share it with your students so they can join the live quiz.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizCodeGenerator; 