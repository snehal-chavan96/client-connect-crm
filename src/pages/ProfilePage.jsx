import React, { useState } from 'react';
import { User, Lock, FileText, FolderKanban, CheckCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Table from '../components/common/Table';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    jobTitle: 'Product Manager'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const assignedProjects = [
    { id: 1, name: 'Q3 Marketing Website Refresh', status: 'In Progress', progress: 65, dueDate: '2024-09-30' },
    { id: 2, name: 'Mobile App V2 Launch', status: 'Planning', progress: 15, dueDate: '2024-11-15' },
    { id: 3, name: 'Brand Identity Redesign', status: 'Completed', progress: 100, dueDate: '2024-02-28' }
  ];

  const assignedReports = [
    { id: 101, title: 'Q2 Performance Analysis', date: '2024-07-15', type: 'PDF' },
    { id: 102, title: 'Annual Security Audit', date: '2024-01-20', type: 'PDF' },
  ];

  const projectColumns = [
    { header: 'Project Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900">{row.name}</span> },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'Completed' ? 'bg-green-100 text-green-800' : row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
        {row.status}
      </span>
    )},
    { header: 'Progress', accessor: 'progress', render: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${row.progress}%` }}></div>
        </div>
        <span className="text-xs text-gray-500">{row.progress}%</span>
      </div>
    )}
  ];

  const handleProfileSave = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if(passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // In a real app, this would be an API call
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          <Card title={<div className="flex items-center gap-2"><User className="w-5 h-5 text-primary-600" /> Personal Information</div>}>
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="First Name" value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} />
                <Input label="Last Name" value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} />
                <Input label="Email Address" type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} />
                <Input label="Phone Number" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
                <Input label="Company" value={profileData.company} onChange={e => setProfileData({...profileData, company: e.target.value})} />
                <Input label="Job Title" value={profileData.jobTitle} onChange={e => setProfileData({...profileData, jobTitle: e.target.value})} />
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-50">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>

          <Card title={<div className="flex items-center gap-2"><Lock className="w-5 h-5 text-gray-700" /> Change Password</div>}>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="max-w-md space-y-4">
                <Input label="Current Password" type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} />
                <Input label="New Password" type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} />
                <Input label="Confirm New Password" type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} />
              </div>
              <div className="flex justify-start pt-4 border-t border-gray-50">
                <Button variant="outline" type="submit">Update Password</Button>
              </div>
            </form>
          </Card>

        </div>

        {/* Right Column: Assigned Assets */}
        <div className="space-y-8">
          <Card title={<div className="flex items-center gap-2"><FolderKanban className="w-5 h-5 text-blue-600" /> My Projects</div>} className="bg-gradient-to-b from-blue-50/50 to-white border-blue-100">
            <div className="space-y-4">
              {assignedProjects.map(project => (
                <div key={project.id} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">{project.name}</h4>
                    {project.status === 'Completed' && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>Due: {project.dueDate}</span>
                    <span className="font-medium text-primary-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-primary-500'}`} style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">View All Projects</button>
            </div>
          </Card>

          <Card title={<div className="flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600" /> Available Reports</div>} className="bg-gradient-to-b from-indigo-50/50 to-white border-indigo-100">
            <ul className="divide-y divide-gray-100">
              {assignedReports.map(report => (
                <li key={report.id} className="py-3 flex justify-between items-center group">
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{report.title}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md">
                    {report.type}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
