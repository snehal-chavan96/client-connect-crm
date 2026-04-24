const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    // Create ticket with createdBy from authenticated user
    const ticket = new Ticket({
      title,
      description,
      priority: priority || 'medium',
      createdBy: req.user.id,
      status: 'open'
    });

    await ticket.save();
    
    // Populate user info
    await ticket.populate('createdBy', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating ticket'
    });
  }
};

// Get all tickets (with role-based filtering)
const getAllTickets = async (req, res) => {
  try {
    let query = {};

    // Client can only see their own tickets
    if (req.user.role === 'client') {
      query.createdBy = req.user.id;
    }
    // Admin can see all tickets

    const tickets = await Ticket.find(query)
      .populate('createdBy', 'name email role')
      .populate('assignedTo', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Tickets retrieved successfully',
      data: tickets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving tickets'
    });
  }
};

// Get ticket by ID with role-based access control
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id)
      .populate('createdBy', 'name email role')
      .populate('assignedTo', 'name email role');

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Role-based access control
    if (req.user.role === 'client' && ticket.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this ticket'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Ticket retrieved successfully',
      data: ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving ticket'
    });
  }
};

// Update ticket with role-based access control
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Role-based access control
    if (req.user.role === 'client') {
      // Clients can only update their own tickets and only certain fields
      if (ticket.createdBy.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this ticket'
        });
      }
      // Clients can only update title and description
      if (title) ticket.title = title;
      if (description) ticket.description = description;
    } else if (req.user.role === 'admin') {
      // Admins can update all fields
      if (title) ticket.title = title;
      if (description) ticket.description = description;
      if (status) ticket.status = status;
      if (priority) ticket.priority = priority;
      if (assignedTo !== undefined) ticket.assignedTo = assignedTo || null;
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update tickets'
      });
    }

    await ticket.save();
    await ticket.populate('createdBy', 'name email role');
    await ticket.populate('assignedTo', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Ticket updated successfully',
      data: ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating ticket'
    });
  }
};

// Delete ticket (admin only)
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admin can delete
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete tickets'
      });
    }

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Ticket deleted successfully',
      data: ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting ticket'
    });
  }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status || !['open', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: open, in-progress, resolved, closed'
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Only admin or assigned user can update status
    if (req.user.role !== 'admin' && ticket.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this ticket status'
      });
    }

    ticket.status = status;
    await ticket.save();
    await ticket.populate('createdBy', 'name email role');
    await ticket.populate('assignedTo', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Ticket status updated successfully',
      data: ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating ticket status'
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  updateTicketStatus
};
