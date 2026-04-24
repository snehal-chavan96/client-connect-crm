import React, { useState } from 'react';
import { Search, Edit2, Trash2, Shield, User as UserIcon, Plus } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Freeman', email: 'alice@company.com', role: 'client', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@startup.inc', role: 'client', status: 'Inactive' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@connect.com', role: 'admin', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@corp.io', role: 'client', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'client', status: 'Active' });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...formData }]);
    }
    setShowModal(false);
    setFormData({ name: '', email: '', role: 'client', status: 'Active' });
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{row.name}</span>
        </div>
      )
    },
    { header: 'Email', accessor: 'email', render: (row) => <span className="text-gray-600 dark:text-gray-400">{row.email}</span> },
    {
      header: 'Role',
      accessor: 'role',
      render: (row) => (
        <span className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
          {row.role === 'admin' ? <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
          {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleEdit(row)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(row.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage system users and roles</p>
        </div>
        <Button onClick={() => { setEditingUser(null); setFormData({ name: '', email: '', role: 'client', status: 'Active' }); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <Card className="p-6 border-none shadow-lg dark:shadow-none">
        <div className="mb-6 flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:outline-none w-full text-sm placeholder-gray-400"
          />
        </div>

        <Table columns={columns} data={filteredUsers} />
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <Card className="p-8 border-none shadow-xl dark:shadow-none max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>

            <div className="space-y-4 mb-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">
                {editingUser ? 'Update' : 'Create'}
              </Button>
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
