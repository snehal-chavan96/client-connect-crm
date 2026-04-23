import React from 'react';
import { Users, FolderKanban, Ticket, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCRM } from '../../context/CRMContext';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';

const AdminDashboard = () => {
  const { leads, tickets, projects, getStats } = useCRM();
  const stats = getStats();

  // Data for charts
  const leadsByStatus = [
    { name: 'New', value: stats.newLeads, fill: '#3B82F6' },
    { name: 'Pending', value: stats.pendingLeads, fill: '#F59E0B' },
    { name: 'Closed', value: stats.closedLeads, fill: '#10B981' },
  ];

  const ticketsByPriority = [
    { name: 'High', value: stats.highPriorityTickets },
    { name: 'Medium', value: stats.mediumPriorityTickets },
    { name: 'Low', value: stats.lowPriorityTickets },
  ];

  const monthlyActivity = [
    { month: 'Jan', leads: 12, tickets: 8, projects: 3 },
    { month: 'Feb', leads: 19, tickets: 12, projects: 5 },
    { month: 'Mar', leads: 15, tickets: 14, projects: 4 },
    { month: 'Apr', leads: 22, tickets: 18, projects: 6 },
  ];

  const recentLeads = leads.slice(0, 5);
  const recentTickets = tickets.slice(0, 5);

  const leadColumns = [
    {
      header: 'Company',
      accessor: 'company',
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.company}</div>
          <div className="text-xs text-gray-500">{row.name}</div>
        </div>
      ),
    },
    {
      header: 'Service',
      accessor: 'service',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'New'
            ? 'bg-green-100 text-green-800'
            : row.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      ),
    },
  ];

  const ticketColumns = [
    {
      header: 'Subject',
      accessor: 'subject',
      render: (row) => (
        <div className="text-sm font-medium text-gray-900">{row.subject}</div>
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
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === 'Open'
            ? 'bg-blue-100 text-blue-800'
            : row.status === 'In Progress'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">System overview and key metrics</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-blue-50 rounded-xl w-fit mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalLeads}</h3>
          <p className="text-sm text-gray-500">Total Leads</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-purple-50 rounded-xl w-fit mb-3">
            <FolderKanban className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.totalProjects}</h3>
          <p className="text-sm text-gray-500">Active Projects</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-orange-50 rounded-xl w-fit mb-3">
            <Ticket className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.openTickets}</h3>
          <p className="text-sm text-gray-500">Open Tickets</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-green-50 rounded-xl w-fit mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats.completedProjects}</h3>
          <p className="text-sm text-gray-500">Completed</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Status */}
        <Card title="Leads by Status">
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadsByStatus} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {leadsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tickets by Priority */}
        <Card title="Tickets by Priority">
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsByPriority}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Monthly Activity */}
      <Card title="Monthly Activity">
        <div className="h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="tickets" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="projects" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Leads" action={<a href="/admin/leads" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</a>}>
          <Table columns={leadColumns} data={recentLeads} />
        </Card>

        <Card title="Recent Tickets" action={<a href="/admin/tickets" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</a>}>
          <Table columns={ticketColumns} data={recentTickets} />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
