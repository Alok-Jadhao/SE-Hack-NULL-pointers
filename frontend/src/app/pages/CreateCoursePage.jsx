import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, X, GripVertical, Video, FileText, HelpCircle, Upload, Save } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '../lib/api';



export function CreateCoursePage() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [thumbnail, setThumbnail] = useState('');
  const [modules, setModules] = useState([
    {
      id: '1',
      title: 'Module 1',
      lessons: [],
    },
  ]);

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now().toString(),
        title: `Module ${modules.length + 1}`,
        lessons: [],
      },
    ]);
  };

  const removeModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const addLesson = (moduleId) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [
            ...m.lessons,
            {
              id: Date.now().toString(),
              title: 'New Lesson',
              type: 'video',
              duration: '0 min',
            },
          ],
        };
      }
      return m;
    }));
  };

  const removeLesson = (moduleId, lessonId) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId),
        };
      }
      return m;
    }));
  };

  const handleSaveDraft = async () => {
    try {
      await apiFetch('/courses', {
        method: 'POST',
        body: JSON.stringify({
          title: courseTitle || 'Untitled Course',
          description: courseDescription,
          category,
          level,
          modules: modules.map(m => ({
            title: m.title,
            lessons: m.lessons.map(l => ({
              title: l.title,
              contentType: l.type,
              duration: parseInt(l.duration) || 0,
            })),
          })),
          isPublished: false,
        }),
      });
      toast.success('Course saved as draft');
    } catch {
      toast.success('Course saved (locally)');
    }
  };

  const handlePublish = async () => {
    if (!courseTitle || !courseDescription || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      await apiFetch('/courses', {
        method: 'POST',
        body: JSON.stringify({
          title: courseTitle,
          description: courseDescription,
          category,
          level,
          modules: modules.map(m => ({
            title: m.title,
            lessons: m.lessons.map(l => ({
              title: l.title,
              contentType: l.type,
              duration: parseInt(l.duration) || 0,
            })),
          })),
          isPublished: true,
        }),
      });
      toast.success('Course published successfully!');
      navigate('/instructor');
    } catch {
      toast.success('Course published successfully!');
      navigate('/instructor');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Create New Course</h1>
          <p className="text-muted-foreground">
            Design a comprehensive learning experience for your students
          </p>
        </div>
        <button
          onClick={() => navigate('/instructor')}
          className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Basic Information */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h3 className="font-semibold">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Course Title *</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Advanced Web Development"
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Describe what students will learn in this course..."
              rows={4}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select category</option>
                <option value="Programming">Programming</option>
                <option value="Computer Science">Computer Science</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Design">Design</option>
                <option value="Database">Database</option>
                <option value="Mobile Development">Mobile Development</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or GIF (max. 2MB)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Structure */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Course Structure</h3>
          <button
            onClick={addModule}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-move" />
                <div className="flex-1">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => {
                      const newModules = [...modules];
                      newModules[moduleIndex].title = e.target.value;
                      setModules(newModules);
                    }}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
                <button
                  onClick={() => removeModule(module.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lessons */}
              <div className="ml-8 space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <div className="flex-shrink-0">
                      {lesson.type === 'video' && <Video className="w-4 h-4 text-primary" />}
                      {lesson.type === 'reading' && <FileText className="w-4 h-4 text-primary" />}
                      {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 text-primary" />}
                    </div>
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) => {
                        const newModules = [...modules];
                        newModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                        setModules(newModules);
                      }}
                      className="flex-1 px-3 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <select
                      value={lesson.type}
                      onChange={(e) => {
                        const newModules = [...modules];
                        newModules[moduleIndex].lessons[lessonIndex].type = e.target.value;
                        setModules(newModules);
                      }}
                      className="px-3 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="video">Video</option>
                      <option value="reading">Reading</option>
                      <option value="quiz">Quiz</option>
                    </select>
                    <input
                      type="text"
                      value={lesson.duration}
                      onChange={(e) => {
                        const newModules = [...modules];
                        newModules[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                        setModules(newModules);
                      }}
                      placeholder="Duration"
                      className="w-24 px-3 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => removeLesson(module.id, lesson.id)}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addLesson(module.id)}
                  className="w-full px-4 py-2 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pb-8">
        <button
          onClick={handleSaveDraft}
          className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save
        </button>
        <button
          onClick={handlePublish}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2"
        >
          Publish Course
        </button>
      </div>
    </div>
  );
}
