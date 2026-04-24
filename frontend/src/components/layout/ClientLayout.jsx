import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const ClientLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50/50 dark:bg-gray-950/50 selection:bg-primary-100 dark:selection:bg-primary-900/50 selection:text-primary-900 dark:selection:text-primary-100 transition-colors">
      <Sidebar isAdmin={false} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
