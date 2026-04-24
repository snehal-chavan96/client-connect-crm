import React from 'react';
import {
  FolderKanban,
  Database,
  Code2,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  LineChart,
  CheckCircle2
} from 'lucide-react';

import Button from '../../components/common/Button';

const ServicesPage = () => {

  const services = [
    {
      title: 'Advanced Data Analytics',
      description: 'Transform raw business data into meaningful insights for smarter decision-making.',
      icon: BarChart3,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-500/10",
      glow: "from-blue-500/20 to-indigo-500/5",
      dot: "bg-blue-500",
      features: [
        'Predictive analytics & forecasting',
        'Business intelligence reporting',
        'Data visualization dashboards'
      ]
    },
    {
      title: 'IT Infrastructure Solutions',
      description: 'Build secure, scalable, and high-performance IT systems for your organization.',
      icon: Server,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-500/10",
      glow: "from-purple-500/20 to-pink-500/5",
      dot: "bg-purple-500",
      features: [
        'Cloud infrastructure setup (AWS/Azure)',
        'Server management & maintenance',
        'Network security optimization'
      ]
    },
    {
      title: 'Custom Software Development',
      description: 'End-to-end software solutions engineered to your exact business requirements.',
      icon: Code2,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-100 dark:bg-indigo-500/10",
      glow: "from-indigo-500/20 to-blue-500/5",
      dot: "bg-indigo-500",
      features: [
        'Web & enterprise applications',
        'Modern MERN stack development',
        'API design & system integration'
      ]
    },
    {
      title: 'Executive Dashboards',
      description: 'Real-time interactive dashboards for monitoring KPIs and taking decisive action.',
      icon: LineChart,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
      glow: "from-emerald-500/20 to-green-500/5",
      dot: "bg-emerald-500",
      features: [
        'Live business metrics tracking',
        'Custom KPI goal setting',
        'Interactive & drill-down analytics'
      ]
    }
  ];

  const highlights = [
    {
      text: "Industry-grade security",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      text: "Scalable architecture",
      icon: Layers,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      text: "Expert engineering team",
      icon: Sparkles,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative bg-gray-50 dark:bg-[#0a0f1c] py-24 px-6 overflow-hidden flex items-center">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 font-medium mb-8 shadow-sm backdrop-blur-md">
            <Layers className="w-4 h-4 mr-2" />
            Our Offerings
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white leading-[1.1]">
            Solutions that drive <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
              real business impact
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            End-to-end technology, analytics, and software solutions designed to help ambitious businesses scale smarter and faster.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-white dark:bg-[#0a0f1c] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            {services.map((service, idx) => {
              const Icon = service.icon;

              return (
                <div
                  key={idx}
                  className="group relative rounded-[2rem] p-8 sm:p-10 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:shadow-2xl dark:hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden backdrop-blur-sm"
                >
                  {/* Dynamic Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header: Icon & Title */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${service.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${service.color}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800/60">
                      <ul className="space-y-4">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                            <div className="flex-shrink-0 mt-1.5">
                              <span className={`block w-2 h-2 rounded-full ${service.dot}`} />
                            </div>
                            <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US & CTA */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              Why Choose Devolatical?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We combine deep data intelligence, secure infrastructure practices, and modern software engineering to deliver high-performance solutions.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center bg-white dark:bg-[#111827] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.bg}`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <span className="text-gray-900 dark:text-white font-bold text-lg">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

            {/* CTA Banner */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-10 sm:p-14 shadow-2xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 blur-3xl rounded-full pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                    Ready to optimize your operations?
                    </h3>
                    <p className="text-blue-100 text-lg">
                    Get a free consultation with our engineering experts today.
                    </p>
                </div>
<a href="/contact" className="flex-shrink-0 w-full md:w-auto">
  <Button
    size="lg"
    className="
      w-full md:w-auto
      bg-white text-blue-600
      hover:bg-gray-100
      active:scale-[0.98]
      shadow-xl hover:shadow-2xl
      py-4 px-8 rounded-full
      text-lg font-bold
      border border-gray-200
      transition-all duration-300
      flex items-center justify-center
      gap-2
      !text-blue-600
    "
  >
    Request Consultation
    <ArrowRight className="w-5 h-5" />
  </Button>
</a>
                </div>
            </div>

        </div>
      </section>

    </div>
  );
};

export default ServicesPage;