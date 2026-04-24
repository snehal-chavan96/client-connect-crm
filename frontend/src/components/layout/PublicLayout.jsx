import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans selection:bg-primary-100 dark:selection:bg-primary-900/50 selection:text-primary-900 dark:selection:text-primary-100 transition-colors">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">&copy; {new Date().getFullYear()} Client Connect CRM System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
