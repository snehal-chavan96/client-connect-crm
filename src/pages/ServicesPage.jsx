import React from 'react';
import { FolderKanban, Ticket, ShieldCheck, Zap, ArrowRight, Server, Cloud, Users } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      title: "Project Tracking",
      description: "Monitor real-time progress, milestones, and deliverables tailored for your business. Provide your team with the tools to collaborate effectively and stay on top of deadlines. Our intuitive dashboard makes it simple to visualize project lifecycles.",
      icon: <FolderKanban className="w-10 h-10 text-primary-600" />,
      features: ["Milestone tracking", "Resource allocation", "Time estimation"]
    },
    {
      title: "Support Tickets",
      description: "Priority helpdesk and issue resolution tracking with instant client notifications. Ensure your clients always have a voice and issues are addressed promptly. Multi-tier support levels keep complex problems routed to the right experts.",
      icon: <Ticket className="w-10 h-10 text-primary-600" />,
      features: ["SLA management", "Automated routing", "Customer satisfaction surveys"]
    },
    {
      title: "Secure Access",
      description: "Enterprise-grade security ensuring your sensitive data remains perfectly isolated and protected. We employ advanced encryption and multi-factor authentication so your peace of mind is never compromised.",
      icon: <ShieldCheck className="w-10 h-10 text-primary-600" />,
      features: ["End-to-end encryption", "Role-based access control", "Compliance ready"]
    },
    {
      title: "Lightning Fast",
      description: "Modern architecture ensures snappy responses and seamless synchronization across devices. Built on edge-computing networks, our infrastructure guarantees low latency globally.",
      icon: <Zap className="w-10 h-10 text-primary-600" />,
      features: ["Edge caching", "Optimized queries", "99.99% Uptime"]
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Header Section */}
      <section className="bg-primary-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-indigo-900 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Our Premium Services
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
            Discover a suite of tailored solutions designed to elevate your business operations and foster unparalleled client relationships.
          </p>
        </div>
      </section>

      {/* Services Detailed Listing */}
      <section className="py-24 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col p-8 md:p-10 hover:shadow-xl transition-shadow duration-300 border border-gray-100 bg-white">
                <div className="flex items-center gap-6 mb-6">
                  <div className="bg-primary-50 p-4 rounded-2xl flex-shrink-0">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to transform your workflow?</h3>
            <Link to="/contact">
              <Button size="lg" className="px-8 !rounded-full shadow-lg hover:shadow-primary-500/25 transition-all">
                Get Started Today <ArrowRight className="w-5 h-5 ml-2 inline-block" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
