import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const mockCSVData = [
    { name: 'John Acme', email: 'john@acme.com', phone: '+1-555-1234', company: 'Acme Corp' },
    { name: 'Jane Tech', email: 'jane@techcorp.io', phone: '+1-555-5678', company: 'Tech Corp' },
    { name: 'Bob Startup', email: 'bob@startup.dev', phone: '+1-555-9012', company: 'Startup Dev' },
  ];

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Mock CSV preview
      if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx')) {
        setPreview(mockCSVData);
      } else {
        alert('Please select a CSV or Excel file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setFile(null);
      setPreview(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Upload</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Import leads or customer data via CSV/Excel files
        </p>
      </div>

      {/* Upload Area */}
      <Card className="p-8 border-none shadow-lg dark:shadow-none">
        <div className="text-center">
          {success && (
            <div className="mb-6 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>File uploaded successfully!</span>
            </div>
          )}

          {!file && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Upload a file
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Drag and drop your CSV or Excel file here, or click to select
              </p>

              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button className="px-8">Choose File</Button>
              </label>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Supported formats: CSV, Excel (.xlsx, .xls)
              </p>
            </>
          )}

          {file && (
            <>
              <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {uploading ? 'Uploading...' : 'Upload File'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Preview */}
      {preview && (
        <Card className="p-6 border-none shadow-lg dark:shadow-none" title="Preview Data">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Company</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, idx) => (
                  <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{row.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.email}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.phone}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-6 border-none shadow-lg dark:shadow-none bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
        <div className="flex gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">File Format Requirements</h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• First row should contain headers: name, email, phone, company</li>
              <li>• Maximum file size: 10 MB</li>
              <li>• Supported formats: CSV, Excel (.xlsx, .xls)</li>
              <li>• Emails must be valid and unique</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminUpload;
