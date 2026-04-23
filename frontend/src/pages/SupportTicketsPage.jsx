import React from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Table from '../components/common/Table';

const SupportTicketsPage = () => {
  const { role } = useAuth();

  const clientTickets = [
    { id: 'TKT-8901', subject: 'Cannot access staging environment', priority: 'High', status: 'Open', date: 'Oct 24, 2024' },
    { id: 'TKT-8902', subject: 'Invoice discrepancy for last month', priority: 'Medium', status: 'In Progress', date: 'Oct 23, 2024' },
  ];

  const allTickets = [
    { id: 'TKT-8901', subject: 'Cannot access staging environment', priority: 'High', status: 'Open', date: 'Oct 24, 2024', client: 'Acme Corp' },
    { id: 'TKT-8902', subject: 'Invoice discrepancy for last month', priority: 'Medium', status: 'In Progress', date: 'Oct 23, 2024', client: 'TechFlow Inc' },
    { id: 'TKT-8903', subject: 'Update branding guidelines', priority: 'Low', status: 'Resolved', date: 'Oct 20, 2024', client: 'CloudBase Ltd' },
    { id: 'TKT-8904', subject: 'Bug in mobile navigation', priority: 'High', status: 'Resolved', date: 'Oct 15, 2024', client: 'Acme Corp' },
  ];

  const tickets = role === 'admin' ? allTickets : clientTickets;

  const adminColumns = [
    { header: 'Ticket ID', accessor: 'id', render: (row) => <span className="font-mono text-sm text-gray-600">{row.id}</span> },
    { header: 'Subject', accessor: 'subject', render: (row) => <span className="font-medium text-gray-900">{row.subject}</span> },
    { header: 'Client', accessor: 'client' },
    { header: 'Date Opened', accessor: 'date' },
    { header: 'Priority', accessor: 'priority', render: (row) => {
      const colors = { High: 'text-red-600 bg-red-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-green-600 bg-green-50' };
      return <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[row.priority] || ''}`}>{row.priority}</span>;
    }},
    { header: 'Status', accessor: 'status', render: (row) => {
      const colors = { 'Open': 'bg-blue-100 text-blue-800', 'In Progress': 'bg-yellow-100 text-yellow-800', 'Resolved': 'bg-gray-100 text-gray-800' };
      return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[row.status] || ''}`}>{row.status}</span>;
    }},
  ];

  const clientColumns = [
    { header: 'Ticket ID', accessor: 'id', render: (row) => <span className="font-mono text-sm text-gray-600">{row.id}</span> },
    { header: 'Subject', accessor: 'subject', render: (row) => <span className="font-medium text-gray-900">{row.subject}</span> },
    { header: 'Date Opened', accessor: 'date' },
    { header: 'Priority', accessor: 'priority', render: (row) => {
      const colors = { High: 'text-red-600 bg-red-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-green-600 bg-green-50' };
      return <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[row.priority] || ''}`}>{row.priority}</span>;
    }},
    { header: 'Status', accessor: 'status', render: (row) => {
      const colors = { 'Open': 'bg-blue-100 text-blue-800', 'In Progress': 'bg-yellow-100 text-yellow-800', 'Resolved': 'bg-gray-100 text-gray-800' };
      return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[row.status] || ''}`}>{row.status}</span>;
    }},
  ];

  const columns = role === 'admin' ? adminColumns : clientColumns;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-500 mt-1">{role === 'admin' ? 'All support tickets' : 'Manage and track your technical support requests.'}</p>
        </div>
        {role === 'client' && (
          <Button size="md" className="shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Create New Ticket
          </Button>
        )}
      </div>

      <Card>
        <Table columns={columns} data={tickets} />
      </Card>
    </div>
  );
};

export default SupportTicketsPage;
