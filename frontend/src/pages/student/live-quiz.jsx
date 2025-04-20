import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, XCircle, Award } from 'lucide-react';

export default function StudentLiveQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState('connecting'); // connecting, waiting, active, completed
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  
  const socketRef = useRef(null);
  const timerRef = useRef(null);
  
  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearInterval(timerRef.current);
    };
  }, [quizId]);
  
  const connectWebSocket = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }
    
    try {
      const socket = new WebSocket(`ws://localhost:8000/ws?token=${token}&quizId=${quizId}`);
      
      socket.onopen = () => {
        console.log('WebSocket connected');
        setStatus('waiting');
        setIsLoading(false);
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleSocketMessage(data);
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error');
        setIsLoading(false);
      };
      
      socket.onclose = () => {
        console.log('WebSocket closed');
        if (status !== 'completed') {
          setError('Connection closed');
        }
      };
      
      socketRef.current = socket;
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setError('Failed to establish connection');
      setIsLoading(false);
    }
  };
  
  const handleSocketMessage = (data) => {
    const { type } = data;
    
    switch (type) {
      case 'joined_quiz':
        setQuizTitle(data.quizTitle);
        setStatus(data.status);
        break;
        
      case 'quiz_started':
        setStatus('active');
        break;
        
      case 'question':
        setCurrentQuestion(data.question);
        setSelectedOption(null);
        setHasAnswered(false);
        // Start timer
        startTimer(data.question.timeLimit || 30);
        break;
        
      case 'answer_received':
        // Confirmation that the server received the answer
        break;
        
      case 'quiz_ended':
        setStatus('completed');
        setResults(data.yourResult);
        clearInterval(timerRef.current);
        break;
        
      case 'instructor_left':
        setError('The instructor has ended the session');
        break;
        
      case 'error':
        setError(data.message);
        break;
        
      default:
        console.log('Unknown message type:', type);
    }
  };
  
  const submitAnswer = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && selectedOption !== null) {
      socketRef.current.send(JSON.stringify({
        type: 'answer',
        questionIndex: currentQuestion.questionNumber - 1,
        selectedOption
      }));
      setHasAnswered(true);
    }
  };
  
  const startTimer = (seconds) => {
    clearInterval(timerRef.current);
    setTimeLeft(seconds);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-submit if no answer selected
          if (!hasAnswered && selectedOption !== null) {
            submitAnswer();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-600 border-gray-200 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Joining quiz session...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/student/quizzes')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{quizTitle}</h1>
        <p className="text-gray-600">Live Quiz</p>
      </header>
      
      {status === 'waiting' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 border-4 border-t-purple-600 border-gray-200 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold mb-2">Waiting for the instructor to start the quiz</h2>
          <p className="text-gray-600">
            The quiz will begin automatically once the instructor starts it.
            Please do not refresh the page.
          </p>
        </div>
      )}
      
      {status === 'active' && currentQuestion && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Question {currentQuestion.questionNumber} of {currentQuestion.totalQuestions}
            </h2>
            <div className={`flex items-center px-3 py-1 rounded-full ${
              timeLeft > 10 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
            }`}>
              <Clock size={18} className="mr-1" />
              <span>{timeLeft}s remaining</span>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-lg mb-4">{currentQuestion.questionText}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 border rounded-lg text-left transition ${
                    selectedOption === index 
                      ? 'bg-purple-100 border-purple-300' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !hasAnswered && setSelectedOption(index)}
                  disabled={hasAnswered}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedOption === index 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={submitAnswer}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={selectedOption === null || hasAnswered}
            >
              {hasAnswered ? 'Answer Submitted' : 'Submit Answer'}
            </button>
          </div>
          
          {hasAnswered && (
            <div className="mt-4 text-center text-gray-600">
              Waiting for next question...
            </div>
          )}
        </div>
      )}
      
      {status === 'completed' && results && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">Here's how you did:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-blue-600 text-sm mb-1">Your Score</p>
              <p className="text-3xl font-bold text-blue-700">{results.score} pts</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-green-600 text-sm mb-1">Correct Answers</p>
              <p className="text-3xl font-bold text-green-700">{results.correctAnswers}/{results.totalQuestions}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-purple-600 text-sm mb-1">Your Ranking</p>
              <p className="text-3xl font-bold text-purple-700">{results.ranking}/{results.totalParticipants}</p>
            </div>
          </div>
          
          {results.topPerformers && results.topPerformers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-center">Top Performers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.topPerformers.map((student, index) => (
                  <div key={student.id} className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-200 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="font-medium">{student.name}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {student.correctAnswers}/{student.totalQuestions} correct · {student.score} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/student/quizzes')}
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