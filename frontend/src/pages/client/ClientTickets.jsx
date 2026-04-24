import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useCRM } from '../../contexts/CRMContext';

const ClientTickets = () => {
  const { user } = useAuth();
  const { createTicket, getTicketsByUser } = useCRM();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const clientTickets = getTicketsByUser(user?.id);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket({
      subject: formData.subject,
      description: formData.description,
      priority: formData.priority,
      clientId: 'CLIENT-001' // Mock - in real app would get from user's client ID
    }, user?.id);
    setFormData({ subject: '', description: '', priority: 'medium' });
    setShowForm(false);
  };

  const columns = [
    {
      header: 'Ticket ID',
      accessor: 'id',
      render: (row) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{row.id}</span>
      )
    },
    {
      header: 'Subject',
      accessor: 'subject',
      render: (row) => (
        <span className="font-medium text-gray-900 dark:text-white">{row.subject}</span>
      )
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => {
        const colors = {
          high: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
          medium: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
          low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
        };
        return (
          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[row.priority] || ''}`}>
            {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
          </span>
        );
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const colors = {
          'open': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
          'in-progress': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
          'resolved': 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
        };
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[row.status] || ''}`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        );
      }
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      render: (row) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {row.createdAt.toLocaleDateString()}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create and manage your support requests
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="md" className="shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Create Ticket
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-none shadow-lg dark:shadow-none">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Create New Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="subject"
              label="Subject"
              placeholder="Brief description of your issue"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                placeholder="Detailed description of your issue..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit">Submit Ticket</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="p-6 border-none shadow-lg dark:shadow-none">
        {clientTickets.length > 0 ? (
          <Table columns={columns} data={clientTickets} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No tickets yet. Create one to get started.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientTickets;
