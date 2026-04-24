import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Shield, User as UserIcon } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Table from '../components/common/Table';

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Freeman', email: 'alice@company.com', role: 'Client', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@startup.inc', role: 'Client', status: 'Inactive' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@enterprise.org', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@themyscira.io', role: 'Client', status: 'Active' },
    { id: 5, name: 'Evan Wright', email: 'evan@wright.co', role: 'Client', status: 'Active' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Client', status: 'Active' });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Client', status: 'Active' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...formData }]);
    }
    setShowModal(false);
  };

  const columns = [
    { header: 'Name', accessor: 'name', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
          {row.name.charAt(0)}
        </div>
        <span className="font-medium text-gray-900">{row.name}</span>
      </div>
    )},
    { header: 'Email', accessor: 'email', render: (row) => <span className="text-gray-500">{row.email}</span> },
    { header: 'Role', accessor: 'role', render: (row) => (
      <span className="flex items-center gap-1.5 text-sm text-gray-600">
        {row.role === 'Admin' ? <Shield className="w-4 h-4 text-indigo-500" /> : <UserIcon className="w-4 h-4 text-blue-500" />}
        {row.role}
      </span>
    )},
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
        {row.status}
      </span>
    )},
    { header: 'Actions', accessor: 'actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button onClick={() => handleEdit(row)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Edit User">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => handleDelete(row.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete User">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage system users, roles, and access.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex items-center bg-gray-50 rounded-xl px-4 py-2 w-full max-w-md border border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 transition-all">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:outline-none w-full text-sm placeholder-gray-400 text-gray-700" 
          />
        </div>
        
        <Table columns={columns} data={filteredUsers} />
      </Card>

      {/* User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <Input 
                label="Full Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Jane Doe"
              />
              <Input 
                label="Email Address" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="jane@example.com"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingUser ? 'Save Changes' : 'Create User'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
