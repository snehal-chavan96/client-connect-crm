import React from 'react';
import Card from '../components/common/Card';
import Table from '../components/common/Table';

const ProjectTrackingPage = () => {
  const dummyProjects = [
    { id: 'PRJ-101', name: 'Website Redesign', startDate: 'Sep 01, 2024', dueDate: 'Nov 15, 2024', status: 'In Progress', progress: 75 },
    { id: 'PRJ-102', name: 'Mobile App V2', startDate: 'Oct 10, 2024', dueDate: 'Dec 20, 2024', status: 'Blocked', progress: 30 },
    { id: 'PRJ-103', name: 'Server Migration', startDate: 'Aug 15, 2024', dueDate: 'Sep 30, 2024', status: 'Completed', progress: 100 },
  ];

  const columns = [
    { header: 'Project Name', accessor: 'name', render: (row) => (
      <div>
        <div className="font-medium text-gray-900">{row.name}</div>
        <div className="text-xs text-gray-500">{row.id}</div>
      </div>
    )},
    { header: 'Timeline', accessor: 'timeline', render: (row) => (
      <div className="text-sm">
        <span className="text-gray-500">From:</span> {row.startDate} <br/>
        <span className="text-gray-500">To:</span> {row.dueDate}
      </div>
    )},
    { header: 'Status', accessor: 'status', render: (row) => {
      const colors = { 'Completed': 'bg-green-100 text-green-800', 'In Progress': 'bg-blue-100 text-blue-800', 'Blocked': 'bg-red-100 text-red-800' };
      return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[row.status] || ''}`}>{row.status}</span>;
    }},
    { header: 'Progress', accessor: 'progress', render: (row) => (
      <div className="w-full min-w-[120px]">
        <div className="flex justify-between text-xs mb-1">
          <span>{row.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full ${row.progress === 100 ? 'bg-green-500' : 'bg-primary-500'}`} 
            style={{ width: `${row.progress}%` }}
          ></div>
        </div>
      </div>
    )},
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Tracking</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor the pulse of your ongoing initiatives.</p>
        </div>
      </div>

      <Card>
        <Table columns={columns} data={dummyProjects} />
      </Card>
    </div>
  );
};

export default ProjectTrackingPage;
