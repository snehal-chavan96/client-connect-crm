import React from 'react';
import { FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useCRM } from '../../contexts/CRMContext';

const ClientDashboard = () => {
  const { user } = useAuth();
  const { projects, tickets, stats } = useCRM();

  const ticketStatusData = [
    { name: 'Open', value: stats.openTickets, color: '#3b82f6' },
    { name: 'In Progress', value: stats.inProgressTickets, color: '#f59e0b' },
    { name: 'Resolved', value: stats.resolvedTickets, color: '#10b981' }
  ];

  const projectProgressData = projects.slice(0, 3).map(p => ({
    name: p.name.substring(0, 15),
    progress: p.progress
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {user?.company && `Company: ${user.company}`}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: <FileText className="w-6 h-6 text-blue-600" />, label: 'Active Projects', value: projects.length },
          { icon: <AlertCircle className="w-6 h-6 text-amber-600" />, label: 'Open Tickets', value: stats.openTickets },
          { icon: <CheckCircle2 className="w-6 h-6 text-green-600" />, label: 'Resolved', value: stats.resolvedTickets },
          { icon: <Clock className="w-6 h-6 text-purple-600" />, label: 'In Progress', value: stats.inProgressTickets }
        ].map((stat, idx) => (
          <Card key={idx} className="p-6 border-none shadow-lg dark:shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="text-4xl opacity-20">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Ticket Status Overview">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ticketStatusData} cx="50%" cy="50%" labelLine={false} label={({ value }) => `${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {ticketStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Project Progress">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="progress" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Recent Projects">
        <div className="space-y-4">
          {projects.slice(0, 3).map(project => (
            <div key={project.id} className="flex items-center justify-between pb-4 border-b dark:border-gray-700 last:border-b-0 last:pb-0">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{project.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due: {project.dueDate.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-8 text-right">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ClientDashboard;
