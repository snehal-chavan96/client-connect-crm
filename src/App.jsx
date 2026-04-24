import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

import PublicLayout from './components/layout/PublicLayout';
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';

import LandingPage from './pages/LandingPage';
import InquiryFormPage from './pages/InquiryFormPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SupportTicketsPage from './pages/SupportTicketsPage';
import ProjectTrackingPage from './pages/ProjectTrackingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import UserManagementPage from './pages/UserManagementPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<InquiryFormPage />} />
            <Route path="services" element={<ServicesPage />} />
          </Route>
          
          {/* Auth Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Client Portal Routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<ProjectTrackingPage />} />
            <Route path="tickets" element={<SupportTicketsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="tickets" element={<SupportTicketsPage />} />
            <Route path="projects" element={<ProjectTrackingPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
