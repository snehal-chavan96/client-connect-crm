import React from 'react';
import { Users, FileText, Ticket, FolderKanban } from 'lucide-react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';

const AdminDashboard = () => {
  const adminStats = [
    { title: 'Total Users', value: '1,248', icon: <Users className="w-6 h-6 text-indigo-500" /> },
    { title: 'New Leads', value: '42', icon: <FileText className="w-6 h-6 text-green-500" /> },
    { title: 'Open Tickets', value: '18', icon: <Ticket className="w-6 h-6 text-red-500" /> },
    { title: 'Active Projects', value: '34', icon: <FolderKanban className="w-6 h-6 text-blue-500" /> },
  ];

  const recentUsers = [
    { id: 1, name: 'Alice Freeman', email: 'alice@company.com', role: 'Client', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@startup.inc', role: 'Client', status: 'Inactive' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@enterprise.org', role: 'Admin', status: 'Active' },
  ];

  const recentLeads = [
    { id: 101, name: 'David Lee', company: 'TechSolutions', date: '2024-03-15', status: 'New' },
    { id: 102, name: 'Eva Green', company: 'EcoCorp', date: '2024-03-14', status: 'Contacted' },
  ];

  const userColumns = [
    { header: 'Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900">{row.name}</span> },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {row.status}
      </span>
    )},
  ];

  const leadColumns = [
    { header: 'Contact', accessor: 'name', render: (row) => <span className="font-medium text-gray-900">{row.name}</span> },
    { header: 'Company', accessor: 'company' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {row.status}
      </span>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Admin control center metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="flex flex-col justify-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-500 mb-2">{stat.title}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Card title="Recent Users" action={<button className="text-sm text-primary-600 font-medium">Manage Users</button>}>
          <Table columns={userColumns} data={recentUsers} />
        </Card>

        <Card title="New Leads" action={<button className="text-sm text-primary-600 font-medium">View All Leads</button>}>
          <Table columns={leadColumns} data={recentLeads} />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
