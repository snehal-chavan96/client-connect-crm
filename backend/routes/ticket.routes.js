const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  updateTicketStatus
} = require('../controllers/ticket.controller');

// All routes require authentication
router.use(authMiddleware);

// Create a new ticket
router.post('/', createTicket);

// Get all tickets (filtered by role)
router.get('/', getAllTickets);

// Get ticket by ID
router.get('/:id', getTicketById);

// Update ticket
router.put('/:id', updateTicket);

// Update ticket status
router.patch('/:id/status', updateTicketStatus);

// Delete ticket (admin only)
router.delete('/:id', deleteTicket);

module.exports = router;
