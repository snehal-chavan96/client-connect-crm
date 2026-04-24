import React, { useState } from 'react';
import { Mail, Phone, Building2, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useLeads } from '../../contexts/LeadsContext';
import { useCRM } from '../../contexts/CRMContext';

const AdminLeads = () => {
  const { leads, updateLead, convertLeadToClient, deleteLead } = useLeads();
  const { addClient } = useCRM();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredLeads = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);

  const handleConvert = (lead) => {
    const newClient = {
      name: lead.company,
      email: lead.email,
      phone: lead.phone,
      industry: 'To be determined',
      owner: 'admin-1'
    };
    addClient(newClient);
    convertLeadToClient(lead.id, newClient);
    alert('Lead converted to client successfully!');
    setShowModal(false);
    setSelectedLead(null);
  };

  const handleStatusChange = (leadId, status) => {
    updateLead(leadId, { status });
  };

  const handleDelete = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(leadId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and convert leads to clients
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
          >
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      {filteredLeads.length > 0 ? (
        <div className="grid gap-4">
          {filteredLeads.map(lead => (
            <Card key={lead.id} className="p-6 border-none shadow-lg dark:shadow-none hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {lead.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      lead.status === 'new' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                      lead.status === 'contacted' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
                      lead.status === 'converted' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                    }`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{lead.phone}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    Service: <strong>{lead.service}</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {lead.message}
                  </p>
                </div>

                <div className="ml-4 text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {lead.createdAt.toLocaleDateString()}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowModal(true);
                      }}
                    >
                      View Details
                    </Button>
                    {lead.status !== 'converted' && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleConvert(lead)}
                      >
                        Convert
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-none shadow-lg dark:shadow-none">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No leads found</p>
        </Card>
      )}

      {/* Lead Detail Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <Card className="p-8 border-none shadow-xl dark:shadow-none max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Lead Details
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedLead.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedLead.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedLead.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedLead.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Message</p>
                <p className="text-gray-700 dark:text-gray-300">{selectedLead.message}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    handleStatusChange(selectedLead.id, e.target.value);
                    setSelectedLead({ ...selectedLead, status: e.target.value });
                  }}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedLead.status !== 'converted' && (
                <Button
                  onClick={() => handleConvert(selectedLead)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Convert to Client
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  handleDelete(selectedLead.id);
                  setShowModal(false);
                  setSelectedLead(null);
                }}
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedLead(null);
                }}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
