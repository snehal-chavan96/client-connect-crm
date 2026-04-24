import React from 'react';
import { Users, FileText, Ticket, FolderKanban, CheckCircle, Clock, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, LineChart, Line, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import { useTheme } from '../contexts/ThemeContext';

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();

  // Theme-aware colors
  const textColor = isDarkMode ? '#9ca3af' : '#64748b';
  const gridColor = isDarkMode ? '#374151' : '#f1f5f9';
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    borderColor: isDarkMode ? '#374151' : '#f1f5f9',
    color: isDarkMode ? '#f3f4f6' : '#111827',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const sparklineData1 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 18 }, { v: 22 }, { v: 20 }, { v: 25 }];
  const sparklineData2 = [{ v: 2 }, { v: 5 }, { v: 3 }, { v: 8 }, { v: 10 }, { v: 7 }, { v: 12 }];
  const sparklineData3 = [{ v: 8 }, { v: 7 }, { v: 9 }, { v: 6 }, { v: 5 }, { v: 4 }, { v: 3 }];
  const sparklineData4 = [{ v: 5 }, { v: 8 }, { v: 10 }, { v: 12 }, { v: 15 }, { v: 18 }, { v: 20 }];

  const adminStats = [
    { title: 'Total Users', value: '1,248', icon: <Users className="w-5 h-5 text-indigo-500" />, trend: '+15%', isPositive: true, sparkline: sparklineData1, color: '#6366f1' },
    { title: 'New Leads', value: '42', icon: <FileText className="w-5 h-5 text-green-500" />, trend: '+8%', isPositive: true, sparkline: sparklineData2, color: '#10b981' },
    { title: 'Open Tickets', value: '18', icon: <Ticket className="w-5 h-5 text-red-500" />, trend: '-12%', isPositive: true, sparkline: sparklineData3, color: '#ef4444' },
    { title: 'Active Projects', value: '34', icon: <FolderKanban className="w-5 h-5 text-blue-500" />, trend: '+5%', isPositive: true, sparkline: sparklineData4, color: '#3b82f6' },
  ];

  // Lead Conversion Funnel Data (Simulated with BarChart)
  const leadConversionData = [
    { stage: 'Site Visitors', count: 5000 },
    { stage: 'Signups', count: 1200 },
    { stage: 'Qualified Leads', count: 450 },
    { stage: 'Negotiation', count: 150 },
    { stage: 'Closed Won', count: 85 }
  ];

  const overallRevenueData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 14000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 28000 },
    { name: 'Jun', value: 35000 },
  ];

  const leadsStatusData = [
    { name: 'New', value: 45, color: '#3b82f6' },
    { name: 'Contacted', value: 30, color: '#f59e0b' },
    { name: 'Qualified', value: 15, color: '#10b981' },
    { name: 'Lost', value: 10, color: '#ef4444' }
  ];

  const recentUsers = [
    { id: 1, name: 'Alice Freeman', email: 'alice@company.com', role: 'Client', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@startup.inc', role: 'Client', status: 'Inactive' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@enterprise.org', role: 'Admin', status: 'Active' },
  ];

  const userColumns = [
    { header: 'Name', accessor: 'name', render: (row) => <span className="font-bold text-gray-900 dark:text-gray-100">{row.name}</span> },
    { header: 'Email', accessor: 'email', render: (row) => <span className="text-gray-500 dark:text-gray-400">{row.email}</span> },
    { header: 'Role', accessor: 'role' },
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${row.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
        {row.status}
      </span>
    )},
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Analytics Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">High-level system metrics and lead conversion rates.</p>
        </div>
        <button className="bg-gradient-to-r from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 text-white shadow-lg shadow-gray-500/30 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all transform hover:-translate-y-0.5">
          Generate Admin Report
        </button>
      </div>

      {/* Upgraded KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 dark:from-gray-700 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm transition-shadow">
                {stat.icon}
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${stat.isPositive ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                {stat.trend}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">{stat.value}</h3>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{stat.title}</p>
            </div>

            <div className="h-16 mt-4 w-full -ml-2 -mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.sparkline}>
                  <defs>
                    <linearGradient id={`colorAdmin${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={stat.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={stat.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={stat.color} fillOpacity={1} fill={`url(#colorAdmin${index})`} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Overall Revenue Area Chart */}
        <Card title={<div className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500"/> Overall Revenue Growth</div>} className="h-[380px] flex flex-col">
          <div className="flex-grow w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overallRevenueData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="colorOverallRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <RechartsTooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOverallRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Lead Conversion Funnel */}
        <Card title="Lead Conversion Funnel" className="h-[380px] flex flex-col">
          <div className="flex-grow w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={leadConversionData} margin={{ top: 10, right: 10, bottom: 0, left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: isDarkMode ? '#374151' : '#f8fafc' }} contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Leads Status Overview" className="h-[380px] flex flex-col">
          <div className="flex-grow w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {leadsStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px', color: textColor }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Users Widget */}
        <Card title="Recent Users" action={<button className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors">Manage All</button>}>
          <Table columns={userColumns} data={recentUsers} />
        </Card>

      </div>
    </div>
  );
};

export default AdminDashboard;
