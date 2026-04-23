import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Trash2, Edit2 } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';

const AdminLeadsPage = () => {
  const { leads, updateLead, deleteLead, addLead } = useCRM();
  const { openModal, closeModal, isOpen, getData } = useModal();
  const { success, error: showError } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Web Development',
  });

  const services = ['Web Development', 'Mobile App', 'Cloud Services', 'Consulting', 'Other'];
  const statuses = ['New', 'Pending', 'Closed'];

  // Filter and search leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleEditLead = (lead) => {
    setFormData(lead);
    openModal('edit-lead', lead);
  };

  const handleStatusChange = (leadId, newStatus) => {
    updateLead(leadId, { status: newStatus });
    success(`Lead status updated to ${newStatus}`);
  };

  const handleDeleteLead = (leadId) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLead(leadId);
      success('Lead deleted successfully');
    }
  };

  const handleSaveLead = () => {
    if (!formData.name || !formData.company || !formData.email) {
      showError('Please fill in all required fields');
      return;
    }
    updateLead(getData('edit-lead').id, formData);
    success('Lead updated successfully');
    closeModal('edit-lead');
  };

  const columns = [
    {
      header: 'Lead Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.name}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Company',
      accessor: 'company',
    },
    {
      header: 'Service',
      accessor: 'service',
      render: (row) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {row.service}
        </span>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${
            row.status === 'New'
              ? 'bg-green-100 text-green-800'
              : row.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditLead(row)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteLead(row.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Lead Management</h2>
          <p className="text-sm text-gray-500 mt-1">Track and manage all incoming leads</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-blue-50 rounded-xl w-fit mb-3">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {leads.filter(l => l.status === 'New').length}
          </h3>
          <p className="text-sm text-gray-500">New Leads</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-yellow-50 rounded-xl w-fit mb-3">
            <Filter className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {leads.filter(l => l.status === 'Pending').length}
          </h3>
          <p className="text-sm text-gray-500">Pending Leads</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <div className="p-3 bg-green-50 rounded-xl w-fit mb-3">
            <Filter className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            {leads.filter(l => l.status === 'Closed').length}
          </h3>
          <p className="text-sm text-gray-500">Closed Leads</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-none bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </Card>

      {/* Leads Table */}
      <Card>
        <Table columns={columns} data={filteredLeads} />
      </Card>

      {/* Edit Lead Modal */}
      <Modal id="edit-lead" title="Edit Lead" size="lg">
        <div className="space-y-4">
          <Input
            id="name"
            label="Lead Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            id="company"
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            id="phone"
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="service" className="text-sm font-medium text-gray-700">
              Service
            </label>
            <select
              id="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
            >
              {services.map(svc => (
                <option key={svc} value={svc}>{svc}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSaveLead} className="flex-1">Save Changes</Button>
            <Button variant="outline" onClick={() => closeModal('edit-lead')} className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminLeadsPage;
