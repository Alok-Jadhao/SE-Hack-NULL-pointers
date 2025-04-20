import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';

export default function InstructorQuizzes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for quizzes - replace with actual API call
  const [quizzes, setQuizzes] = useState([
    { 
      id: 1, 
      title: 'JavaScript Fundamentals', 
      course: 'Web Development Basics',
      questions: 15,
      duration: 30,
      createdAt: '2023-05-15',
      status: 'Published'
    },
    { 
      id: 2, 
      title: 'CSS Layout Techniques', 
      course: 'Web Development Basics',
      questions: 10,
      duration: 20,
      createdAt: '2023-05-20',
      status: 'Draft'
    },
    { 
      id: 3, 
      title: 'React Hooks', 
      course: 'Advanced React',
      questions: 12,
      duration: 25,
      createdAt: '2023-06-01',
      status: 'Published'
    }
  ]);

  // Navigate to create quiz page
  const handleCreateQuiz = () => {
    navigate('/instructor/quizzes/create');
  };

  // Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <button 
          onClick={handleCreateQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Make Quiz</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Quizzes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <span>Quiz Title</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <span>Course</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <span>Questions</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <span>Duration (min)</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <span>Created</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <span>Status</span>
                  <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{quiz.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {quiz.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {quiz.questions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {quiz.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {quiz.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quiz.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <Link 
                        to={`/instructor/quizzes/edit/${quiz.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                      <Link 
                        to={`/instructor/quizzes/preview/${quiz.id}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Preview
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  No quizzes found. Create your first quiz!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 