import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Zap, Activity, BarChart3, 
  Server, Code2, Monitor, Globe, ShieldCheck, ChevronRight 
} from 'lucide-react';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis
} from 'recharts';

const LandingPage = () => {
  const performanceData = [
    { name: 'Jan', value: 3000 },
    { name: 'Feb', value: 3500 },
    { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 4200 },
    { name: 'May', value: 6500 },
    { name: 'Jun', value: 8000 },
  ];

  return (
    <div className="flex flex-col min-h-screen text-white bg-[#0a0f1c] font-sans selection:bg-blue-500/30">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-md">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                Data • Analytics • IT Solutions
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Give your data a <br className="hidden lg:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  new direction
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Devolatical Global Info-Tech And Analytics Pvt Ltd — Your reliable partner for modern IT & data solutions. We help businesses understand their data and make informed decisions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/contact">
                  <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] flex items-center">
                    Get In Touch 
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/services">
                  <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-md">
                    Explore Services
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT DASHBOARD */}
            <div className="relative hidden lg:block perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-purple-600/20 blur-3xl rounded-full" />
              
              <div className="relative bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-1">
                
                {/* Window Controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/20">
                    <Activity className="w-3 h-3 mr-1.5 animate-pulse" /> +34.2% Growth
                  </div>
                </div>

                {/* Chart Area */}
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#60a5fa"
                        strokeWidth={4}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative z-10 py-24 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Core Competencies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">End-to-end technology solutions tailored to modernize your infrastructure and empower your decision-making.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: "Data Analytics", desc: "Transform raw business data into meaningful insights for smarter decisions.", color: "from-blue-500/20", iconBg: "bg-blue-500/20 text-blue-400" },
              { icon: Server, title: "IT Infrastructure", desc: "Secure, scalable and high-performance systems for your business.", color: "from-indigo-500/20", iconBg: "bg-indigo-500/20 text-indigo-400" },
              { icon: Code2, title: "Custom Software", desc: "Tailored software solutions built exactly for your operational needs.", color: "from-purple-500/20", iconBg: "bg-purple-500/20 text-purple-400" },
              { icon: Monitor, title: "Executive Dashboards", desc: "Real-time KPI dashboards designed for faster decision-making.", color: "from-emerald-500/20", iconBg: "bg-emerald-500/20 text-emerald-400" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group relative overflow-hidden rounded-2xl p-8 bg-[#111827]/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                  <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative z-10 text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-center text-white">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Global Tech Standards", desc: "We follow enterprise-grade engineering practices and modern architecture.", iconColor: "text-blue-400" },
              { icon: ShieldCheck, title: "Complete Data Security", desc: "Your data is protected with industry-level encryption and secure systems.", iconColor: "text-purple-400" },
              { icon: Zap, title: "Expert Guidance & Support", desc: "Our team ensures continuous support and strategic technical guidance.", iconColor: "text-emerald-400" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-start p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <Icon className={`w-10 h-10 mb-5 ${item.iconColor}`} />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-12 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-12 text-center backdrop-blur-lg">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white relative z-10">
              Ready to transform your business with data?
            </h2>
            <p className="text-blue-200/70 mb-8 max-w-2xl mx-auto text-lg relative z-10">
              Let’s build the future together with intelligent IT and analytics solutions tailored specifically to your goals.
            </p>
            <Link to="/contact">
              <button className="relative z-10 bg-white text-blue-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center mx-auto">
                Contact Us Now <ChevronRight className="ml-1 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;