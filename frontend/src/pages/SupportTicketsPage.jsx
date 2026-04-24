import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, Edit2, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ticketService from '../services/ticketService';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

const SupportTicketsPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);

  // Auto-hide success/error messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await ticketService.getAllTickets();
      setTickets(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      await ticketService.createTicket(formData);
      setSuccess('Ticket created successfully');
      setFormData({ title: '', description: '', priority: 'medium' });
      setShowModal(false);
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      await ticketService.updateTicket(editingId, {
        title: formData.title,
        description: formData.description,
        ...(user?.role === 'admin' && { priority: formData.priority })
      });
      setSuccess('Ticket updated successfully');
      setFormData({ title: '', description: '', priority: 'medium' });
      setEditingId(null);
      setShowModal(false);
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update ticket');
    }
  };

  const handleDeleteTicket = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;

    try {
      await ticketService.deleteTicket(id);
      setSuccess('Ticket deleted successfully');
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete ticket');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await ticketService.updateTicketStatus(id, newStatus);
      setSuccess('Ticket status updated successfully');
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', priority: 'medium' });
    setShowModal(true);
  };

  const openEditModal = (ticket) => {
    setEditingId(ticket._id);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ title: '', description: '', priority: 'medium' });
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'text-green-600 bg-green-50',
      'medium': 'text-amber-600 bg-amber-50',
      'high': 'text-red-600 bg-red-50'
    };
    return colors[priority] || '';
  };

  const canEditTicket = (ticket) => {
    return user?.role === 'admin' || (user?.role === 'client' && ticket.createdBy._id === user?.id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and track your support requests.</p>
        </div>
        <Button size="md" onClick={openCreateModal} className="shadow-md flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Ticket
        </Button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </Card>

      {/* Tickets List */}
      <Card>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tickets found</p>
            <p className="text-gray-400 text-sm mt-2">Create a new ticket to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.title}</p>
                        <p className="text-sm text-gray-500 truncate">{ticket.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleUpdateStatus(ticket._id, e.target.value)}
                          disabled={user?.role !== 'admin' && (!ticket.assignedTo || ticket.assignedTo._id !== user?.id)}
                          className={`px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getStatusColor(ticket.status)}`}
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getPriorityColor(ticket.priority)} capitalize`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{ticket.createdBy?.name || 'Unknown'}</p>
                        <p className="text-gray-500">{ticket.createdBy?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {canEditTicket(ticket) && (
                          <button
                            onClick={() => openEditModal(ticket)}
                            className="p-1 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteTicket(ticket._id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {editingId ? 'Edit Ticket' : 'Create New Ticket'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateTicket : handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ticket title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your issue"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {user?.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SupportTicketsPage;
