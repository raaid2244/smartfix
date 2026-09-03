import React from 'react';
import { motion } from 'framer-motion';
import { companyInfo } from '../../data/companyData';
import { Activity, Award, Globe, Shield, Building } from 'lucide-react';

export default function InteractiveStats() {
  const { stats } = companyInfo.about;
  const heroStat = stats[0]; // 11+ Years Experience
  const remainingStats = stats.slice(1);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/20">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>METRICS & REPUTATION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-sans text-white">
              NUMBERS THAT DEFINE OUR STANDARD
            </h2>
          </div>
          <div className="text-slate-400 font-mono text-xs max-w-sm">
            Proven execution across commercial, corporate, and industrial sites in India, Singapore & Malaysia.
          </div>
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Dominant Hero Stat Card (11+ Years) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.015, y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">
                HERO METRIC // {heroStat.id}
              </span>
              <Award className="w-7 h-7 text-amber-400 group-hover:rotate-12 transition-transform" />
            </div>

            <div className="space-y-2 my-auto">
              <div className="font-mono text-7xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 tracking-tight group-hover:drop-shadow-[0_0_30px_rgba(0,195,255,0.4)] transition-all">
                {heroStat.number}
              </div>
              <div className="text-xl sm:text-3xl font-extrabold font-sans text-white uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                {heroStat.label}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between mt-8">
              <span>{heroStat.desc}</span>
              <span className="text-cyan-400 font-bold bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">100% OPERATIONAL</span>
            </div>
          </motion.div>

          {/* 3 Secondary Stat Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {remainingStats.map((stat, idx) => {
              const icons = [Globe, Shield, Building];
              const StatIcon = icons[idx % icons.length];
              const statGradients = [
                'from-amber-400 to-orange-400',
                'from-cyan-400 to-blue-400',
                'from-indigo-400 to-violet-400',
              ];

              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.025, y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  key={stat.id}
                  className="bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 rounded-3xl flex flex-col justify-between group hover:border-cyan-400/60 hover:bg-slate-800 transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-400">STAT-{stat.id}</span>
                    <StatIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="space-y-1 my-4">
                    <div className={`font-mono text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${statGradients[idx % statGradients.length]}`}>
                      {stat.number}
                    </div>
                    <div className="font-sans font-extrabold text-sm sm:text-base text-slate-100 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      {stat.label}
                    </div>
                  </div>

                  <div className="font-mono text-xs text-slate-400 pt-3 border-t border-slate-700/60">
                    {stat.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

