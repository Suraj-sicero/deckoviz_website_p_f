import React from 'react';
import { Code, Terminal, Cpu, Zap } from 'lucide-react';

const ToolGenerator: React.FC = () => {
  return (
    <div className="min-h-full bg-[#fafafa] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-4 animate-bounce">
            <Code className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">Generator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The ultimate developer utility for automating tool creation. 
            Define your specs, and let our AI-powered engine generate high-performance boilerplate and logic.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Terminal className="w-6 h-6" />,
              title: "CLI Integration",
              desc: "Seamlessly generate command-line interfaces with automatic argument parsing and help menus.",
              color: "violet"
            },
            {
              icon: <Cpu className="w-6 h-6" />,
              title: "Logic Engine",
              desc: "Advanced logic synthesis that transforms high-level descriptions into production-ready code.",
              color: "pink"
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Rapid Deployment",
              desc: "Push your new tools directly to the Deckoviz ecosystem with built-in CI/CD hooks.",
              color: "indigo"
            }
          ].map((feature, i) => (
            <div key={i} className="group bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className={`w-14 h-14 bg-${feature.color}-50 rounded-2xl flex items-center justify-center text-${feature.color}-600 mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center text-violet-600 font-semibold text-sm cursor-pointer hover:translate-x-2 transition-transform">
                Learn more 
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[4rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"></div>
          
          <div className="relative z-10">
            <span className="px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-bold uppercase tracking-widest mb-8 inline-block">
              Coming Soon
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Ready to revolutionize your <br className="hidden md:block" /> developer experience?
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
              The Tool Generator is currently in internal beta. We're working hard to make it available for all Deckoviz developers soon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/25">
                Request Early Access
              </button>
              <button className="w-full sm:w-auto px-12 py-5 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>© 2026 Deckoviz Developer Specs. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ToolGenerator;
