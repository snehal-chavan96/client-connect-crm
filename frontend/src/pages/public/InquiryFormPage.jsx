import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLeads } from '../../contexts/LeadsContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const InquiryFormPage = () => {
  const { addLead } = useLeads();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Advanced Data Analytics',
    message: ''
  });

  // Updated to match Devolatical's actual services
  const services = [
    'Advanced Data Analytics',
    'IT Infrastructure Solutions',
    'Custom Software Development',
    'Executive Dashboards',
    'Other Consulting'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSelectChange = (e) => {
    setFormData(prev => ({
      ...prev,
      service: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add to leads context
      addLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message
      });

      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Advanced Data Analytics',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Decorative blobs for the background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 dark:bg-primary-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-[2.5rem] shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Graphic / Image */}
          <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
            {/* Tech/Analytics relevant image from Unsplash */}
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Data Analytics and Software Solutions" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* Gradient overlay to make it look cohesive */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
            <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <h3 className="text-3xl font-bold mb-3">Build. Scale. Transform.</h3>
              <p className="text-gray-300 text-lg opacity-90">
                End-to-end technology, analytics, and software solutions designed to help your business grow smarter and faster.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            {!submitted ? (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                    Get a Free Consultation
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Tell us about your project and our engineering team will be in touch.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      id="name"
                      label="Full Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      id="company"
                      label="Company Name"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      id="email"
                      type="email"
                      label="Work Email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      id="phone"
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="service" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Primary Area of Interest
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleSelectChange}
                      className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    >
                      {services.map(service => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                      placeholder="Tell us about your data, infrastructure, or software needs..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full shadow-md hover:shadow-lg mt-6 py-4 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" /> Request Consultation
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Request Received!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto text-lg">
                  Thank you! Our engineering team will review your requirements and contact you shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-8"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default InquiryFormPage;