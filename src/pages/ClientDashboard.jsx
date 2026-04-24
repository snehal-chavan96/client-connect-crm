import React from 'react';
import { Clock, CheckCircle2, AlertCircle, FileText, Activity, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, LineChart, Line, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts';
import Card from '../components/common/Card';
import { useTheme } from '../contexts/ThemeContext';

const ClientDashboard = () => {
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

  // Sparkline Data
  const sparklineData1 = [{ v: 2 }, { v: 4 }, { v: 3 }, { v: 5 }, { v: 4 }, { v: 6 }, { v: 7 }];
  const sparklineData2 = [{ v: 5 }, { v: 4 }, { v: 6 }, { v: 3 }, { v: 5 }, { v: 2 }, { v: 4 }];
  const sparklineData3 = [{ v: 10 }, { v: 12 }, { v: 11 }, { v: 14 }, { v: 15 }, { v: 16 }, { v: 18 }];
  const sparklineData4 = [{ v: 30 }, { v: 35 }, { v: 32 }, { v: 38 }, { v: 40 }, { v: 42 }, { v: 45 }];

  const stats = [
    { title: 'Active Projects', value: '3', icon: <FileText className="w-5 h-5 text-blue-500" />, trend: '+12%', isPositive: true, sparkline: sparklineData1, color: '#3b82f6' },
    { title: 'Open Tickets', value: '2', icon: <AlertCircle className="w-5 h-5 text-amber-500" />, trend: '-5%', isPositive: true, sparkline: sparklineData2, color: '#f59e0b' },
    { title: 'Completed Tasks', value: '12', icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, trend: '+25%', isPositive: true, sparkline: sparklineData3, color: '#10b981' },
    { title: 'Hours Billed', value: '148', icon: <Clock className="w-5 h-5 text-purple-500" />, trend: '+8%', isPositive: true, sparkline: sparklineData4, color: '#8b5cf6' },
  ];

  // Advanced Chart Data
  const revenuePerformanceData = [
    { name: 'Jan', revenue: 4000, target: 4500, margin: 2400 },
    { name: 'Feb', revenue: 3000, target: 4500, margin: 1398 },
    { name: 'Mar', revenue: 5000, target: 4800, margin: 3800 },
    { name: 'Apr', revenue: 4500, target: 5000, margin: 2908 },
    { name: 'May', revenue: 6000, target: 5200, margin: 4800 },
    { name: 'Jun', revenue: 7500, target: 5500, margin: 6800 },
  ];

  const ticketTrendsData = [
    { name: 'Week 1', opened: 12, resolved: 10 },
    { name: 'Week 2', opened: 15, resolved: 14 },
    { name: 'Week 3', opened: 8, resolved: 12 },
    { name: 'Week 4', opened: 20, resolved: 18 },
  ];

  const projectAnalyticsData = [
    { name: 'Design', hours: 45, color: '#8b5cf6' },
    { name: 'Development', hours: 85, color: '#3b82f6' },
    { name: 'Testing', hours: 25, color: '#f59e0b' },
    { name: 'Management', hours: 15, color: '#10b981' }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Client Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time performance and financial metrics.</p>
        </div>
        <button className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-500/30 px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-indigo-700 transition-all transform hover:-translate-y-0.5">
          Export Analytics
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                    <linearGradient id={`colorClient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={stat.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={stat.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={stat.color} fillOpacity={1} fill={`url(#colorClient${index})`} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Analytics Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Performance */}
        <Card title={<div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-500"/> Revenue & Targets</div>} className="h-[420px] flex flex-col">
          <div className="flex-grow w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenuePerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <RechartsTooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="revenue" fill="url(#colorRevenue)" stroke="#818cf8" strokeWidth={2} name="Actual Revenue" />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target Revenue" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Ticket Trends */}
        <Card title="Support Ticket Trends" className="h-[420px] flex flex-col">
          <div className="flex-grow w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: isDarkMode ? '#374151' : '#f8fafc' }} contentStyle={tooltipStyle} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="opened" fill="#ef4444" radius={[4, 4, 0, 0]} name="Tickets Opened" barSize={20} />
                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Tickets Resolved" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Project Time Distribution */}
        <Card title="Project Time Distribution" className="h-[380px] flex flex-col">
          <div className="flex-grow w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectAnalyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="hours"
                  stroke="none"
                >
                  {projectAnalyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px', color: textColor }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Terminal */}
        <Card title={<div className="flex items-center gap-2"><Activity className="w-5 h-5 text-green-500"/> Live Activity Feed</div>}>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 dark:text-gray-500">14:02:11</span>
              <span className="text-blue-600 dark:text-blue-400">[SYSTEM]</span>
              <span className="text-gray-800 dark:text-gray-300">Data sync completed successfully.</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 dark:text-gray-500">13:45:09</span>
              <span className="text-green-600 dark:text-green-400">[TICKET]</span>
              <span className="text-gray-800 dark:text-gray-300">Issue #1042 resolved by agent.</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 dark:text-gray-500">11:20:00</span>
              <span className="text-purple-600 dark:text-purple-400">[REPORT]</span>
              <span className="text-gray-800 dark:text-gray-300">Q3 Financials exported by Jane Doe.</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 dark:text-gray-500">09:15:33</span>
              <span className="text-yellow-600 dark:text-yellow-400">[ALERT]</span>
              <span className="text-gray-800 dark:text-gray-300">API rate limit nearing threshold (85%).</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
