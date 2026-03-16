import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, BookOpen, Users, Clock, Star } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  students: number;
  rating: number;
  duration: string;
  thumbnail: string;
  category: string;
  level: string;
  enrolled: boolean;
}

const thumbnails = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
];

export function CoursesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await apiFetch('/courses');
        if (res.success && res.data.length > 0) {
          setCourses(res.data.map((c: any, i: number) => ({
            id: c._id,
            title: c.title,
            instructor: c.instructor?.name || 'Unknown',
            description: c.description || '',
            students: c.enrolledStudents?.length || 0,
            rating: 4.5 + Math.random() * 0.5,
            duration: `${c.modules?.length || 0} modules`,
            thumbnail: thumbnails[i % thumbnails.length],
            category: c.category || 'General',
            level: c.level || 'Beginner',
            enrolled: c.enrolledStudents?.some((s: any) => s.toString() === user?.id) || false,
          })));
        } else {
          setCourses(getMockCourses());
        }
      } catch {
        setCourses(getMockCourses());
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [user]);

  const categories = ['all', 'Programming', 'Computer Science', 'AI & ML', 'Design', 'Database', 'Mobile Development'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Browse Courses</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive course catalog and start learning today
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-3">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
          </select>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            {levels.map(level => <option key={level} value={level}>{level === 'all' ? 'All Levels' : level}</option>)}
          </select>
        </div>
      </div>

      <p className="text-muted-foreground">
        Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate(`/courses/${course.id}`)}>
            <div className="relative h-48 bg-muted overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {course.enrolled && <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full">Enrolled</div>}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur text-white text-xs rounded-full">{course.level}</div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1"><Users className="w-4 h-4 text-muted-foreground" /><span>{course.students}</span></div>
                <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span>{course.rating.toFixed(1)}</span></div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-muted-foreground" /><span>{course.duration}</span></div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${course.enrolled ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'}`}
              >
                {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
          <h3 className="font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

function getMockCourses(): Course[] {
  return [
    { id: '1', title: 'Advanced Web Development', instructor: 'Dr. Sarah Johnson', description: 'Master modern web development with React, Node.js, and best practices', students: 124, rating: 4.8, duration: '12 weeks', thumbnail: thumbnails[0], category: 'Programming', level: 'Advanced', enrolled: true },
    { id: '2', title: 'Data Structures & Algorithms', instructor: 'Prof. Michael Chen', description: 'Build a strong foundation in computer science fundamentals', students: 189, rating: 4.9, duration: '10 weeks', thumbnail: thumbnails[1], category: 'Computer Science', level: 'Intermediate', enrolled: true },
    { id: '3', title: 'Machine Learning Fundamentals', instructor: 'Dr. Emily Rodriguez', description: 'Introduction to ML concepts, algorithms, and practical applications', students: 156, rating: 4.7, duration: '8 weeks', thumbnail: thumbnails[2], category: 'AI & ML', level: 'Beginner', enrolled: true },
    { id: '4', title: 'UI/UX Design Principles', instructor: 'Prof. Alex Turner', description: 'Learn to create beautiful and user-friendly interfaces', students: 98, rating: 4.6, duration: '6 weeks', thumbnail: thumbnails[3], category: 'Design', level: 'Beginner', enrolled: false },
    { id: '5', title: 'Database Systems', instructor: 'Dr. James Wilson', description: 'Comprehensive guide to SQL, NoSQL, and database optimization', students: 142, rating: 4.8, duration: '10 weeks', thumbnail: thumbnails[4], category: 'Database', level: 'Intermediate', enrolled: false },
    { id: '6', title: 'Mobile App Development', instructor: 'Prof. Lisa Anderson', description: 'Build native and cross-platform mobile applications', students: 167, rating: 4.7, duration: '14 weeks', thumbnail: thumbnails[5], category: 'Mobile Development', level: 'Advanced', enrolled: false },
  ];
}
