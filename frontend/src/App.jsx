import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout';
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import InquiryFormPage from './pages/InquiryFormPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeadsPage from './pages/admin/AdminLeadsPage';
import AdminTicketsPage from './pages/admin/AdminTicketsPage';
import UploadPage from './pages/admin/UploadPage';
import ReportsPage from './pages/client/ReportsPage';
import SupportTicketsPage from './pages/SupportTicketsPage';
import ProjectTrackingPage from './pages/ProjectTrackingPage';

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="contact" element={<InquiryFormPage />} />
        </Route>
        
        {/* Login Route */}
        <Route path="login" element={<LoginPage />} />

        {/* Client Portal Routes - Protected */}
        <Route element={<ProtectedRoute requiredRole="client" />} />
        <Route element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="projects" element={<ProjectTrackingPage />} />
          <Route path="tickets" element={<SupportTicketsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Admin Portal Routes - Protected */}
        <Route element={<ProtectedRoute requiredRole="admin" />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="projects" element={<ProjectTrackingPage />} />
          <Route path="tickets" element={<AdminTicketsPage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
