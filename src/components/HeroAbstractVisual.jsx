import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';
import SmartFixTitle from './SmartFixTitle';

export default function HeroAbstractVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-4">
      {/* Background Soft Gradient Orbs with Motion */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-amber-500/15 to-pink-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/25 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl"
      />

      {/* Outer SVG Animated Concentric Ring Infrastructure Paths */}
      <svg className="absolute inset-0 w-full h-full animate-spin-slow opacity-60 pointer-events-none" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="165" stroke="url(#grad1)" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx="200" cy="200" r="125" stroke="url(#grad2)" strokeWidth="1.2" strokeDasharray="4 4" />
        <line x1="200" y1="30" x2="200" y2="370" stroke="#00c3ff" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
        <line x1="30" y1="200" x2="370" y2="200" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c3ff" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#00c3ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central Floating Orb Hub */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-[2.5rem] bg-white/95 backdrop-blur-xl border-2 border-cyan-400/50 shadow-2xl p-6 flex flex-col items-center justify-center text-center shadow-cyan-500/25 cursor-pointer"
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 mb-2 flex items-center justify-center">
          <img 
            src={logo} 
            alt="SMART FIX LOGO" 
            className="w-full h-full object-contain"
          />
        </div>
        <SmartFixTitle solutionsText="HUB" size="text-xs sm:text-sm" className="my-1 justify-center" />
        <div className="text-[10px] sm:text-xs font-mono font-bold text-cyan-600 tracking-wider uppercase mt-0.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>SYSTEM INTEGRATOR</span>
        </div>
      </motion.div>

    </div>
  );
}
