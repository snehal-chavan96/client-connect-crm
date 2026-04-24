# 🚀 Client Connect CRM System

![React](https://img.shields.io/badge/React-19.2.5-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.2-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

A **production-ready CRM frontend** implementing strict **3-layer architecture** for complete separation between Public Website, Client Portal, and Admin Dashboard. Built with React 19, Vite, and Tailwind CSS.

> **For Devolatical Global Info-Tech And Analytics Pvt Ltd**

---

## 🎯 PROJECT VISION

Transform the UI into a **REAL enterprise CRM** with:
- ✅ Proper 3-layer architecture (PUBLIC | CLIENT | ADMIN)
- ✅ No layer mixing or component sharing
- ✅ Complete role-based access control (RBAC)
- ✅ Full lead-to-client conversion pipeline
- ✅ Client data isolation and security
- ✅ Production-ready codebase

---

## 📋 TABLE OF CONTENTS

- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Demo Credentials](#-demo-credentials)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Testing](#-testing)
- [Next Steps](#-next-steps)

---

## 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────┐
│          PUBLIC WEBSITE                 │
│  (Landing, Services, Inquiry Form)      │ → Route: /
│  No Authentication Required              │
└──────────────────┬──────────────────────┘
                   │ User submits inquiry
                   ↓
            ┌─────────────┐
            │ Leads Pool  │ (LeadsContext)
            └────┬────────┘
                 │ Admin converts
                 ↓
    ┌────────────────────────────────┐
    │   CLIENT PORTAL                │  → Route: /client/*
    │   (Dashboard, Projects,        │  → Auth Required + Role: "client"
    │    Tickets, Reports, Profile)  │
    └────────────────────────────────┘
                 ▲
                 │ Separate UI
                 │ Own Dashboard
                 │ Own Data Only
                 │
    ┌────────────────────────────────┐
    │   ADMIN PORTAL                 │  → Route: /admin/*
    │   (Leads, Users, Tickets,      │  → Auth Required + Role: "admin"
    │    Projects, Upload)           │
    └────────────────────────────────┘
         ▲
         │ Different UI
         │ Business Metrics
         │ All Data Access
         │ Lead Management
```

**Key Principle:** ❌ **DO NOT MIX LAYERS** - Each layer has its own components, pages, and UI logic.

---

## ⚡ QUICK START

```bash
# 1. Clone/Open project
cd SE_Project

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:5173

# 5. Explore the app!
```

---

## 🔑 DEMO CREDENTIALS

### Admin Login
```
Email: admin@connect.com
Password: admin123
```

### Client Login (Any credentials)
```
Email: client@test.com
Password: test123
```

---

## ✨ FEATURES

### 🌐 PUBLIC LAYER
- [x] Landing page with hero section
- [x] About us page
- [x] Services showcase
- [x] Lead inquiry form (name, email, phone, company, service, message)
- [x] Lead submission to LeadsContext
- [x] Login page with demo credentials

### 👥 CLIENT PORTAL
- [x] Personalized dashboard (personal metrics)
- [x] View assigned projects (filtered by client ID)
- [x] Create support tickets
- [x] Track ticket status (open → in-progress → resolved)
- [x] View assigned reports
- [x] Profile management
- [x] Logout functionality

### 🎯 ADMIN PORTAL
- [x] Business dashboard (all metrics)
- [x] Lead management system
- [x] Lead status workflow (new → contacted → converted → closed)
- [x] Lead-to-Client conversion with auto-user creation
- [x] User management (CRUD - Create, Read, Update, Delete)
- [x] View all tickets across all clients
- [x] Manage all projects
- [x] CSV/Excel file upload with preview
- [x] Lead conversion funnel chart
- [x] Ticket trends analytics

### 🔐 AUTHENTICATION & SECURITY
- [x] Role-based access control (RBAC)
- [x] Protected routes with ProtectedRoute component
- [x] Session persistence via localStorage
- [x] JWT token management (mock)
- [x] Automatic redirection based on role
- [x] Data isolation by user role

### 🎨 UI/UX
- [x] Responsive design (mobile, tablet, desktop)
- [x] Dark mode support
- [x] Tailwind CSS styling
- [x] Lucide React icons
- [x] Recharts for data visualization
- [x] Loading skeletons
- [x] Empty state components
- [x] Form validation

---

