import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, PieChart, Activity, ShieldCheck, Zap } from 'lucide-react';
import Button from '../components/common/Button';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Custom hook for count-up animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

const CountUpNumber = ({ value, suffix = '', prefix = '' }) => {
  const count = useCountUp(value);
  return <span>{prefix}{count}{suffix}</span>;
};

const LandingPage = () => {
  // Mock Data for Preview Charts
  const performanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 7500 },
  ];

  const conversionData = [
    { name: 'Mon', leads: 40, sales: 24 },
    { name: 'Tue', leads: 30, sales: 13 },
    { name: 'Wed', leads: 55, sales: 38 },
    { name: 'Thu', leads: 45, sales: 28 },
    { name: 'Fri', leads: 60, sales: 43 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Gradient Hero Section */}
      <div className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#172554] animate-gradient-xy">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[140px] animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Hero Text */}
          <div className="text-center lg:text-left lg:col-span-5">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-blue-300 text-sm font-semibold mb-8 animate-fade-in shadow-xl">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              The Future of Data Analytics
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white">
              Visualize Your Data. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Scale Your Business.</span>
            </h1>
            <p className="text-xl text-blue-100/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Transform raw CRM data into actionable insights instantly. Experience enterprise-grade analytics with our stunning, interactive dashboards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/contact">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all flex items-center">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link to="/services">
                <button className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all flex items-center backdrop-blur-sm">
                  View Features
                </button>
              </Link>
            </div>
          </div>

          {/* Floating Glassmorphism Dashboard Preview */}
          <div className="relative hidden lg:block lg:col-span-7 animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 transform rotate-2 rounded-3xl blur-2xl"></div>
            <div className="relative bg-[#0f172a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider ml-2">Live Preview</span>
                </div>
                <div className="flex items-center text-green-400 text-sm font-bold bg-green-400/10 px-2 py-1 rounded-md">
                  <Activity className="w-4 h-4 mr-1" /> +24%
                </div>
              </div>

              {/* Preview Chart */}
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#818cf8' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Floating Mini Cards */}
              <div className="grid grid-cols-2 gap-5 mt-8">
                <div className="bg-black/40 border border-white/10 rounded-2xl p-5 transform transition-transform hover:-translate-y-1 shadow-lg">
                  <p className="text-gray-400 text-sm font-semibold mb-1 uppercase tracking-wider">Total Revenue</p>
                  <p className="text-3xl font-extrabold text-white">$<CountUpNumber value={84500} /></p>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-5 transform transition-transform hover:-translate-y-1 shadow-lg">
                  <p className="text-gray-400 text-sm font-semibold mb-1 uppercase tracking-wider">Active Users</p>
                  <p className="text-3xl font-extrabold text-white"><CountUpNumber value={1248} /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Features Section */}
      <section className="py-24 bg-gray-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Deep Data, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Simplified.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Don't just collect data. Understand it. Our platform turns complex datasets into beautiful, actionable visualizations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:bg-gray-800/80 transition-colors group">
              <div className="w-14 h-14 bg-indigo-900/50 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Metrics</h3>
              <p className="text-gray-400 leading-relaxed">Monitor your business performance exactly as it happens. Live data streaming ensures you're never acting on stale information.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:bg-gray-800/80 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="w-14 h-14 bg-purple-900/50 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                <PieChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Advanced Segmentation</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Slice and dice your lead data. Build cohorts and track conversion funnels automatically with our intelligent categorization engine.</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:bg-gray-800/80 transition-colors group">
              <div className="w-14 h-14 bg-blue-900/50 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Security</h3>
              <p className="text-gray-400 leading-relaxed">Your data is your most valuable asset. We protect it with SOC2 compliant infrastructure and end-to-end military grade encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Section with CountUp */}
      <section className="py-20 bg-indigo-950 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2"><CountUpNumber value={99} suffix="%" /></div>
            <p className="text-indigo-200 font-medium tracking-wide uppercase text-sm">System Uptime</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2"><CountUpNumber value={15} suffix="M+" /></div>
            <p className="text-indigo-200 font-medium tracking-wide uppercase text-sm">Data Points Processed</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2"><CountUpNumber value={4} suffix="K+" /></div>
            <p className="text-indigo-200 font-medium tracking-wide uppercase text-sm">Active Companies</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2"><CountUpNumber value={24} suffix="/7" /></div>
            <p className="text-indigo-200 font-medium tracking-wide uppercase text-sm">Analytics Support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
