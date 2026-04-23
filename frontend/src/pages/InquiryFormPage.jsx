import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const InquiryFormPage = () => {
  const { addLead } = useCRM();
  const { success } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    company: '', 
    email: '', 
    phone: '',
    service: 'Web Development',
    message: '' 
  });
  const [errors, setErrors] = useState({});

  const services = [
    'Web Development',
    'Mobile App',
    'Cloud Services',
    'Consulting',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (errors[e.target.id]) {
      setErrors(prev => ({ ...prev, [e.target.id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create lead in CRM context
    addLead(formData);
    success('Lead submitted successfully! We will contact you soon.');
    
    // Reset form
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', service: 'Web Development', message: '' });
      setErrors({});
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 relative z-10">
        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Request Access</h2>
              <p className="text-gray-500 text-sm">Drop us a line and we'll provision your portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                id="name" 
                label="Full Name" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required 
              />
              <Input 
                id="company" 
                label="Company Name" 
                placeholder="Acme Corp" 
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
                required 
              />
              <Input 
                id="email" 
                type="email" 
                label="Work Email" 
                placeholder="john@company.com" 
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required 
              />
              <Input 
                id="phone" 
                type="tel" 
                label="Phone Number" 
                placeholder="+91 98765 43210" 
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required 
              />
              
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="service" className="text-sm font-medium text-gray-700">
                  Service Interested In
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 hover:border-gray-300"
                >
                  {services.map(svc => (
                    <option key={svc} value={svc}>{svc}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`px-4 py-3 bg-white border rounded-xl text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 hover:border-gray-300 focus:ring-primary-500/20 focus:border-primary-500'
                  }`}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {errors.message && <span className="text-sm text-red-500">{errors.message}</span>}
              </div>

              <Button type="submit" size="lg" className="w-full shadow-md hover:shadow-lg mt-4">
                <Send className="w-4 h-4 mr-2" /> Send Inquiry
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500 mb-8">We'll be in touch with your access details shortly.</p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Send Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryFormPage;
