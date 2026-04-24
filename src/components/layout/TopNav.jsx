import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, CheckCircle, AlertCircle, Info, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const TopNav = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    { id: 1, type: 'alert', title: 'Server usage high', time: '10 min ago', icon: <AlertCircle className="w-4 h-4 text-red-500" /> },
    { id: 2, type: 'success', title: 'Project V2 Deployed', time: '1 hour ago', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    { id: 3, type: 'info', title: 'New comment on Ticket #1042', time: '3 hours ago', icon: <Info className="w-4 h-4 text-blue-500" /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors">
      <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 w-96 border border-gray-100 dark:border-gray-700 focus-within:bg-white dark:focus-within:bg-gray-900 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30 transition-all">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none focus:outline-none w-full text-sm placeholder-gray-400 text-gray-700 dark:text-gray-200" 
        />
      </div>
      
      <div className="flex items-center gap-6">
        <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in origin-top-right">
              <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                <span className="text-xs text-primary-600 dark:text-primary-400 font-medium cursor-pointer hover:text-primary-700">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className="px-4 py-3 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer flex gap-3 items-start">
                    <div className="mt-0.5 bg-white dark:bg-gray-700 rounded-full shadow-sm p-1">
                      {notif.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{notif.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-700 text-center bg-gray-50/50 dark:bg-gray-900/50">
                <button className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">View All Notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-gray-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Jane Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
