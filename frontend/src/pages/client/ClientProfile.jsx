import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const ClientProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    company: user?.company || '',
    jobTitle: 'Manager'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Mock API call
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock API call
    setPasswordSaved(true);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 border-none shadow-lg dark:shadow-none" title={<div className="flex items-center gap-2"><User className="w-5 h-5 text-primary-600" /> Personal Information</div>}>
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="name"
                  label="Full Name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                />
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
                <Input
                  id="phone"
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
                <Input
                  id="jobTitle"
                  label="Job Title"
                  value={profileData.jobTitle}
                  onChange={handleProfileChange}
                />
                <Input
                  id="company"
                  label="Company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                  disabled
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                <div>
                  {profileSaved && (
                    <p className="text-sm text-green-600 dark:text-green-400">✓ Saved successfully</p>
                  )}
                </div>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>

          <Card className="p-6 border-none shadow-lg dark:shadow-none" title={<div className="flex items-center gap-2"><Lock className="w-5 h-5 text-gray-700 dark:text-gray-300" /> Change Password</div>}>
            <form onSubmit={handlePasswordSave} className="space-y-6">
              <Input
                id="currentPassword"
                type="password"
                label="Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />

              <Input
                id="newPassword"
                type="password"
                label="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />

              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />

              <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                <div>
                  {passwordSaved && (
                    <p className="text-sm text-green-600 dark:text-green-400">✓ Password updated</p>
                  )}
                </div>
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 border-none shadow-lg dark:shadow-none">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-600">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {user?.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.company}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                Account Status: <span className="text-green-600 dark:text-green-400">Active</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
