import React from 'react';
import { Users, Briefcase, Ticket, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../../components/common/Card';
import { useLeads } from '../../contexts/LeadsContext';
import { useCRM } from '../../contexts/CRMContext';

const AdminDashboard = () => {
  const { leads, newLeadsCount } = useLeads();
  const { stats } = useCRM();

  const ticketTrend = [
    { month: 'Jan', open: 12, resolved: 8 },
    { month: 'Feb', open: 15, resolved: 12 },
    { month: 'Mar', open: 10, resolved: 14 },
    { month: 'Apr', open: 18, resolved: 10 },
  ];

  const leadConversion = [
    { stage: 'Leads', value: leads.length, color: '#3b82f6' },
    { stage: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, color: '#8b5cf6' },
    { stage: 'Converted', value: leads.filter(l => l.status === 'converted').length, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Overview of leads, clients, and operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-none shadow-lg dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{leads.length}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ {newLeadsCount} new</p>
            </div>
            <div className="text-4xl opacity-30"><TrendingUp /></div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-lg dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalClients}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Active accounts</p>
            </div>
            <div className="text-4xl opacity-30"><Users /></div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-lg dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Across clients</p>
            </div>
            <div className="text-4xl opacity-30"><Briefcase /></div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-lg dark:shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Open Tickets</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.openTickets}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Needs attention</p>
            </div>
            <div className="text-4xl opacity-30"><Ticket /></div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Lead Conversion Funnel">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={leadConversion} cx="50%" cy="50%" labelLine={false} label={({ value }) => `${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {leadConversion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Ticket Trends">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ticketTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="open" stroke="#3b82f6" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Recent Leads">
        <div className="space-y-4">
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} className="flex items-center justify-between pb-4 border-b dark:border-gray-700 last:border-b-0 last:pb-0">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">{lead.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company} • {lead.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                lead.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                lead.status === 'contacted' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
                'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              }`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
