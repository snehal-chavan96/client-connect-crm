import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ticket, FolderKanban, ShieldCheck, Zap } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const LandingPage = () => {
  const services = [
    {
      title: "Project Tracking",
      description: "Monitor real-time progress, milestones, and deliverables tailored for your business.",
      icon: <FolderKanban className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Support Tickets",
      description: "Priority helpdesk and issue resolution tracking with instant client notifications.",
      icon: <Ticket className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Secure Access",
      description: "Enterprise-grade security ensuring your sensitive data remains perfectly isolated and protected.",
      icon: <ShieldCheck className="w-8 h-8 text-primary-600" />
    },
    {
      title: "Lightning Fast",
      description: "Modern architecture ensures snappy responses and seamless synchronization.",
      icon: <Zap className="w-8 h-8 text-primary-600" />
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative px-6 py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            New Portal Experience
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Client Portal</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience seamless collaboration, project tracking, and priority support all in one beautifully crafted workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto px-8 !rounded-full shadow-[0_8px_16px_-6px_rgba(37,99,235,0.4)]">
                Request Access <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 !rounded-full border-gray-200 bg-white">
                Client Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Premium Service Offerings</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need to stay connected and productive, beautifully organized.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
