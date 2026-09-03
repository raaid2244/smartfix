import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../../data/companyData';
import { Target, Eye, Sparkles, ChevronDown } from 'lucide-react';

export default function MissionVisionInteractive() {
  const { missionVision } = companyInfo;
  const [activePanel, setActivePanel] = useState('mission'); // 'mission' | 'vision'

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-slate-50/70 to-white border-t border-slate-100 relative overflow-hidden">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STRATEGIC DIRECTIVES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-sans tracking-tight leading-none">
            MISSION & VISION
          </h2>

          <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            Hover or tap to expand our strategic directives and guiding operational standards.
          </p>
        </div>

        {/* Desktop Interactive Split-Screen Expandable Panels */}
        <div className="hidden lg:flex gap-8 min-h-[420px] items-stretch">
          
          {/* Mission Panel */}
          <motion.div
            onClick={() => setActivePanel('mission')}
            onMouseEnter={() => setActivePanel('mission')}
            animate={{
              flex: activePanel === 'mission' ? 1.85 : 1,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className={`p-10 sm:p-12 rounded-3xl border transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              activePanel === 'mission'
                ? 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/30 border-amber-400 shadow-2xl shadow-amber-500/10'
                : 'bg-white border-slate-200/80 opacity-70 hover:opacity-95 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 ${activePanel === 'mission' ? 'bg-amber-500 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700'}`}>
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block">
                    {missionVision.mission.label}
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 font-sans">
                    {missionVision.mission.title}
                  </h3>
                </div>
              </div>

              <span className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full transition-colors ${activePanel === 'mission' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'}`}>
                {activePanel === 'mission' ? 'ACTIVE VIEW' : 'EXPAND'}
              </span>
            </div>

            <blockquote className="text-slate-800 text-lg lg:text-xl font-sans leading-relaxed border-l-4 border-amber-400 pl-6 py-2 my-auto font-normal">
              "{missionVision.mission.quote}"
            </blockquote>

            <div className="pt-6 border-t border-slate-200/60 font-mono text-xs text-slate-400 flex items-center justify-between mt-6">
              <span>CORE PURPOSE & SERVICE STANDARD</span>
              <span className="text-amber-600 font-bold">SMART FIX SOLUTIONS</span>
            </div>
          </motion.div>

          {/* Vision Panel */}
          <motion.div
            onClick={() => setActivePanel('vision')}
            onMouseEnter={() => setActivePanel('vision')}
            animate={{
              flex: activePanel === 'vision' ? 1.85 : 1,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className={`p-10 sm:p-12 rounded-3xl border transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              activePanel === 'vision'
                ? 'bg-gradient-to-br from-cyan-50/90 via-white to-cyan-50/30 border-cyan-400 shadow-2xl shadow-cyan-500/10'
                : 'bg-white border-slate-200/80 opacity-70 hover:opacity-95 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl transition-all duration-300 ${activePanel === 'vision' ? 'bg-cyan-500 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700'}`}>
                  <Eye className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-widest block">
                    {missionVision.vision.label}
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 font-sans">
                    {missionVision.vision.title}
                  </h3>
                </div>
              </div>

              <span className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-full transition-colors ${activePanel === 'vision' ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' : 'bg-slate-100 text-slate-600'}`}>
                {activePanel === 'vision' ? 'ACTIVE VIEW' : 'EXPAND'}
              </span>
            </div>

            <blockquote className="text-slate-800 text-lg lg:text-xl font-sans leading-relaxed border-l-4 border-cyan-400 pl-6 py-2 my-auto font-normal">
              "{missionVision.vision.quote}"
            </blockquote>

            <div className="pt-6 border-t border-slate-200/60 font-mono text-xs text-slate-400 flex items-center justify-between mt-6">
              <span>LONG-TERM INDUSTRY GOAL</span>
              <span className="text-cyan-600 font-bold">INDIA SYSTEM INTEGRATOR</span>
            </div>
          </motion.div>

        </div>

        {/* Mobile Expandable Accordion Cards Layout */}
        <div className="lg:hidden space-y-4">
          
          {/* Mobile Mission Accordion */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <button
              onClick={() => setActivePanel(activePanel === 'mission' ? null : 'mission')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-sans">
                  {missionVision.mission.title}
                </h3>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activePanel === 'mission' ? 'rotate-180 text-amber-600' : ''}`} />
            </button>

            {activePanel === 'mission' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3 border-t border-slate-100 space-y-3"
              >
                <blockquote className="text-slate-700 text-base leading-relaxed border-l-4 border-amber-400 pl-4 py-1 font-normal">
                  "{missionVision.mission.quote}"
                </blockquote>
              </motion.div>
            )}
          </div>

          {/* Mobile Vision Accordion */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <button
              onClick={() => setActivePanel(activePanel === 'vision' ? null : 'vision')}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-sans">
                  {missionVision.vision.title}
                </h3>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activePanel === 'vision' ? 'rotate-180 text-cyan-600' : ''}`} />
            </button>

            {activePanel === 'vision' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-3 border-t border-slate-100 space-y-3"
              >
                <blockquote className="text-slate-700 text-base leading-relaxed border-l-4 border-cyan-400 pl-4 py-1 font-normal">
                  "{missionVision.vision.quote}"
                </blockquote>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

