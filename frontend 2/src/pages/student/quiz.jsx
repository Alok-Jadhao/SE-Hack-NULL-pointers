import { useState, useEffect } from 'react'
import { Clock, Users, CheckCircle, XCircle, ChevronRight, Flag, ThumbsUp, Smile } from 'lucide-react'

// Dummy quiz data
const quizData = {
  title: "Web Development Fundamentals",
  timeLimit: 300, // 5 minutes in seconds
  totalPlayers: 12,
  questions: [
    {
      id: 1,
      question: "What is the purpose of the 'useState' hook in React?",
      image: null,
      options: [
        { id: 'a', text: "To manage component state" },
        { id: 'b', text: "To handle HTTP requests" },
        { id: 'c', text: "To create new components" },
        { id: 'd', text: "To style components" }
      ],
      correctAnswer: 'a',
      explanation: "useState is a React Hook that allows you to add state to functional components."
    },
    {
      id: 2,
      question: "Which of these is NOT a JavaScript framework?",
      image: null,
      options: [
        { id: 'a', text: "React" },
        { id: 'b', text: "Angular" },
        { id: 'c', text: "Vue" },
        { id: 'd', text: "Django" }
      ],
      correctAnswer: 'd',
      explanation: "Django is a Python web framework, not a JavaScript framework."
    }
  ]
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit)
  const [showReactions, setShowReactions] = useState(false)

  const currentQuestion = quizData.questions[currentQuestionIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleOptionSelect = (optionId) => {
    if (!isSubmitted) {
      setSelectedOption(optionId)
    }
  }

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true)
    }
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1)
    setSelectedOption(null)
    setIsSubmitted(false)
    setTimeLeft(quizData.timeLimit)
  }

  const handleTimeUp = () => {
    if (!isSubmitted) {
      setIsSubmitted(true)
    }
  }

  const isCorrect = selectedOption === currentQuestion.correctAnswer

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{quizData.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock size={20} />
              <span>Time left: {formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users size={20} />
              <span>Players: {quizData.totalPlayers}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {currentQuestion.question}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-lg text-left transition-colors
                  ${selectedOption === option.id
                    ? isSubmitted
                      ? option.id === currentQuestion.correctAnswer
                        ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500'
                        : 'bg-red-100 dark:bg-red-900 border-2 border-red-500'
                      : 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                  ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="font-medium">{option.id.toUpperCase()}. </span>
                {option.text}
              </button>
            ))}
          </div>

          {isSubmitted && (
            <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
                <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Reaction Panel */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Smile size={24} />
          </button>
          {showReactions && (
            <div className="absolute right-12 top-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Fire size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <ThumbsUp size={24} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Smile size={24} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Flag size={20} className="inline mr-2" />
              Report Question
            </button>
            <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
              Exit Quiz
            </button>
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={!isSubmitted || currentQuestionIndex === quizData.questions.length - 1}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            Next Question
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  )
} 