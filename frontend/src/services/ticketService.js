import axiosInstance from './axios';

const ticketService = {
  /**
   * Get all tickets (filtered by role)
   * @returns {Promise<Array>}
   */
  getAllTickets: async () => {
    const response = await axiosInstance.get('/tickets');
    return response.data.data;
  },

  /**
   * Get ticket by ID
   * @param {string} id - Ticket ID
   * @returns {Promise<Object>}
   */
  getTicketById: async (id) => {
    const response = await axiosInstance.get(`/tickets/${id}`);
    return response.data.data;
  },

  /**
   * Create a new ticket
   * @param {Object} ticketData - { title, description, priority }
   * @returns {Promise<Object>}
   */
  createTicket: async (ticketData) => {
    const response = await axiosInstance.post('/tickets', ticketData);
    return response.data.data;
  },

  /**
   * Update ticket
   * @param {string} id - Ticket ID
   * @param {Object} updateData - { title, description, status, priority, assignedTo }
   * @returns {Promise<Object>}
   */
  updateTicket: async (id, updateData) => {
    const response = await axiosInstance.put(`/tickets/${id}`, updateData);
    return response.data.data;
  },

  /**
   * Update ticket status only
   * @param {string} id - Ticket ID
   * @param {string} status - New status
   * @returns {Promise<Object>}
   */
  updateTicketStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/tickets/${id}/status`, { status });
    return response.data.data;
  },

  /**
   * Delete ticket
   * @param {string} id - Ticket ID
   * @returns {Promise<Object>}
   */
  deleteTicket: async (id) => {
    const response = await axiosInstance.delete(`/tickets/${id}`);
    return response.data.data;
  }
};

export default ticketService;
