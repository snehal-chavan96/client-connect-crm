import React, { createContext, useContext, useState, useCallback } from 'react';

const CRMContext = createContext();

export const CRMProvider = ({ children }) => {
  // Sample clients
  const [clients, setClients] = useState([
    {
      id: 'CLIENT-001',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+1 (555) 111-2222',
      industry: 'Technology',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      owner: 'admin-1'
    },
    {
      id: 'CLIENT-002',
      name: 'Tech Startup Inc',
      email: 'info@techstartup.io',
      phone: '+1 (555) 222-3333',
      industry: 'Software',
      status: 'active',
      createdAt: new Date('2024-02-20'),
      owner: 'admin-1'
    }
  ]);

  // Sample projects - each belongs to a client
  const [projects, setProjects] = useState([
    {
      id: 'PRJ-001',
      name: 'Website Redesign',
      clientId: 'CLIENT-001',
      description: 'Complete website redesign and modernization',
      status: 'in-progress',
      startDate: new Date('2024-03-01'),
      dueDate: new Date('2024-05-15'),
      progress: 65,
      team: ['admin-1'],
      budget: 50000
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App V2',
      clientId: 'CLIENT-002',
      description: 'New version of mobile application',
      status: 'planning',
      startDate: new Date('2024-04-01'),
      dueDate: new Date('2024-06-30'),
      progress: 15,
      team: ['admin-1'],
      budget: 75000
    }
  ]);

  // Sample tickets - can belong to a client or be system-wide
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Cannot access staging environment',
      description: 'User reports inability to access staging servers',
      clientId: 'CLIENT-001',
      priority: 'high',
      status: 'open',
      assignedTo: 'admin-1',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdBy: 'client-user-1'
    },
    {
      id: 'TKT-002',
      subject: 'Invoice discrepancy',
      description: 'Previous invoice amounts do not match',
      clientId: 'CLIENT-001',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'admin-1',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdBy: 'client-user-1'
    },
    {
      id: 'TKT-003',
      subject: 'Bug in mobile navigation',
      description: 'Navigation menu not responding on mobile',
      clientId: 'CLIENT-002',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'admin-1',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdBy: 'client-user-2'
    }
  ]);

  // Tickets
  const createTicket = useCallback((ticketData, userId) => {
    const newTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      ...ticketData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: userId,
      status: 'open',
      assignedTo: null
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  }, [tickets.length]);

  const updateTicket = useCallback((ticketId, updates) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId ? { ...ticket, ...updates, updatedAt: new Date() } : ticket
      )
    );
  }, []);

  const getTicketsByClient = useCallback((clientId) => {
    return tickets.filter(t => t.clientId === clientId);
  }, [tickets]);

  const getTicketsByUser = useCallback((userId) => {
    return tickets.filter(t => t.createdBy === userId);
  }, [tickets]);

  const getTicketsByAssignee = useCallback((adminId) => {
    return tickets.filter(t => t.assignedTo === adminId);
  }, [tickets]);

  // Projects
  const createProject = useCallback((projectData) => {
    const newProject = {
      id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
      ...projectData,
      createdAt: new Date()
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }, [projects.length]);

  const updateProject = useCallback((projectId, updates) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  }, []);

  const getProjectsByClient = useCallback((clientId) => {
    return projects.filter(p => p.clientId === clientId);
  }, [projects]);

  const getProjectById = useCallback((projectId) => {
    return projects.find(p => p.id === projectId);
  }, [projects]);

  // Clients
  const addClient = useCallback((clientData) => {
    const newClient = {
      id: `CLIENT-${String(clients.length + 1).padStart(3, '0')}`,
      ...clientData,
      createdAt: new Date(),
      status: 'active'
    };
    setClients(prev => [newClient, ...prev]);
    return newClient;
  }, [clients.length]);

  const getClientById = useCallback((clientId) => {
    return clients.find(c => c.id === clientId);
  }, [clients]);

  const value = {
    // Clients
    clients,
    addClient,
    getClientById,
    
    // Projects
    projects,
    createProject,
    updateProject,
    getProjectsByClient,
    getProjectById,
    
    // Tickets
    tickets,
    createTicket,
    updateTicket,
    getTicketsByClient,
    getTicketsByUser,
    getTicketsByAssignee,

    // Stats
    stats: {
      totalClients: clients.length,
      totalProjects: projects.length,
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'open').length,
      inProgressTickets: tickets.filter(t => t.status === 'in-progress').length,
      resolvedTickets: tickets.filter(t => t.status === 'resolved').length
    }
  };

  return (
    <CRMContext.Provider value={value}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within CRMProvider');
  }
  return context;
};
