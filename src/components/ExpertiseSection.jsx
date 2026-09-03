import React, { useState, useEffect, useRef } from 'react';
import SectionEyebrow from './SectionEyebrow';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  Camera,
  Network,
  Flame,
  Volume2,
  KeyRound,
  LayoutGrid,
  Server,
  ShieldCheck,
  Wrench,
  Radio,
  Maximize2,
  X,
  CheckCircle,
  Activity
} from 'lucide-react';
import { companyInfo } from '../data/companyData';

const iconMap = {
  Camera,
  Network,
  Flame,
  Volume2,
  KeyRound,
  LayoutGrid,
  Server,
  ShieldCheck,
  Wrench,
};

export default function ExpertiseSection() {
  const { expertise } = companyInfo;
  const [selectedService, setSelectedService] = useState(null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Grid items stagger
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5 bg-[#020408]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionEyebrow text={expertise.label} align="left" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight whitespace-pre-line font-sans">
              {expertise.heading}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed border-l-2 border-cyan-500/40 pl-4 py-1">
              "{expertise.description}"
            </p>
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-cyan-400 tracking-widest">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>ALL 9 CHANNELS COMMISSIONED & READY</span>
            </div>
          </div>
        </div>

        {/* 3x3 Control Room Service Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Camera;
            const badgeStyles = [
              'bg-cyan-950/80 text-cyan-400 border-cyan-500/40',
              'bg-blue-950/80 text-blue-400 border-blue-500/40',
              'bg-amber-950/80 text-amber-400 border-amber-500/40',
              'bg-orange-950/80 text-orange-400 border-orange-500/40',
              'bg-rose-950/80 text-rose-400 border-rose-500/40',
              'bg-cyan-950/80 text-cyan-400 border-cyan-500/40',
              'bg-amber-950/80 text-amber-400 border-amber-500/40',
              'bg-orange-950/80 text-orange-400 border-orange-500/40',
              'bg-rose-950/80 text-rose-400 border-rose-500/40',
            ];
            const badgeStyle = badgeStyles[idx % badgeStyles.length];

            return (
              <div
                key={service.cam}
                onClick={() => setSelectedService(service)}
                className="hud-box glass-panel p-6 rounded-lg border border-white/10 relative cursor-pointer group hover:border-cyan-400/60 hover:bg-slate-900/80 transition-all duration-300 transform hover:-translate-y-1 shadow-xl overflow-hidden"
              >
                {/* Hover Scanline effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Feed Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded border font-mono text-xs font-bold ${badgeStyle}`}>
                      {service.cam}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                      FEED // 0{service.cam.split('-')[1]}
                    </span>
                  </div>
                  
                  {/* LIVE Indicator Pulse */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 font-mono text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE</span>
                  </div>
                </div>

                {/* Service Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:bg-cyan-950/40 text-cyan-400 transition-all duration-300">
                    <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <span className="font-mono text-[10px] text-cyan-400/80 tracking-wider block">
                      {service.resolution}
                    </span>
                  </div>
                </div>

                {/* Exact Copy Description */}
                <p className="text-slate-300 font-sans text-sm leading-relaxed mb-6">
                  "{service.description}"
                </p>

                {/* Bottom Card Action Footer */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-cyan-400" />
                    <span>SYSTEM READY</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>INSPECT FEED</span>
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Detail View when clicking a card */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
            <div className="hud-box glass-panel-cyan max-w-xl w-full p-6 sm:p-8 rounded-lg border border-cyan-500/50 relative text-left shadow-2xl">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-amber-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-mono font-bold text-xs">
                  {selectedService.cam}
                </span>
                <span className="font-mono text-xs text-cyan-400 tracking-widest">
                  TELEMETRY CONTROL // SMART FIX SOLUTIONS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-sans mb-2">
                {selectedService.title}
              </h3>
              
              <div className="p-4 rounded bg-slate-950/90 border border-white/10 mb-6">
                <p className="text-slate-200 text-base leading-relaxed font-sans">
                  "{selectedService.description}"
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">EXECUTION:</span>
                  <span className="text-amber-400">Design · Supply · Install · Test · AMC</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">COVERAGE:</span>
                  <span className="text-white">Commercial, Industrial & Enterprise Sites</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500">SERVICE STATUS:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% OPERATIONAL
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <a
                  href="#connect"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs tracking-wider"
                >
                  REQUEST {selectedService.cam} PROPOSAL
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
