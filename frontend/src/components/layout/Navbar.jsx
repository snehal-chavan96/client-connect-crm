import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-white font-bold text-2xl leading-none">C</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Connect
          </span>
        </Link>
        
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          <NavLink to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Home</NavLink>
          <a href="#services" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Services</a>
          <NavLink to="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Contact</NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-gray-600 font-medium hover:text-primary-600 transition-colors">
            Login
          </Link>
          <Link to="/contact">
            <Button variant="primary" className="!rounded-full px-6 shadow-[0_8px_16px_-6px_rgba(37,99,235,0.4)]">
              Request Access
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
