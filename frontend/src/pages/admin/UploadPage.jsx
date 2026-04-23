import React, { useState } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';

const UploadPage = () => {
  const { success } = useToast();
  const [previewData, setPreviewData] = useState(null);
  const [uploading, setUploading] = useState(false);

  const sampleData = [
    { id: 1, name: 'John Doe', company: 'Acme Corp', email: 'john@acme.com' },
    { id: 2, name: 'Jane Smith', company: 'TechFlow', email: 'jane@techflow.com' },
    { id: 3, name: 'Mike Johnson', company: 'CloudBase', email: 'mike@cloudbase.com' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file preview
      setPreviewData(sampleData);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      success('Data uploaded successfully! 3 records imported.');
      setUploading(false);
      setPreviewData(null);
    }, 1000);
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Company', accessor: 'company' },
    { header: 'Email', accessor: 'email' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Upload Data</h2>
        <p className="text-sm text-gray-500 mt-1">Import leads and customers from CSV/Excel</p>
      </div>

      {/* Upload Area */}
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV or Excel File</h3>
          <p className="text-gray-500 mb-6">Drag and drop your file here, or click to select</p>
          
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button as="label" className="cursor-pointer">
              <FileText className="w-4 h-4 mr-2" /> Choose File
            </Button>
          </label>

          <p className="text-xs text-gray-400 mt-4">Supported formats: CSV, XLSX, XLS</p>
        </div>
      </Card>

      {/* Preview */}
      {previewData && (
        <>
          <Card title="Preview Data" action={<span className="text-sm text-gray-500">{previewData.length} records</span>}>
            <Table columns={columns} data={previewData} />
          </Card>

          {/* Upload Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1"
            >
              {uploading ? (
                <span className="animate-pulse">Uploading...</span>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" /> Upload Data
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setPreviewData(null)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </>
      )}

      {/* Template Download */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Need a template?</h3>
            <p className="text-sm text-gray-500 mt-1">Download our CSV template to get started</p>
          </div>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" /> Download Template
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UploadPage;
