import React, { createContext, useContext, useState, useCallback } from 'react';

const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([
    {
      id: 'LEAD-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp',
      service: 'CRM Implementation',
      message: 'Interested in implementing your CRM for our team',
      status: 'new',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      notes: ''
    },
    {
      id: 'LEAD-002',
      name: 'Jane Smith',
      email: 'jane@techstartup.io',
      phone: '+1 (555) 234-5678',
      company: 'Tech Startup Inc',
      service: 'Support & Maintenance',
      message: 'Looking for ongoing support',
      status: 'contacted',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      notes: 'Left voicemail on Tuesday'
    }
  ]);

  const addLead = useCallback((leadData) => {
    const newLead = {
      id: `LEAD-${String(leads.length + 1).padStart(3, '0')}`,
      ...leadData,
      status: 'new',
      createdAt: new Date(),
      notes: ''
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  }, [leads.length]);

  const updateLead = useCallback((leadId, updates) => {
    setLeads(prev => 
      prev.map(lead => 
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    );
  }, []);

  const convertLeadToClient = useCallback((leadId, clientData) => {
    // Create client from lead
    const client = {
      id: `CLIENT-${Date.now()}`,
      leadId: leadId,
      ...clientData,
      createdAt: new Date()
    };
    
    // Mark lead as converted
    updateLead(leadId, { status: 'converted' });
    
    return client;
  }, [updateLead]);

  const deleteLead = useCallback((leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  }, []);

  const getLeadById = useCallback((leadId) => {
    return leads.find(lead => lead.id === leadId);
  }, [leads]);

  const getLeadsByStatus = useCallback((status) => {
    return leads.filter(lead => lead.status === status);
  }, [leads]);

  const value = {
    leads,
    addLead,
    updateLead,
    convertLeadToClient,
    deleteLead,
    getLeadById,
    getLeadsByStatus,
    newLeadsCount: leads.filter(l => l.status === 'new').length,
    convertedLeadsCount: leads.filter(l => l.status === 'converted').length
  };

  return (
    <LeadsContext.Provider value={value}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error('useLeads must be used within LeadsProvider');
  }
  return context;
};
