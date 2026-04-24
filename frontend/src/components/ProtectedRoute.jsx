import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch - redirect to home or appropriate dashboard
  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'agent') {
      return <Navigate to="/agent/dashboard" replace />;
    } else {
      return <Navigate to="/client/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
