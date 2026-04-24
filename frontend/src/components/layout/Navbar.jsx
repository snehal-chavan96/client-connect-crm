import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Hexagon, LogOut, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Helper function for active navigation links
  const getNavLinkClass = ({ isActive }) =>
    `relative font-medium text-sm transition-all duration-300 py-2 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 inset-x-0 bg-white/70 dark:bg-[#0a0f1c]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO: Devolatical Info-Tech */}
        <Link to="/" className="flex items-center gap-3 group z-50">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
            <Hexagon className="w-7 h-7 text-white absolute opacity-20" />
            <span className="text-white font-bold text-xl relative z-10">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 tracking-tight leading-none group-hover:opacity-80 transition-opacity">
              Devolatical
            </span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase mt-1">
              Info-Tech
            </span>
          </div>
        </Link>
        
        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex flex-1 justify-center space-x-10">
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
          <NavLink to="/services" className={getNavLinkClass}>Services</NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
        </div>
        
        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-5">
          <button 
            onClick={toggleTheme} 
            className="p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated && user ? (
            <>
              {/* Dashboard Link based on Role */}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Admin Dashboard
                </Link>
              )}
              {user.role === 'agent' && (
                <Link to="/agent/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Agent Dashboard
                </Link>
              )}
              {user.role === 'client' && (
                <Link to="/client/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  My Dashboard
                </Link>
              )}

              {/* User Profile / Logout Dropdown */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Client Login
              </Link>
              
              <Link to="/contact">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] transform hover:-translate-y-0.5 transition-all">
                  Request Access
                </button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center gap-4 z-50">
          <button 
            onClick={toggleTheme} 
            className="p-2 text-gray-500 dark:text-gray-400"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-900 dark:text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION MENU */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          <NavLink to="/" onClick={toggleMobileMenu} className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/about" onClick={toggleMobileMenu} className={getNavLinkClass}>About</NavLink>
          <NavLink to="/services" onClick={toggleMobileMenu} className={getNavLinkClass}>Services</NavLink>
          <NavLink to="/contact" onClick={toggleMobileMenu} className={getNavLinkClass}>Contact</NavLink>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-4">
            {isAuthenticated && user ? (
              <>
                {/* Dashboard Link based on Role */}
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 font-medium py-2">
                    Admin Dashboard
                  </Link>
                )}
                {user.role === 'agent' && (
                  <Link to="/agent/dashboard" onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 font-medium py-2">
                    Agent Dashboard
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client/dashboard" onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 font-medium py-2">
                    My Dashboard
                  </Link>
                )}

                {/* User Info */}
                <div className="text-gray-700 dark:text-gray-300 font-medium py-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 font-medium text-center py-2">
                  Client Login
                </Link>
                <Link to="/register" onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 font-medium text-center py-2">
                  Sign Up
                </Link>
                <Link to="/contact" onClick={toggleMobileMenu}>
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30">
                    Request Access
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;