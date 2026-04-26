import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  Trophy, 
  BarChart3, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function RootLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated (except on login page)
    if (!user && location.pathname !== '/') {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  // Don't show layout on login page
  if (location.pathname === '/') {
    return <Outlet />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = user?.role === 'student' 
    ? [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
        { icon: BookOpen, label: 'Courses', path: '/courses' },
        { icon: Library, label: 'Content Hub', path: '/content-hub' },
        { icon: Zap, label: 'Quiz Battles', path: '/quiz-battle' },
        { icon: BarChart3, label: 'Performance', path: '/performance' },
      ]
    : user?.role === 'instructor'
    ? [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/instructor' },
        { icon: BookOpen, label: 'My Courses', path: '/courses' },
        { icon: Library, label: 'Content Hub', path: '/content-hub' },
        { icon: Trophy, label: 'Quiz Management', path: '/quiz-battle' },
        { icon: BarChart3, label: 'Analytics', path: '/performance' },
      ]
    : [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: BookOpen, label: 'All Courses', path: '/courses' },
        { icon: Library, label: 'Content Hub', path: '/content-hub' },
        { icon: BarChart3, label: 'Reports', path: '/performance' },
        { icon: Settings, label: 'Settings', path: '/settings' },
      ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h2 className="font-semibold">Campus LMS</h2>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-border">
          <h1 className="font-semibold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            Campus LMS
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {user?.name} • <span className="capitalize">{user?.role}</span>
          </p>
        </div>

        <nav className="p-4 flex-1">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden lg:flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>Toggle Theme</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-destructive"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
