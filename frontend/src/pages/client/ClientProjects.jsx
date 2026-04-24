import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import { useCRM } from '../../contexts/CRMContext';

const ClientProjects = () => {
  const { projects } = useCRM();

  const columns = [
    {
      header: 'Project Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{row.id}</div>
        </div>
      )
    },
    {
      header: 'Timeline',
      accessor: 'timeline',
      render: (row) => (
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">From:</span> {row.startDate.toLocaleDateString()} <br/>
          <span className="text-gray-500 dark:text-gray-400">To:</span> {row.dueDate.toLocaleDateString()}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const colors = {
          'completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
          'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
          'planning': 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
        };
        return (
          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[row.status] || ''}`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace('-', ' ')}
          </span>
        );
      }
    },
    {
      header: 'Progress',
      accessor: 'progress',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${row.progress}%` }}></div>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 w-8 text-right">{row.progress}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View and track all your assigned projects
        </p>
      </div>

      <Card className="p-6 border-none shadow-lg dark:shadow-none">
        {projects.length > 0 ? (
          <Table columns={columns} data={projects} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects assigned yet</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientProjects;
