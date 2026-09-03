import React from 'react';
import { Target, Eye, ShieldCheck, Compass } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import SmartFixTitle from './SmartFixTitle';
import SectionEyebrow from './SectionEyebrow';

export default function MissionVisionSection() {
  const { missionVision } = companyInfo;

  return (
    <section id="mission-vision" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5 bg-[#04060a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading Tag */}
        <div className="mb-12">
          <SectionEyebrow text="STRATEGIC DIRECTIVE" align="left" />
        </div>

        {/* Split Panel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* MISSION Card */}
          <div className="hud-box glass-panel p-8 sm:p-10 rounded-xl border border-amber-500/40 relative hover:border-amber-400 transition-all duration-500 shadow-2xl group overflow-hidden">
            {/* Animated Ambient Glow */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-700" />
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-400">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-mono text-xs text-amber-400 tracking-widest block font-semibold">
                    {missionVision.mission.label}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-sans tracking-wide">
                    {missionVision.mission.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                CORE OPERATIONAL PURPOSE
              </span>
            </div>

            <blockquote className="text-slate-100 text-lg sm:text-xl font-sans leading-relaxed relative z-10 border-l-3 border-amber-400 pl-6 py-2">
              "{missionVision.mission.quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>ENTERPRISE SAFEGUARD</span>
              </span>
              <SmartFixTitle gradient={false} size="text-xs text-cyan-400" />
            </div>
          </div>

          {/* VISION Card */}
          <div className="hud-box glass-panel-cyan p-8 sm:p-10 rounded-xl border border-cyan-500/40 relative hover:border-cyan-400 transition-all duration-500 shadow-2xl group overflow-hidden">
            {/* Animated Ambient Glow */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-700" />

            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
                  <Eye className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-mono text-xs text-cyan-400 tracking-widest block font-semibold">
                    {missionVision.vision.label}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-sans tracking-wide">
                    {missionVision.vision.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                LONG-TERM DIRECTION
              </span>
            </div>

            <blockquote className="text-slate-100 text-lg sm:text-xl font-sans leading-relaxed relative z-10 border-l-3 border-cyan-400 pl-6 py-2">
              "{missionVision.vision.quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Compass className="w-4 h-4" />
                <span>WORLD-CLASS STANDARDS</span>
              </span>
              <span className="text-amber-400 font-bold">INDIA SYSTEM INTEGRATOR</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
