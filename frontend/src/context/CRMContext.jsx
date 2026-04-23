import React, { createContext, useContext, useState, useCallback } from 'react';

const CRMContext = createContext();

export const CRMProvider = ({ children }) => {
  // Leads state
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Smith', company: 'Acme Corp', email: 'john@acme.com', phone: '9876543210', service: 'Web Development', status: 'New', createdAt: '2024-03-20' },
    { id: 2, name: 'Sarah Johnson', company: 'TechFlow Inc', email: 'sarah@techflow.com', phone: '9876543211', service: 'Mobile App', status: 'Pending', createdAt: '2024-03-18' },
    { id: 3, name: 'Mike Davis', company: 'CloudBase Ltd', email: 'mike@cloudbase.com', phone: '9876543212', service: 'Cloud Services', status: 'Closed', createdAt: '2024-03-15' },
  ]);

  // Tickets state
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'Cannot access staging environment', description: 'Unable to connect to staging server', priority: 'High', status: 'Open', clientId: 1, createdAt: '2024-03-20', assignedTo: 'Admin' },
    { id: 2, subject: 'Invoice discrepancy', description: 'March invoice shows incorrect amount', priority: 'Medium', status: 'In Progress', clientId: 2, createdAt: '2024-03-19', assignedTo: 'Support Team' },
    { id: 3, subject: 'Need documentation update', description: 'API docs outdated', priority: 'Low', status: 'Resolved', clientId: 3, createdAt: '2024-03-18', assignedTo: 'Docs Team' },
  ]);

  // Projects state
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', client: 'Acme Corp', startDate: 'Sep 01, 2024', dueDate: 'Nov 15, 2024', status: 'In Progress', progress: 75, team: 'Frontend Team' },
    { id: 2, name: 'Mobile App V2', client: 'TechFlow Inc', startDate: 'Oct 10, 2024', dueDate: 'Dec 20, 2024', status: 'Blocked', progress: 30, team: 'Mobile Team' },
    { id: 3, name: 'Server Migration', client: 'CloudBase Ltd', startDate: 'Aug 15, 2024', dueDate: 'Sep 30, 2024', status: 'Completed', progress: 100, team: 'DevOps Team' },
  ]);

  // Leads management
  const addLead = useCallback((leadData) => {
    const newLead = {
      id: leads.length + 1,
      ...leadData,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  }, [leads.length]);

  const updateLead = useCallback((id, updatedData) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, ...updatedData } : lead));
  }, []);

  const deleteLead = useCallback((id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  }, []);

  const getLeadById = useCallback((id) => {
    return leads.find(lead => lead.id === id);
  }, [leads]);

  // Tickets management
  const addTicket = useCallback((ticketData) => {
    const newTicket = {
      id: tickets.length + 1,
      ...ticketData,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  }, [tickets.length]);

  const updateTicket = useCallback((id, updatedData) => {
    setTickets(prev => prev.map(ticket => ticket.id === id ? { ...ticket, ...updatedData } : ticket));
  }, []);

  const deleteTicket = useCallback((id) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  }, []);

  const getTicketById = useCallback((id) => {
    return tickets.find(ticket => ticket.id === id);
  }, [tickets]);

  // Projects management
  const addProject = useCallback((projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      status: 'In Progress',
      progress: 0,
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }, [projects.length]);

  const updateProject = useCallback((id, updatedData) => {
    setProjects(prev => prev.map(project => project.id === id ? { ...project, ...updatedData } : project));
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  }, []);

  // Statistics
  const getStats = useCallback(() => {
    return {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'New').length,
      pendingLeads: leads.filter(l => l.status === 'Pending').length,
      closedLeads: leads.filter(l => l.status === 'Closed').length,
      
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'Open').length,
      inProgressTickets: tickets.filter(t => t.status === 'In Progress').length,
      resolvedTickets: tickets.filter(t => t.status === 'Resolved').length,
      
      highPriorityTickets: tickets.filter(t => t.priority === 'High').length,
      mediumPriorityTickets: tickets.filter(t => t.priority === 'Medium').length,
      lowPriorityTickets: tickets.filter(t => t.priority === 'Low').length,
      
      totalProjects: projects.length,
      completedProjects: projects.filter(p => p.status === 'Completed').length,
      inProgressProjects: projects.filter(p => p.status === 'In Progress').length,
    };
  }, [leads, tickets, projects]);

  const value = {
    // Leads
    leads,
    addLead,
    updateLead,
    deleteLead,
    getLeadById,

    // Tickets
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketById,

    // Projects
    projects,
    addProject,
    updateProject,
    deleteProject,

    // Stats
    getStats,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within CRMProvider');
  }
  return context;
};
