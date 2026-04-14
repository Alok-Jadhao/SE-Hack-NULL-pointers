import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Play,
  Lock,
  CheckCircle2,
  Clock,
  FileText,
  Video,
  Download,
  ChevronDown,
  ChevronUp,
  Star,
  Users
} from 'lucide-react';
import { apiFetch } from '../lib/api';
import { toast } from 'sonner';



export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await apiFetch(`/courses/${courseId}`);
        if (res.success && res.data) {
          const c = res.data;
          setCourse({
            id: c._id,
            title: c.title,
            instructor: c.instructor?.name || 'Instructor',
            description: c.description || '',
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
            rating: 4.8,
            students: c.enrolledStudents?.length || 0,
            progress: 65,
            totalLessons: c.modules?.reduce((a, m) => a + (m.lessons?.length || 0), 0) || 0,
            completedLessons: 16,
          });
          if (c.modules?.length > 0) {
            setModules(c.modules.map((m, mi) => ({
              id: m._id || String(mi),
              title: m.title,
              isExpanded: mi === 0,
              lessons: (m.lessons || []).map((l, li) => ({
                id: l._id || `${mi}-${li}`,
                title: l.title,
                type: l.contentType === 'video' ? 'video' : l.contentType === 'quiz' ? 'quiz' : 'reading',
                duration: l.duration ? `${l.duration} min` : '10 min',
                completed: false,
                locked: mi > 0 && li > 1,
              })),
            })));
            return;
          }
        }
      } catch { /* fall through to mock */ }
      setMockData();
    }

    function setMockData() {
      setCourse({
        id: courseId,
        title: 'Advanced Web Development',
        instructor: 'Dr. Sarah Johnson',
        description: 'Master modern web development with React, Node.js, and industry best practices. This comprehensive course covers everything from fundamentals to advanced patterns.',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
        rating: 4.8,
        students: 124,
        progress: 65,
        totalLessons: 24,
        completedLessons: 16,
      });
      setModules([
        { id: '1', title: 'Module 1: Getting Started', isExpanded: true, lessons: [
          { id: '1-1', title: 'Course Introduction', type: 'video', duration: '10 min', completed: true, locked: false },
          { id: '1-2', title: 'Setting Up Your Environment', type: 'video', duration: '15 min', completed: true, locked: false },
          { id: '1-3', title: 'First Project', type: 'reading', duration: '20 min', completed: true, locked: false },
          { id: '1-4', title: 'Module Quiz', type: 'quiz', duration: '10 min', completed: true, locked: false },
        ]},
        { id: '2', title: 'Module 2: React Fundamentals', isExpanded: true, lessons: [
          { id: '2-1', title: 'React Components', type: 'video', duration: '25 min', completed: true, locked: false },
          { id: '2-2', title: 'State and Props', type: 'video', duration: '30 min', completed: true, locked: false },
          { id: '2-3', title: 'React Hooks Deep Dive', type: 'video', duration: '35 min', completed: false, locked: false },
          { id: '2-4', title: 'Practice Exercises', type: 'reading', duration: '40 min', completed: false, locked: false },
        ]},
        { id: '3', title: 'Module 3: Advanced Patterns', isExpanded: false, lessons: [
          { id: '3-1', title: 'Context API', type: 'video', duration: '20 min', completed: false, locked: false },
          { id: '3-2', title: 'Custom Hooks', type: 'video', duration: '25 min', completed: false, locked: true },
          { id: '3-3', title: 'Performance Optimization', type: 'video', duration: '30 min', completed: false, locked: true },
        ]},
      ]);
    }

    fetchCourse();
  }, [courseId]);

  const toggleModule = (moduleId) => {
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, isExpanded: !m.isExpanded } : m
    ));
  };

  const markAsComplete = () => {
    if (!selectedLesson) return;
    setModules(modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l =>
        l.id === selectedLesson.id ? { ...l, completed: true } : l
      ),
    })));
    setSelectedLesson({ ...selectedLesson, completed: true });
    toast.success(`"${selectedLesson.title}" marked as complete!`);
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
          <div className="text-white space-y-6">
            <button
              onClick={() => navigate('/courses')}
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              ← Back to Courses
            </button>
            
            <div>
              <h1 className="text-white mb-4">{course.title}</h1>
              <p className="text-white/90 text-lg mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.totalLessons} lessons</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-white/90 text-sm">
                <span>Course Progress</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-white/80 text-sm">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Curriculum */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-8">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold">Course Content</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {modules.length} modules • {course.totalLessons} lessons
              </p>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {modules.map((module) => (
                <div key={module.id} className="border-b border-border last:border-0">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <span className="font-medium text-sm">{module.title}</span>
                    {module.isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {module.isExpanded && (
                    <div className="pb-2">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.locked && setSelectedLesson(lesson)}
                          disabled={lesson.locked}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedLesson?.id === lesson.id ? 'bg-accent' : ''
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {lesson.locked ? (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            ) : lesson.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : lesson.type === 'video' ? (
                              <Play className="w-4 h-4 text-primary" />
                            ) : lesson.type === 'reading' ? (
                              <FileText className="w-4 h-4 text-primary" />
                            ) : (
                              <div className="w-4 h-4 bg-primary rounded" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="lg:col-span-2">
          {selectedLesson ? (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {selectedLesson.type === 'video' ? (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <Play className="w-10 h-10 text-primary-foreground ml-1" />
                    </div>
                    <p className="text-muted-foreground">Video player will be displayed here</p>
                  </div>
                ) : selectedLesson.type === 'reading' ? (
                  <div className="text-center space-y-4">
                    <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Reading material viewer</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Quiz interface</p>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h2>{selectedLesson.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedLesson.duration}
                    </span>
                    {selectedLesson.completed && (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    This is where the lesson content would appear. For video lessons, you'd see a video player.
                    For reading materials, the content would be displayed here with proper formatting.
                    For quizzes, interactive questions would be shown.
                  </p>
                </div>

                <div className="flex gap-3">
                  {!selectedLesson.completed && (
                    <button
                      onClick={markAsComplete}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Mark
                    </button>
                  )}
                  <button
                    onClick={() => toast.success(`Downloading: ${selectedLesson.title}`)}
                    className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <Video className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="font-semibold mb-2">Select a Lesson</h3>
              <p className="text-muted-foreground">
                Choose a lesson from the curriculum to start learning
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
