import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Save, ChevronLeft, HelpCircle, Trash } from 'lucide-react';

export default function QuizCreate() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    course: '',
    duration: 30,
    passingScore: 70,
    questions: [
      {
        id: 1,
        text: '',
        type: 'multiple-choice',
        options: [
          { id: 1, text: '', isCorrect: false },
          { id: 2, text: '', isCorrect: false },
          { id: 3, text: '', isCorrect: false },
          { id: 4, text: '', isCorrect: false }
        ],
        points: 1
      }
    ]
  });

  // Fetch courses - replace with actual API call
  const [courses, setCourses] = useState([
    { id: 1, title: 'Web Development Basics' },
    { id: 2, title: 'Advanced React' },
    { id: 3, title: 'Database Design' }
  ]);

  // Handle basic quiz info changes
  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  // Handle question text change
  const handleQuestionTextChange = (questionId, text) => {
    const updatedQuestions = quiz.questions.map(q => 
      q.id === questionId ? { ...q, text } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Handle option text change
  const handleOptionTextChange = (questionId, optionId, text) => {
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(o => 
          o.id === optionId ? { ...o, text } : o
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Handle correct option selection
  const handleCorrectOptionChange = (questionId, optionId) => {
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(o => 
          ({ ...o, isCorrect: o.id === optionId })
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Add a new question
  const addQuestion = () => {
    const newQuestionId = Math.max(...quiz.questions.map(q => q.id)) + 1;
    const newQuestion = {
      id: newQuestionId,
      text: '',
      type: 'multiple-choice',
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
      ],
      points: 1
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  // Remove a question
  const removeQuestion = (questionId) => {
    if (quiz.questions.length === 1) return; // Don't remove the last question
    const updatedQuestions = quiz.questions.filter(q => q.id !== questionId);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Change question points
  const handlePointsChange = (questionId, points) => {
    const updatedQuestions = quiz.questions.map(q => 
      q.id === questionId ? { ...q, points: parseInt(points, 10) || 1 } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Add an option to a question
  const addOption = (questionId) => {
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        const newOptionId = Math.max(...q.options.map(o => o.id)) + 1;
        const newOption = { id: newOptionId, text: '', isCorrect: false };
        return { ...q, options: [...q.options, newOption] };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Remove an option from a question
  const removeOption = (questionId, optionId) => {
    const updatedQuestions = quiz.questions.map(q => {
      if (q.id === questionId) {
        if (q.options.length <= 2) return q; // Minimum 2 options required
        const updatedOptions = q.options.filter(o => o.id !== optionId);
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // Save the quiz
  const handleSave = (isDraft = true) => {
    // Validate basic info
    if (!quiz.title.trim()) {
      alert('Please provide a quiz title');
      return;
    }
    
    if (!quiz.course) {
      alert('Please select a course');
      return;
    }
    
    // Validate all questions have text and at least one correct answer
    const invalidQuestions = quiz.questions.filter(q => 
      !q.text.trim() || !q.options.some(o => o.isCorrect)
    );
    
    if (invalidQuestions.length > 0) {
      alert('All questions must have text and at least one correct answer');
      return;
    }
    
    // Validate all options have text
    const invalidOptions = quiz.questions.some(q => 
      q.options.some(o => !o.text.trim())
    );
    
    if (invalidOptions) {
      alert('All options must have text');
      return;
    }
    
    console.log('Saving quiz:', { ...quiz, status: isDraft ? 'Draft' : 'Published' });
    // Here you would send the data to your backend API
    // axios.post('/api/quizzes', { ...quiz, status: isDraft ? 'Draft' : 'Published' })
    
    alert(`Quiz ${isDraft ? 'saved as draft' : 'published'} successfully!`);
    navigate('/instructor/quizzes');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/instructor/quizzes')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          <span>Back to Quizzes</span>
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => handleSave(true)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Save size={18} />
            <span>Save Draft</span>
          </button>
          <button 
            onClick={() => handleSave(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Save size={18} />
            <span>Publish Quiz</span>
          </button>
        </div>
      </div>

      {/* Quiz Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Quiz Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={quiz.title}
              onChange={handleQuizChange}
              placeholder="Enter quiz title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              name="course"
              value={quiz.course}
              onChange={handleQuizChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={quiz.duration}
              onChange={handleQuizChange}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Score (%)
            </label>
            <input
              type="number"
              name="passingScore"
              value={quiz.passingScore}
              onChange={handleQuizChange}
              min="0"
              max="100"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            placeholder="Enter quiz description"
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Quiz Questions</h2>
          <div className="flex items-center text-sm text-gray-500">
            <HelpCircle size={16} className="mr-1" />
            <span>Each question must have at least one correct answer</span>
          </div>
        </div>

        {quiz.questions.map((question, questionIndex) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
              <button 
                onClick={() => removeQuestion(question.id)}
                className="text-red-500 hover:text-red-700"
                title="Remove question"
              >
                <Trash size={18} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text <span className="text-red-500">*</span>
              </label>
              <textarea
                value={question.text}
                onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                placeholder="Enter your question"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Answer Options <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <label className="text-sm text-gray-600 mr-2">Points:</label>
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) => handlePointsChange(question.id, e.target.value)}
                    min="1"
                    className="w-16 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${question.id}`}
                      checked={option.isCorrect}
                      onChange={() => handleCorrectOptionChange(question.id, option.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionTextChange(question.id, option.id, e.target.value)}
                      placeholder="Enter option text"
                      className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button 
                      onClick={() => removeOption(question.id, option.id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Remove option"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                type="button"
                onClick={() => addOption(question.id)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                <Plus size={16} className="mr-1" />
                <span>Add another option</span>
              </button>
            </div>
          </div>
        ))}

        <button 
          type="button"
          onClick={addQuestion}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          <span>Add New Question</span>
        </button>
      </div>
    </div>
  );
} 