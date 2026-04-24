import React from 'react';
import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  Zap,
  Sparkles,
  Globe,
  CheckCircle2,
  BarChart3,
  Database
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative bg-gray-50 dark:bg-[#0a0f1c] py-24 px-6 overflow-hidden flex items-center min-h-[60vh]">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 font-medium mb-8 shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
            Discover Our Story
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white leading-[1.1]">
            Empowering Growth Through <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
              Data & Innovation
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We transform raw data into meaningful insights and architect modern IT solutions that help ambitious businesses scale smarter, faster, and more securely.
          </p>
        </div>
      </section>

      {/* COMPANY OVERVIEW SECTION */}
      <section className="py-24 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text & Bullets */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Company Overview
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Based in Andheri, Mumbai, Devolatical Global Info-Tech And Analytics Pvt Ltd bridges the gap between complex raw data and actionable business intelligence. We help organizations unlock their true potential through modern engineering.
              </p>

              <div className="space-y-4">
                {[
                  "Specialized in advanced Data Infrastructure & Warehousing",
                  "Expertise in Predictive Analytics & Business Intelligence",
                  "Custom IT solutions tailored for scalable enterprise growth",
                  "Committed to industry-grade security and compliance"
                ].map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: "Data Processed", value: "50TB+", icon: Database, color: "text-blue-500", bg: "bg-blue-500/10" },
                { label: "Global Clients", value: "120+", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                { label: "System Uptime", value: "99.9%", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { label: "Analytics Models", value: "450+", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="p-6 rounded-3xl bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </h4>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0f1c]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* MISSION */}
          <div className="group relative p-10 rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                To empower businesses with advanced data analytics and reliable IT infrastructure that drives smarter decision-making and sustainable growth.
              </p>
            </div>
          </div>

          {/* VISION */}
          <div className="group relative p-10 rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                To become a leading global technology and analytics company delivering innovative, secure, and scalable digital solutions for businesses worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              The foundational principles that guide our engineering, our client relationships, and our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Data Security", desc: "Ensuring complete protection of business-critical data with enterprise-grade encryption.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: Users, title: "Client Focus", desc: "Building modular solutions tailored specifically to solve your real business bottlenecks.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Zap, title: "Innovation", desc: "Continuously adapting and improving with modern, scalable software technologies.", color: "text-indigo-500", bg: "bg-indigo-500/10" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group text-center p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0f1c]">
        <div className="max-w-4xl mx-auto text-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl rounded-full" />
          
          <div className="relative z-10 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 mb-8 font-medium">
              <Globe className="w-4 h-4 mr-2" />
              Built for Global Scale
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Let’s Build Something Powerful Together
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Whether you need to modernize your infrastructure or build advanced analytics dashboards, our engineering team is ready to help.
            </p>

            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-1 transition-all duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;