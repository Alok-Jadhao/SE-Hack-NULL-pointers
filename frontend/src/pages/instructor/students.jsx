import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Mail, Download, UserPlus } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filter, setFilter] = useState('all');

  // Sample data for initial development
  const sampleStudents = [
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      email: 'rahul.s@example.com', 
      enrolledCourses: 3,
      progress: 65,
      lastActive: '2023-04-18T10:30:00',
      avatar: '/placeholder.svg'
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      email: 'priya.p@example.com', 
      enrolledCourses: 2,
      progress: 82,
      lastActive: '2023-04-19T14:45:00',
      avatar: '/placeholder.svg'
    },
    { 
      id: 3, 
      name: 'Arjun Singh', 
      email: 'arjun.s@example.com', 
      enrolledCourses: 5,
      progress: 42,
      lastActive: '2023-04-17T09:15:00',
      avatar: '/placeholder.svg'
    },
    { 
      id: 4, 
      name: 'Ananya Gupta', 
      email: 'ananya.g@example.com', 
      enrolledCourses: 1,
      progress: 95,
      lastActive: '2023-04-19T16:20:00',
      avatar: '/placeholder.svg'
    },
    { 
      id: 5, 
      name: 'Vikram Mehta', 
      email: 'vikram.m@example.com', 
      enrolledCourses: 4,
      progress: 28,
      lastActive: '2023-04-16T11:50:00',
      avatar: '/placeholder.svg'
    }
  ];

  useEffect(() => {
    // For development, we'll use sample data
    // In production, this would be an API call:
    // const fetchStudents = async () => {
    //   try {
    //     const response = await axios.get(API_ENDPOINTS.INSTRUCTOR_STUDENTS);
    //     setStudents(response.data);
    //   } catch (error) {
    //     console.error('Error fetching students:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchStudents();

    // Using sample data for now
    setTimeout(() => {
      setStudents(sampleStudents);
      setIsLoading(false);
    }, 800); // Simulate loading
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && (new Date(student.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    if (filter === 'inactive') return matchesSearch && (new Date(student.lastActive) <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => alert('Invite students functionality')}
        >
          <UserPlus size={20} />
          <span>Invite Students</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search students by name or email"
              className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button 
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => alert('Filter options')}
              >
                <Filter size={18} />
                <span>Filter</span>
              </button>
              <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-2 hidden">
                <div className="flex flex-col">
                  <button 
                    className={`text-left px-4 py-2 rounded-md ${filter === 'all' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'}`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All Students
                  </button>
                  <button 
                    className={`text-left px-4 py-2 rounded-md ${filter === 'active' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'}`}
                    onClick={() => handleFilterChange('active')}
                  >
                    Active (Last 7 days)
                  </button>
                  <button 
                    className={`text-left px-4 py-2 rounded-md ${filter === 'inactive' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'}`}
                    onClick={() => handleFilterChange('inactive')}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>
            <button 
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
              onClick={() => alert('Export to CSV')}
            >
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading students...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                          onChange={handleSelectAll}
                          checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Courses</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover border border-gray-200" 
                              src={student.avatar} 
                              alt={student.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.enrolledCourses}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">{student.progress}% Complete</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(student.lastActive)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => alert(`Email ${student.name}`)}
                          >
                            <Mail size={18} />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => alert(`More options for ${student.name}`)}
                          >
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No students found matching your search.</p>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500">
                Showing {filteredStudents.length} of {students.length} students
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 