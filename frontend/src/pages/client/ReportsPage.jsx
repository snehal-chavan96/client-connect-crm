import React from 'react';
import { Download, Eye, FileText, BarChart3 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ReportsPage = () => {
  const reports = [
    {
      id: 1,
      name: 'Project Summary Report',
      description: 'Overview of all active projects and milestones',
      date: '2024-03-20',
      type: 'pdf',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Financial Report',
      description: 'Invoice and billing summary for Q1 2024',
      date: '2024-03-15',
      type: 'xlsx',
      size: '1.8 MB',
    },
    {
      id: 3,
      name: 'Support Tickets Report',
      description: 'Detailed breakdown of support tickets and resolutions',
      date: '2024-03-10',
      type: 'pdf',
      size: '1.2 MB',
    },
    {
      id: 4,
      name: 'Performance Analytics',
      description: 'Monthly performance metrics and KPIs',
      date: '2024-03-01',
      type: 'xlsx',
      size: '3.1 MB',
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'xlsx':
        return '📊';
      default:
        return '📁';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500 mt-1">Download and view all available reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-blue-50 rounded-xl w-fit mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{reports.length}</h3>
          <p className="text-sm text-gray-500">Available Reports</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-green-50 rounded-xl w-fit mb-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {(reports.reduce((sum, r) => sum + parseFloat(r.size), 0)).toFixed(1)} MB
          </h3>
          <p className="text-sm text-gray-500">Total Size</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-purple-50 rounded-xl w-fit mb-3">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {reports.filter(r => r.type === 'pdf').length}
          </h3>
          <p className="text-sm text-gray-500">PDF Reports</p>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-3xl pt-1">{getFileIcon(report.type)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>📅 {report.date}</span>
                    <span>💾 {report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="md">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="md">
                  <Download className="w-4 h-4 mr-1" /> Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
