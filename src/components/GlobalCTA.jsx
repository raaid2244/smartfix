import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function GlobalCTA() {
  const location = useLocation();
  if (location.pathname === '/contact') return null;

  return (
    <section className="relative py-48 lg:py-64 px-6 lg:px-8 bg-black overflow-hidden border-t border-white/5 border-b border-cyan-900/30 flex flex-col justify-center">
      
      {/* Techy Background Grid & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent blur-[100px] pointer-events-none rounded-full" />
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-cyan-500/20 rounded-tl-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-blue-500/20 rounded-br-3xl opacity-50" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
          <span className="font-mono text-[11px] font-bold text-cyan-400 tracking-[0.3em] uppercase">GET IN TOUCH</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-8 font-sans">
          Ready to secure your<br className="hidden sm:block" /> <span className="logo-text-gradient">business operations?</span>
        </h2>
        
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-sans font-medium">
          Join the forward-thinking enterprises that trust Smart Fix Solutions for their mission-critical infrastructure and zero-trust security.
        </p>
        
        <Link
          to="/contact"
          className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-bold text-[13px] tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
        >
          <span className="relative z-10">CONTACT OUR TEAM</span>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
            <ArrowRight className="w-4 h-4 text-slate-900 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  );
}
