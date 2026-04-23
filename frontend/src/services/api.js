/**
 * Mock API Service Layer
 * Replace these functions with actual API calls when backend is ready
 */

const API_DELAY = 500; // Simulate network delay

// Helper function to simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // ==================== AUTH ====================
  auth: {
    login: async (email, password) => {
      await delay(API_DELAY);
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      return { email, token: 'mock-token-' + Date.now() };
    },

    logout: async () => {
      await delay(API_DELAY);
      return { success: true };
    },
  },

  // ==================== PROJECTS ====================
  projects: {
    getAll: async () => {
      await delay(API_DELAY);
      return [
        { id: 'PRJ-101', name: 'Website Redesign', startDate: 'Sep 01, 2024', dueDate: 'Nov 15, 2024', status: 'In Progress', progress: 75, client: 'Acme Corp' },
        { id: 'PRJ-102', name: 'Mobile App V2', startDate: 'Oct 10, 2024', dueDate: 'Dec 20, 2024', status: 'Blocked', progress: 30, client: 'TechFlow Inc' },
        { id: 'PRJ-103', name: 'Server Migration', startDate: 'Aug 15, 2024', dueDate: 'Sep 30, 2024', status: 'Completed', progress: 100, client: 'CloudBase Ltd' },
      ];
    },

    getClientProjects: async (clientId) => {
      await delay(API_DELAY);
      return [
        { id: 'PRJ-101', name: 'Website Redesign', startDate: 'Sep 01, 2024', dueDate: 'Nov 15, 2024', status: 'In Progress', progress: 75 },
        { id: 'PRJ-102', name: 'Mobile App V2', startDate: 'Oct 10, 2024', dueDate: 'Dec 20, 2024', status: 'Blocked', progress: 30 },
      ];
    },

    create: async (projectData) => {
      await delay(API_DELAY);
      return { id: 'PRJ-' + Math.floor(Math.random() * 1000), ...projectData };
    },

    update: async (id, projectData) => {
      await delay(API_DELAY);
      return { id, ...projectData };
    },

    delete: async (id) => {
      await delay(API_DELAY);
      return { success: true, id };
    },
  },

  // ==================== TICKETS ====================
  tickets: {
    getAll: async () => {
      await delay(API_DELAY);
      return [
        { id: 'TKT-8901', subject: 'Cannot access staging environment', priority: 'High', status: 'Open', date: 'Oct 24, 2024', client: 'Acme Corp' },
        { id: 'TKT-8902', subject: 'Invoice discrepancy for last month', priority: 'Medium', status: 'In Progress', date: 'Oct 23, 2024', client: 'TechFlow Inc' },
        { id: 'TKT-8903', subject: 'Update branding guidelines', priority: 'Low', status: 'Resolved', date: 'Oct 20, 2024', client: 'CloudBase Ltd' },
        { id: 'TKT-8904', subject: 'Bug in mobile navigation', priority: 'High', status: 'Resolved', date: 'Oct 15, 2024', client: 'Acme Corp' },
      ];
    },

    getClientTickets: async (clientId) => {
      await delay(API_DELAY);
      return [
        { id: 'TKT-8901', subject: 'Cannot access staging environment', priority: 'High', status: 'Open', date: 'Oct 24, 2024' },
        { id: 'TKT-8902', subject: 'Invoice discrepancy for last month', priority: 'Medium', status: 'In Progress', date: 'Oct 23, 2024' },
      ];
    },

    create: async (ticketData) => {
      await delay(API_DELAY);
      return { id: 'TKT-' + Math.floor(Math.random() * 10000), ...ticketData };
    },

    update: async (id, ticketData) => {
      await delay(API_DELAY);
      return { id, ...ticketData };
    },

    delete: async (id) => {
      await delay(API_DELAY);
      return { success: true, id };
    },
  },

  // ==================== USERS (ADMIN) ====================
  users: {
    getAll: async () => {
      await delay(API_DELAY);
      return [
        { id: 1, name: 'Alice Freeman', email: 'alice@company.com', role: 'Client', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@startup.inc', role: 'Client', status: 'Inactive' },
        { id: 3, name: 'Charlie Davis', email: 'charlie@enterprise.org', role: 'Admin', status: 'Active' },
      ];
    },

    create: async (userData) => {
      await delay(API_DELAY);
      return { id: Math.floor(Math.random() * 1000), ...userData };
    },

    update: async (id, userData) => {
      await delay(API_DELAY);
      return { id, ...userData };
    },

    delete: async (id) => {
      await delay(API_DELAY);
      return { success: true, id };
    },
  },

  // ==================== LEADS (ADMIN) ====================
  leads: {
    getAll: async () => {
      await delay(API_DELAY);
      return [
        { id: 101, name: 'David Lee', company: 'TechSolutions', date: '2024-03-15', status: 'New' },
        { id: 102, name: 'Eva Green', company: 'EcoCorp', date: '2024-03-14', status: 'Contacted' },
      ];
    },

    create: async (leadData) => {
      await delay(API_DELAY);
      return { id: Math.floor(Math.random() * 10000), ...leadData };
    },

    update: async (id, leadData) => {
      await delay(API_DELAY);
      return { id, ...leadData };
    },

    delete: async (id) => {
      await delay(API_DELAY);
      return { success: true, id };
    },
  },

  // ==================== DASHBOARD ====================
  dashboard: {
    getClientStats: async () => {
      await delay(API_DELAY);
      return {
        activeProjects: 3,
        openTickets: 2,
        completed: 12,
        hoursBilled: 148,
      };
    },

    getAdminStats: async () => {
      await delay(API_DELAY);
      return {
        totalUsers: 1248,
        newLeads: 42,
        openTickets: 18,
        activeProjects: 34,
      };
    },

    getRecentActivity: async () => {
      await delay(API_DELAY);
      return [
        { text: 'Project "Website Redesign" moved to Testing phase.', time: '2 hours ago', type: 'project' },
        { text: 'Support ticket #1042 resolved by agent.', time: '5 hours ago', type: 'ticket' },
        { text: 'New invoice generated for March 2024.', time: '1 day ago', type: 'invoice' },
        { text: 'You commented on "Mobile App Wireframes".', time: '2 days ago', type: 'activity' },
      ];
    },
  },
};

export default apiService;
