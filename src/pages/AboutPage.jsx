import React from 'react';
import { Target, Eye, ShieldCheck, Users, Zap, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-indigo-900 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
            About Client Connect
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to bridging the gap between businesses and their clients through seamless, intuitive, and powerful CRM solutions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded in 2024, Client Connect was built out of a necessity for transparency and efficiency in client management. Our platform serves as a central hub where projects, support tickets, and direct communications coalesce into a single, unified workspace. We empower agencies, freelancers, and enterprise teams to maintain absolute clarity with their clients, ensuring every project is delivered on time and every issue is resolved promptly.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <Card className="p-8 border-none shadow-premium bg-white">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide businesses with a frictionless environment to manage their client relationships. We strive to eliminate the chaos of scattered emails and spreadsheets by delivering a centralized, secure, and highly responsive portal that puts the client experience first.
            </p>
          </Card>

          <Card className="p-8 border-none shadow-premium bg-white">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              We envision a future where client management is no longer a bottleneck but a catalyst for growth. By leveraging cutting-edge technology and beautiful design, we aim to be the global standard for client portal solutions, trusted by thousands of businesses worldwide.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">What sets us apart from traditional CRM software.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Uncompromising Security</h4>
              <p className="text-gray-600">
                Your data is protected by enterprise-grade encryption. We take privacy seriously so you can focus on your work.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast UX</h4>
              <p className="text-gray-600">
                A perfectly optimized, modern interface ensures that navigating your projects and tickets is always snappy and responsive.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Client-Centric Design</h4>
              <p className="text-gray-600">
                We didn't just build this for you; we built it for your clients. Our portal is intuitive enough for anyone to use without training.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
