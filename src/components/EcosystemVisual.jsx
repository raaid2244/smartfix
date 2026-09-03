import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Building2, Compass, Palette, Zap, Cpu, Wrench, FileText, UserCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import logo from '../assets/logo.jpg';
import SmartFixTitle from './SmartFixTitle';

const partnerIcons = [
  Building2,
  Compass,
  Palette,
  Zap,
  Cpu,
  Wrench,
  FileText,
  UserCheck,
  ShoppingBag,
];

export default function EcosystemVisual() {
  const { partners } = companyInfo.referralPartners;
  const [activePartner, setActivePartner] = useState(null);

  return (
    <div className="w-full">
      {/* Desktop Interactive Ecosystem Diagram */}
      <div className="hidden lg:block relative w-full aspect-[16/9] max-w-4xl mx-auto my-8 bg-white/80 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 shadow-2xl overflow-hidden">
        
        {/* Background Soft Mesh Glow */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-60 pointer-events-none" />

        {/* SVG Connecting Lines from Center Hub to 9 Nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450" fill="none">
          <path d="M400 225 L400 60" stroke="#00c3ff" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
          <path d="M400 225 L600 90" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L700 225" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L620 360" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L400 390" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L180 360" stroke="#00c3ff" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L100 225" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L200 90" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M400 225 L540 160" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Central Hub Node with Motion */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-56 h-56 rounded-full bg-gradient-to-tr from-cyan-400 via-amber-400 to-pink-500 p-1 shadow-2xl shadow-cyan-500/30 flex items-center justify-center text-center text-white"
        >
          <div className="w-full h-full rounded-full bg-slate-900/95 backdrop-blur-md p-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-xl mb-2 overflow-hidden" style={{background: 'linear-gradient(135deg, #f0fffe 0%, #e0f2fe 40%, #fef3c7 70%, #fce7f3 100%)'}}>
              <img 
                src={logo} 
                alt="SMART FIX SOLUTIONS" 
                className="w-full h-full object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <SmartFixTitle gradient={false} size="text-[10px] sm:text-xs text-white" className="flex-col justify-center items-center text-center my-0.5" />
            <div className="text-[9px] font-mono text-cyan-400 mt-0.5 uppercase tracking-widest font-bold">
              SYSTEM INTEGRATOR
            </div>
          </div>
        </motion.div>

        {/* 9 Surrounding Interactive Node Buttons */}
        {partners.map((partnerName, idx) => {
          const IconComponent = partnerIcons[idx % partnerIcons.length];
          const colorVariants = [
            'hover:border-cyan-400 text-cyan-600 bg-cyan-50',
            'hover:border-blue-400 text-blue-600 bg-blue-50',
            'hover:border-amber-400 text-amber-600 bg-amber-50',
            'hover:border-orange-400 text-orange-600 bg-orange-50',
            'hover:border-rose-400 text-rose-600 bg-rose-50',
            'hover:border-cyan-400 text-cyan-600 bg-cyan-50',
            'hover:border-amber-400 text-amber-600 bg-amber-50',
            'hover:border-orange-400 text-orange-600 bg-orange-50',
            'hover:border-rose-400 text-rose-600 bg-rose-50',
          ];
          const colorStyle = colorVariants[idx % colorVariants.length];

          const positions = [
            'top-6 left-1/2 -translate-x-1/2', // 0 Top Center
            'top-14 right-32',                  // 1 Top Right
            'top-1/2 right-6 -translate-y-1/2', // 2 Right
            'bottom-12 right-28',               // 3 Bottom Right
            'bottom-4 left-1/2 -translate-x-1/2',// 4 Bottom Center
            'bottom-12 left-28',                // 5 Bottom Left
            'top-1/2 left-6 -translate-y-1/2',  // 6 Left
            'top-14 left-32',                   // 7 Top Left
            'top-32 right-12',                  // 8 Mid-Top Right
          ];
          const posClass = positions[idx] || 'top-10 left-10';

          return (
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              key={idx}
              onMouseEnter={() => setActivePartner(partnerName)}
              onMouseLeave={() => setActivePartner(null)}
              className={`absolute ${posClass} z-20 cursor-pointer group`}
            >
              <div className={`bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg hover:shadow-2xl rounded-2xl px-4 py-2.5 flex items-center gap-2.5 transition-all duration-300 ${colorStyle}`}>
                <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-slate-900 group-hover:text-cyan-400 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="font-sans text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                  {partnerName}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Card Layout Fallback */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {partners.map((partnerName, idx) => {
          const IconComponent = partnerIcons[idx % partnerIcons.length];
          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:border-cyan-400 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  PARTNER 0{idx + 1}
                </div>
                <div className="font-bold text-sm text-slate-900">
                  {partnerName}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
