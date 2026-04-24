import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import { useCRM } from '../../contexts/CRMContext';

const AdminTickets = () => {
  const { tickets, updateTicket } = useCRM();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTickets = filterStatus === 'all' ? tickets : tickets.filter(t => t.status === filterStatus);

  const handleStatusChange = (ticketId, status) => {
    updateTicket(ticketId, { status });
  };

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      render: (row) => <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{row.id}</span>
    },
    {
      header: 'Subject',
      accessor: 'subject',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.subject}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{row.description.substring(0, 50)}...</p>
        </div>
      )
    },
    {
      header: 'Client',
      accessor: 'clientId',
      render: (row) => <span className="text-sm text-gray-600 dark:text-gray-400">{row.clientId}</span>
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
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[row.priority]}`}>{row.priority}</span>;
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      )
    },
    {
      header: 'Assigned To',
      accessor: 'assignedTo',
      render: (row) => <span className="text-sm text-gray-600 dark:text-gray-400">{row.assignedTo || 'Unassigned'}</span>
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Tickets</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all client support tickets</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
        >
          <option value="all">All Tickets</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <Card className="p-6 border-none shadow-lg dark:shadow-none">
        {filteredTickets.length > 0 ? (
          <Table columns={columns} data={filteredTickets} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No tickets found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminTickets;
