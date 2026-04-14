import { useState, useEffect } from 'react';
import { Search, Filter, FileText, Video, Download, Eye, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';


export function ContentHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [content, setContent] = useState([]);

  useEffect(() => {
    // Fetch content from your backend
    setContent([
      {
        id: '1',
        title: 'React Hooks Complete Guide',
        type: 'pdf',
        course: 'Advanced Web Development',
        uploadedBy: 'Dr. Sarah Johnson',
        uploadDate: 'Mar 10, 2026',
        views: 245,
        tags: ['React', 'JavaScript', 'Frontend'],
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      },
      {
        id: '2',
        title: 'Algorithm Complexity Analysis',
        type: 'slides',
        course: 'Data Structures & Algorithms',
        uploadedBy: 'Prof. Michael Chen',
        uploadDate: 'Mar 12, 2026',
        views: 189,
        tags: ['Algorithms', 'Computer Science', 'Theory'],
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
      },
      {
        id: '3',
        title: 'Neural Networks Fundamentals',
        type: 'video',
        course: 'Machine Learning Fundamentals',
        uploadedBy: 'Dr. Emily Rodriguez',
        uploadDate: 'Mar 14, 2026',
        views: 312,
        tags: ['ML', 'AI', 'Deep Learning'],
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      },
      {
        id: '4',
        title: 'Design Systems Best Practices',
        type: 'document',
        course: 'UI/UX Design Principles',
        uploadedBy: 'Prof. Alex Turner',
        uploadDate: 'Mar 15, 2026',
        views: 156,
        tags: ['Design', 'UI/UX', 'Frontend'],
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      },
      {
        id: '5',
        title: 'SQL Query Optimization',
        type: 'pdf',
        course: 'Database Systems',
        uploadedBy: 'Dr. James Wilson',
        uploadDate: 'Mar 13, 2026',
        views: 198,
        tags: ['Database', 'SQL', 'Performance'],
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
      },
      {
        id: '6',
        title: 'React Native Tutorial Series',
        type: 'video',
        course: 'Mobile App Development',
        uploadedBy: 'Prof. Lisa Anderson',
        uploadDate: 'Mar 11, 2026',
        views: 267,
        tags: ['Mobile', 'React Native', 'JavaScript'],
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      },
    ]);
  }, []);

  const types = ['all', 'video', 'pdf', 'slides', 'document'];
  const allTags = Array.from(new Set(content.flatMap(item => item.tags)));
  const tags = ['all', ...allTags];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesTag;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'pdf':
      case 'document':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'pdf':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'slides':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Content Hub</h1>
        <p className="text-muted-foreground">
          Access all course materials, community uploads, and learning resources in one place
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Tags' : tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredContent.length} resource{filteredContent.length !== 1 ? 's' : ''}
        </p>
        <button onClick={() => toast.info('Advanced filters coming soon')} className="text-sm text-primary hover:underline flex items-center gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="relative h-48 bg-muted overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  {item.type.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.course}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{item.uploadedBy}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => toast.info(`Opening: ${item.title}`)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => toast.success(`Downloading: ${item.title}`)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-muted-foreground opacity-50 mb-4" />
          <h3 className="font-semibold mb-2">No content found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
