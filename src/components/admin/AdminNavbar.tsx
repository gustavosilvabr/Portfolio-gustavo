
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileEdit, 
  FolderGit2, 
  Mail, 
  User, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navigationItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <User size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <FolderGit2 size={20} /> },
    { name: 'Content', path: '/admin/content', icon: <FileEdit size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <Mail size={20} /> },
  ];
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
        <div className="flex flex-col flex-1 h-full py-5 overflow-hidden">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
            <Link to="/admin" className="text-xl font-bold text-foreground">
              Admin Panel
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-between mt-5 px-2">
            <nav className="space-y-1 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="px-2 mt-6 mb-2">
              <div className="flex items-center px-2 py-3 text-sm">
                <div className="relative w-8 h-8 mr-3 rounded-full overflow-hidden">
                  <div className="bg-primary text-primary-foreground flex items-center justify-center w-full h-full rounded-full">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Administrator
                  </p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
              
              <div className="mt-4">
                <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Back to Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="md:hidden bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/admin" className="text-xl font-bold text-foreground">
            Admin Panel
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col h-full pt-16 px-4">
            <nav className="space-y-1 mt-5">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'flex items-center px-2 py-3 text-base font-medium rounded-md transition-colors',
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto mb-8">
              <div className="flex items-center px-2 py-3">
                <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden bg-primary text-primary-foreground flex items-center justify-center">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    Administrator
                  </p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
              
              <div className="mt-4">
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Back to Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
