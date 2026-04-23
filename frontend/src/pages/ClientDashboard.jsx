import React from 'react';
import { Clock, CheckCircle2, AlertCircle, FileText, Activity } from 'lucide-react';
import Card from '../components/common/Card';
const ClientDashboard = () => {
  const stats = [
    { title: 'Active Projects', value: '3', icon: <FileText className="w-6 h-6 text-blue-500" />, trend: '+1 this month' },
    { title: 'Open Tickets', value: '2', icon: <AlertCircle className="w-6 h-6 text-amber-500" />, trend: 'Requires attention' },
    { title: 'Completed', value: '12', icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, trend: '+4 this quarter' },
    { title: 'Hours Billed', value: '148', icon: <Clock className="w-6 h-6 text-purple-500" />, trend: 'Avg. 35/week' },
  ];

  const recentActivity = [
    { text: 'Project "Website Redesign" moved to Testing phase.', time: '2 hours ago', icon: <FileText className="w-4 h-4 text-primary-500" /> },
    { text: 'Support ticket #1042 resolved by agent.', time: '5 hours ago', icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
    { text: 'New invoice generated for March 2024.', time: '1 day ago', icon: <FileText className="w-4 h-4 text-gray-500" /> },
    { text: 'You commented on "Mobile App Wireframes".', time: '2 days ago', icon: <Activity className="w-4 h-4 text-primary-500" /> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <button className="bg-primary-50 text-primary-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex flex-col justify-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-500 mb-2">{stat.title}</p>
            <p className="text-xs text-gray-400 font-medium">{stat.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Recent Activity" className="h-full">
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-4 items-start relative group">
                {index !== recentActivity.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-gray-100 group-hover:bg-primary-100 transition-colors"></div>
                )}
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border-2 border-white shadow-sm z-10">
                  {activity.icon}
                </div>
                <div className="pt-1.5">
                  <p className="text-sm text-gray-800 leading-snug">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Project Health Matrix" action={<button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>}>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Website Redesign</span>
                <span className="font-medium text-primary-600">75%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
                <div className="bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-400">Testing phase underway</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Mobile App V2</span>
                <span className="font-medium text-amber-500">30%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
                <div className="bg-amber-400 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-gray-400">Waiting on client assets</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">SEO Optimization</span>
                <span className="font-medium text-green-500">90%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-400">Final review and deployment</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
