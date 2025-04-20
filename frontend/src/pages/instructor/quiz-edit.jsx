import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Plus, Save, ChevronLeft, HelpCircle, Trash, Loader2 } from 'lucide-react';
import axios from 'axios'; // Assuming you use axios

// --- Mock Fetch Function (Replace with actual API call) ---
// Simulates fetching a single quiz by ID
const fetchQuizById = async (id) => {
  console.log(`Simulating fetch for quiz ID: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  // Return dummy data matching the ID or a default structure
  const dummyData = {
    id: parseInt(id, 10),
    title: `Fetched Quiz ${id}`,
    description: 'This is the description for the fetched quiz.',
    course: '2', // Example course ID
    duration: 45,
    passingScore: 60,
    questions: [
      {
        id: 1,
        text: 'What is the capital of France?',
        type: 'multiple-choice',
        options: [
          { id: 1, text: 'Berlin', isCorrect: false },
          { id: 2, text: 'Paris', isCorrect: true },
          { id: 3, text: 'Madrid', isCorrect: false },
          { id: 4, text: 'Rome', isCorrect: false }
        ],
        points: 1
      },
      // Add more fetched questions if needed
    ]
  };
  return dummyData; // Or throw an error if not found
};
// --- End Mock Fetch Function ---


export default function QuizEdit() {
  const navigate = useNavigate();
  const { quizId } = useParams(); // Get quizId from URL

  const [quiz, setQuiz] = useState(null); // Initialize as null until data is fetched
  const [courses, setCourses] = useState([]); // State for courses dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch quiz data on component mount
  useEffect(() => {
    const loadQuizData = async () => {
      setLoading(true);
      setError('');
      try {
        // --- Replace with your actual API call ---
        // const response = await axios.get(`/api/quizzes/${quizId}`);
        // setQuiz(response.data);

        // Using mock fetch for now
        const fetchedQuiz = await fetchQuizById(quizId);
        setQuiz(fetchedQuiz);
        // --- End Replace ---

      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
        setError(`Failed to load quiz data. ${err.message || ''}`);
        // Optionally navigate back or show a prominent error
        // navigate('/instructor/quizzes');
      } finally {
        setLoading(false);
      }
    };

    // Fetch available courses for the dropdown
    const loadCourses = async () => {
       try {
         // --- Replace with your actual API call ---
         // const response = await axios.get('/api/courses?instructor=true'); // Example endpoint
         // setCourses(response.data);

         // Using dummy data for now
         setCourses([
           { id: 1, title: 'Web Development Basics' },
           { id: 2, title: 'Advanced React' },
           { id: 3, title: 'Database Design' }
         ]);
         // --- End Replace ---
       } catch (err) {
         console.error("Failed to fetch courses:", err);
         // Handle course loading error if needed
       }
    };


    if (quizId) {
      loadQuizData();
      loadCourses();
    } else {
      setError('Quiz ID not found in URL.');
      setLoading(false);
    }

  }, [quizId]); // Re-run effect if quizId changes

  // --- Handlers (Largely reused from QuizCreate) ---

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
    // Ensure IDs are unique, potentially use UUIDs in a real app
    const newQuestionId = quiz.questions.length > 0 ? Math.max(...quiz.questions.map(q => q.id)) + 1 : 1;
    const newQuestion = {
      id: newQuestionId,
      text: '',
      type: 'multiple-choice',
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
      ],
      points: 1
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  // Remove a question
  const removeQuestion = (questionId) => {
    if (quiz.questions.length === 1) {
      alert("A quiz must have at least one question.");
      return;
    }
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
        const newOptionId = q.options.length > 0 ? Math.max(...q.options.map(o => o.id)) + 1 : 1;
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
        if (q.options.length <= 2) {
           alert("A question must have at least two options.");
           return q;
        }
        const updatedOptions = q.options.filter(o => o.id !== optionId);
        // If the removed option was the correct one, reset correctness
        if (!updatedOptions.some(o => o.isCorrect)) {
            if (updatedOptions.length > 0) {
              updatedOptions[0].isCorrect = true; // Default to first if correct one removed
            }
        }
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // --- End Reused Handlers ---


  // Update the quiz
  const handleUpdate = async (publish = false) => {
    // --- Add validation similar to QuizCreate ---
    if (!quiz.title.trim() || !quiz.course /* ... other validations */) {
      alert('Please ensure all required fields are filled correctly.');
      return;
    }

    setLoading(true); // Indicate saving process
    setError('');
    try {
      const quizDataToSave = { ...quiz, status: publish ? 'Published' : 'Draft' };
      console.log('Updating quiz:', quizId, quizDataToSave);

      // --- Replace with your actual API call to update ---
      // await axios.put(`/api/quizzes/${quizId}`, quizDataToSave);
      await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay
      // --- End Replace ---

      alert(`Quiz ${publish ? 'published' : 'updated'} successfully!`);
      navigate('/instructor/quizzes'); // Go back to the list

    } catch (err) {
      console.error("Failed to update quiz:", err);
      setError(`Failed to update quiz. ${err.message || ''}`);
      setLoading(false); // Stop loading indicator on error
    }
    // setLoading(false); // Already handled in finally or error blocks
  };

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Loading Quiz...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-red-600 bg-red-50 border border-red-200 rounded-md">
        <p>Error: {error}</p>
        <button
          onClick={() => navigate('/instructor/quizzes')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  if (!quiz) {
    // This state might occur briefly or if fetch fails without setting error properly
    return <div className="p-6 text-center">Quiz data not available.</div>;
  }

  // --- Form JSX (Largely copied from QuizCreate, but uses state from QuizEdit) ---
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
           {/* Maybe add a 'Save as Draft' if applicable */}
          <button
            onClick={() => handleUpdate(quiz.status !== 'Published')} // Update status based on current
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
            disabled={loading} // Disable button while saving
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save size={18} />}
            <span>{loading ? 'Saving...' : (quiz.status !== 'Published' ? 'Update & Publish' : 'Save Changes')}</span>
          </button>
        </div>
      </div>

      {/* Quiz Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
         <h2 className="text-xl font-bold mb-4">Edit Quiz Information</h2>
         {/* Form fields for title, course, duration, passingScore, description */}
         {/* Use value={quiz.title}, value={quiz.course} etc. and onChange={handleQuizChange} */}
         {/* Example: */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title <span className="text-red-500">*</span></label>
             <input type="text" name="title" value={quiz.title} onChange={handleQuizChange} /* ... */ className="w-full p-2 border ..." required />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Course <span className="text-red-500">*</span></label>
             <select name="course" value={quiz.course} onChange={handleQuizChange} className="w-full p-2 border ..." required >
               <option value="">Select a course</option>
               {courses.map(course => (
                 <option key={course.id} value={course.id}>{course.title}</option>
               ))}
             </select>
           </div>
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input type="number" name="duration" value={quiz.duration} onChange={handleQuizChange} min="1" className="w-full p-2 border ..." />
            </div>
            {/* Passing Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
              <input type="number" name="passingScore" value={quiz.passingScore} onChange={handleQuizChange} min="0" max="100" className="w-full p-2 border ..." />
            </div>
         </div>
         {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={quiz.description} onChange={handleQuizChange} rows="3" className="w-full p-2 border ..."></textarea>
          </div>
      </div>


      {/* Questions Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Quiz Questions</h2>
           {/* Maybe add info text like in create */}
        </div>

        {quiz.questions.map((question, questionIndex) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
             {/* Question Header (Question #, Remove Button) */}
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
               <button onClick={() => removeQuestion(question.id)} className="text-red-500 hover:text-red-700" title="Remove question"><Trash size={18} /></button>
             </div>

             {/* Question Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Text <span className="text-red-500">*</span></label>
                <textarea value={question.text} onChange={(e) => handleQuestionTextChange(question.id, e.target.value)} rows="2" className="w-full p-2 border ..." required></textarea>
              </div>

              {/* Options */}
               <div className="mb-4">
                 <div className="flex justify-between items-center mb-1">
                   <label className="block text-sm font-medium text-gray-700">Answer Options <span className="text-red-500">*</span></label>
                   <div className="flex items-center">
                     <label className="text-sm text-gray-600 mr-2">Points:</label>
                     <input type="number" value={question.points} onChange={(e) => handlePointsChange(question.id, e.target.value)} min="1" className="w-16 p-1 border ..." />
                   </div>
                 </div>

                 {/* Options Loop */}
                 <div className="space-y-2">
                   {question.options.map((option) => (
                     <div key={option.id} className="flex items-center gap-2">
                       <input type="radio" name={`correct-${question.id}`} checked={option.isCorrect} onChange={() => handleCorrectOptionChange(question.id, option.id)} className="h-4 w-4 ..." required />
                       <input type="text" value={option.text} onChange={(e) => handleOptionTextChange(question.id, option.id, e.target.value)} className="flex-grow p-2 border ..." required />
                       <button onClick={() => removeOption(question.id, option.id)} className="text-gray-400 hover:text-red-500" title="Remove option"><X size={18} /></button>
                     </div>
                   ))}
                 </div>

                 {/* Add Option Button */}
                 <button type="button" onClick={() => addOption(question.id)} className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center">
                   <Plus size={16} className="mr-1" />Add another option
                 </button>
               </div>
          </div>
        ))}

         {/* Add New Question Button */}
         <button type="button" onClick={addQuestion} className="w-full py-3 border-2 border-dashed ...">
           <Plus size={20} className="mr-2" />Add New Question
         </button>
      </div>

    </div>
  );
} 