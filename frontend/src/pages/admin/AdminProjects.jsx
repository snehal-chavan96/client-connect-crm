import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import { useCRM } from '../../contexts/CRMContext';

const AdminProjects = () => {
  const { projects, updateProject } = useCRM();

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
      header: 'Client',
      accessor: 'clientId',
      render: (row) => <span className="text-sm text-gray-600 dark:text-gray-400">{row.clientId}</span>
    },
    {
      header: 'Timeline',
      accessor: 'timeline',
      render: (row) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {row.startDate.toLocaleDateString()} → {row.dueDate.toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Budget',
      accessor: 'budget',
      render: (row) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          ${row.budget?.toLocaleString() || 'N/A'}
        </span>
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
          <select
            value={row.status}
            onChange={(e) => updateProject(row.id, { status: e.target.value })}
            className={`px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer ${colors[row.status]}`}
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        );
      }
    },
    {
      header: 'Progress',
      accessor: 'progress',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${row.progress}%` }}></div>
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-6 text-right">{row.progress}%</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Projects</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage and track all client projects
        </p>
      </div>

      <Card className="p-6 border-none shadow-lg dark:shadow-none">
        {projects.length > 0 ? (
          <Table columns={columns} data={projects} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminProjects;
