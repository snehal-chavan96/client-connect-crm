import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AdminTicketsPage = () => {
  const { tickets, updateTicket, addTicket } = useCRM();
  const { openModal, closeModal, isOpen } = useModal();
  const { success } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Medium',
  });

  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Open', 'In Progress', 'Resolved'];

  // Filter and search tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tickets, searchTerm, priorityFilter, statusFilter]);

  const handleStatusChange = (ticketId, newStatus) => {
    updateTicket(ticketId, { status: newStatus });
    success(`Ticket status updated to ${newStatus}`);
  };

  const handleCreateTicket = () => {
    if (!formData.subject || !formData.description) {
      alert('Please fill in all fields');
      return;
    }
    addTicket(formData);
    success('Ticket created successfully');
    closeModal('create-ticket');
    setFormData({ subject: '', description: '', priority: 'Medium' });
  };

  const columns = [
    {
      header: 'Subject',
      accessor: 'subject',
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.subject}</div>
          <div className="text-xs text-gray-500">#{row.id}</div>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          row.priority === 'High'
            ? 'bg-red-100 text-red-800'
            : row.priority === 'Medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {row.priority}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${
            row.status === 'Open'
              ? 'bg-blue-100 text-blue-800'
              : row.status === 'In Progress'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      ),
    },
    {
      header: 'Assigned To',
      accessor: 'assignedTo',
    },
    {
      header: 'Created',
      accessor: 'createdAt',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all support tickets</p>
        </div>
        <Button onClick={() => openModal('create-ticket')} className="shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Create Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-blue-50 rounded-xl w-fit mb-3">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {tickets.filter(t => t.status === 'Open').length}
          </h3>
          <p className="text-sm text-gray-500">Open Tickets</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-purple-50 rounded-xl w-fit mb-3">
            <Filter className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {tickets.filter(t => t.status === 'In Progress').length}
          </h3>
          <p className="text-sm text-gray-500">In Progress</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-green-50 rounded-xl w-fit mb-3">
            <Filter className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {tickets.filter(t => t.status === 'Resolved').length}
          </h3>
          <p className="text-sm text-gray-500">Resolved</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-none bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </Card>

      {/* Tickets Table */}
      <Card>
        <Table columns={columns} data={filteredTickets} />
      </Card>

      {/* Create Ticket Modal */}
      <Modal id="create-ticket" title="Create New Ticket" size="lg">
        <div className="space-y-4">
          <Input
            id="subject"
            label="Subject"
            placeholder="Issue subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe the issue..."
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="priority" className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateTicket} className="flex-1">Create Ticket</Button>
            <Button variant="outline" onClick={() => closeModal('create-ticket')} className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTicketsPage;
