import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

const ClientReports = () => {
  const { user } = useAuth();

  const reports = [
    {
      id: 'RPT-001',
      title: 'Q3 2024 Performance Report',
      type: 'PDF',
      size: '2.4 MB',
      createdAt: new Date('2024-10-01'),
      description: 'Quarterly performance metrics and analytics'
    },
    {
      id: 'RPT-002',
      title: 'Project Milestone Summary',
      type: 'Excel',
      size: '1.8 MB',
      createdAt: new Date('2024-10-15'),
      description: 'Detailed milestone achievements and timeline'
    },
    {
      id: 'RPT-003',
      title: 'Support Tickets Analysis',
      type: 'PDF',
      size: '3.2 MB',
      createdAt: new Date('2024-10-10'),
      description: 'Support ticket trends and resolution metrics'
    },
    {
      id: 'RPT-004',
      title: 'Budget Utilization Report',
      type: 'Excel',
      size: '2.1 MB',
      createdAt: new Date('2024-09-30'),
      description: 'Budget allocation and spending breakdown'
    }
  ];

  const handleDownload = (reportId, title) => {
    // Mock download
    alert(`Downloading: ${title}`);
    console.log('Mock download:', reportId);
  };

  const handleView = (reportId, title) => {
    alert(`Opening: ${title}`);
    console.log('Mock view:', reportId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Documents</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Access and download your project and performance reports
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="grid gap-4">
          {reports.map(report => (
            <Card key={report.id} className="p-6 border-none shadow-lg dark:shadow-none hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {report.title}
                    </h3>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded">
                      {report.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>Created: {report.createdAt.toLocaleDateString()}</span>
                    <span>Size: {report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleView(report.id, report.title)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="View Report"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(report.id, report.title)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Download Report"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-none shadow-lg dark:shadow-none">
          <FileText className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No reports available yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Reports will be generated as your projects progress
          </p>
        </Card>
      )}
    </div>
  );
};

export default ClientReports;
