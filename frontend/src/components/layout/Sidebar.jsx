import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Ticket, Users, User, LogOut, FileText, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isAdmin }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const clientLinks = [
    { name: 'Dashboard', path: '/client', icon: LayoutDashboard },
    { name: 'Projects', path: '/client/projects', icon: FolderKanban },
    { name: 'Tickets', path: '/client/tickets', icon: Ticket },
    { name: 'Reports', path: '/client/reports', icon: FileText },
    { name: 'Profile', path: '/client/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', icon: FileText },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Tickets', path: '/admin/tickets', icon: Ticket },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Upload', path: '/admin/upload', icon: Upload },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col h-screen sticky top-0 transition-colors">
      <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-soft">
          <span className="text-white font-bold text-xl leading-none">C</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent transition-colors">
          Connect
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive && link.path !== '#'
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50 dark:border-gray-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
