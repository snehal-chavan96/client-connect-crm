import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 font-medium">&copy; {new Date().getFullYear()} Client Connect CRM System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
