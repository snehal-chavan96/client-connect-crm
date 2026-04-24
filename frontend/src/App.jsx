import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { LeadsProvider } from './contexts/LeadsContext';
import { CRMProvider } from './contexts/CRMContext';

import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import InquiryFormPage from './pages/public/InquiryFormPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProjects from './pages/client/ClientProjects';
import ClientTickets from './pages/client/ClientTickets';
import ClientReports from './pages/client/ClientReports';
import ClientProfile from './pages/client/ClientProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTickets from './pages/admin/AdminTickets';
import AdminProjects from './pages/admin/AdminProjects';
import AdminUpload from './pages/admin/AdminUpload';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LeadsProvider>
          <CRMProvider>
            <BrowserRouter>
              <Routes>
                {/* ================================ */}
                {/* PUBLIC ROUTES - WEBSITE */}
                {/* ================================ */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="contact" element={<InquiryFormPage />} />

                {/* Authentication */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* ================================ */}
                {/* CLIENT PORTAL - Authenticated */}
                {/* ================================ */}
                <Route
                  path="/client"
                  element={
                    <ProtectedRoute requiredRole="client">
                      <ClientLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<ClientDashboard />} />
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path="projects" element={<ClientProjects />} />
                  <Route path="tickets" element={<ClientTickets />} />
                  <Route path="reports" element={<ClientReports />} />
                  <Route path="profile" element={<ClientProfile />} />
                </Route>

                {/* ================================ */}
                {/* ADMIN PORTAL - Authenticated + Admin Only */}
                {/* ================================ */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="leads" element={<AdminLeads />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="tickets" element={<AdminTickets />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="upload" element={<AdminUpload />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CRMProvider>
        </LeadsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
