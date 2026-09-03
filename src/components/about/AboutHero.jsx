import React from 'react';
import { motion } from 'framer-motion';
import { companyInfo } from '../../data/companyData';
import SmartFixTitle from '../SmartFixTitle';
import { ArrowDown } from 'lucide-react';

export default function AboutHero() {
  const { about } = companyInfo;

  return (
    <section 
      className="relative min-h-[85vh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 overflow-hidden border-b border-slate-100"
    >
      {/* Editorial Watermark Text Background (Static) */}
      <div 
        className="absolute top-16 sm:top-20 lg:top-16 right-6 lg:right-16 font-sans font-black text-[10vw] lg:text-[12vw] leading-[0.85] text-slate-200/70 select-none pointer-events-none tracking-tighter text-right z-0"
      >
        <div>SMART</div>
        <div>FIX</div>
      </div>

      {/* Subtle Ambient Ambient Orbs */}
      <div className="absolute top-1/3 right-12 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-12 left-12 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-400/10 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto pt-6">
        
        {/* Editorial Header Tag — unboxed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <SmartFixTitle size="text-xs sm:text-sm font-mono tracking-wider" gradient={true} fixText="ABOUT SMART FIX" solutionsText="SOLUTIONS" />
        </motion.div>

        {/* Oversized Luxury Typography Moment */}
        <div className="space-y-3 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans tracking-tight leading-[1.02]"
          >
            <span className="block">
              <span className="text-slate-900">BUILT ON THE </span>
              <span className="logo-text-gradient">GROUND</span>
            </span>
            <span className="block mt-1 sm:mt-2">
              <span className="logo-text-gradient">TESTED </span>
              <span className="text-slate-900">INTERNATIONALLY</span>
            </span>
          </motion.h1>
        </div>

        {/* Subtitle Description */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 pt-8 border-t border-slate-200/80 flex items-start gap-4 max-w-4xl"
        >
          <div className="w-1.5 h-16 rounded-full bg-gradient-to-b from-cyan-500 via-blue-600 to-indigo-600 flex-shrink-0 mt-1" />
          <p className="text-slate-700 font-sans text-lg sm:text-xl lg:text-2xl leading-relaxed font-normal">
            Smart Fix Solutions is a Chennai-based system integrator designing, installing and maintaining the security and network infrastructure that lets businesses operate safely, efficiently and confidently.
          </p>
        </motion.div>

      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between font-mono text-xs text-slate-400 border-t border-slate-100"
      >
        <span className="tracking-widest uppercase text-[11px] text-slate-400">EDITORIAL ARCHIVE // {new Date().getFullYear()}</span>
        <div className="flex items-center gap-2 text-cyan-600 font-semibold tracking-wider animate-bounce">
          <span>SCROLL TO EXPLORE STORY</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </motion.div>

    </section>
  );
}

