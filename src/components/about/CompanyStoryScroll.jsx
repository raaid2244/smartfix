import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import SectionEyebrow from '../SectionEyebrow';
import { RevealGroup } from '../ui/RevealGroup';
import { RevealHeading } from '../ui/RevealHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../../assets/logo-colorful-transparent.png';
import worldMap from '../../assets/world-map.png';
import { Landmark, Building2, Building, PenTool, Package, Server, Activity, CheckCircle2, Globe, Database, Network, ShieldCheck } from 'lucide-react';
import chennaiPhoto from '../../assets/chennai_photo.jpg';
import klPhoto from '../../assets/kl_photo.jpg';
import singaporePhoto from '../../assets/singapore_photo.jpg';
import CardSwap, { Card } from './CardSwap';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: '01',
    tag: 'BUILT IN CHENNAI',
    location: 'Chennai HQ \u00b7 System Integrator',
    text: 'Our journey began in Chennai as a dedicated system integrator, driven by a singular vision: to architect robust, enterprise-grade security and network infrastructures that empower businesses to thrive.',
  },
  {
    id: '02',
    tag: '11+ YEARS OF EXPERIENCE',
    location: '11+ Years \u00b7 Security & Networking',
    text: "Over a decade of relentless innovation has honed our expertise. We don't just implement systems; we engineer comprehensive, end-to-end security and networking solutions tailored to modern enterprise demands.",
  },
  {
    id: '03',
    tag: 'INTERNATIONAL EXPOSURE',
    location: 'Singapore & Malaysia Projects',
    text: 'Executing complex projects across Singapore and Malaysia has not only broadened our horizon but ingrained globally recognized standards into our technical DNA and strategic approach.',
  },
  {
    id: '04',
    tag: 'ONE PARTNER, END TO END',
    location: 'Design \u00b7 Supply \u00b7 Installation \u00b7 Maintenance',
    text: 'We provide a seamless, unified experience. From initial design and procurement to meticulous installation, commissioning, and proactive maintenance, we are your single partner for total infrastructure lifecycle management.',
  },
  {
    id: '05',
    tag: 'BUILT FOR BUSINESS GROWTH',
    location: 'Secure \u00b7 Scalable \u00b7 Confident',
    text: 'We architect for tomorrow. Our focus is on deploying resilient, scalable, and future-proof infrastructures that give businesses the unwavering confidence to operate securely and grow exponentially.',
  },
];

/* ─── CUSTOM VISUAL GRAPHICS ─── */
const ChapterVisual01 = ({ isActive }) => {
  return (
    <div className="relative w-full h-48 sm:h-64 flex items-center justify-center overflow-visible bg-transparent">
      
      {/* Logo & Name Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center gap-5"
        animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
          <img 
            src={logo} 
            alt="Smart Fix Solutions" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex flex-col items-center justify-center text-center mt-2">
          <span className="font-sans text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">SMART FIX SOLUTIONS</span>
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">Enterprise Security & Network</span>
        </div>
      </motion.div>
    </div>
  );
};

const ChapterVisual02 = ({ pathLength }) => {
  const radius = 195;
  // Precise decimal circumference to avoid visual gaps at 100%
  const circumference = 1225.2211349;
  
  // Synchronized with Chapter 02 timeline trigger point (0.25):
  const strokeDashoffset = useTransform(
    pathLength,
    [0.10, 0.25],
    [circumference, 0],
    { clamp: true }
  );

  // 11 scroll animations: gradual focus/reveal
  const textOpacity = useTransform(pathLength, [0.10, 0.22], [0.3, 1]);
  const textBlur = useTransform(pathLength, [0.10, 0.22], ["blur(12px)", "blur(0px)"]);
  
  // + superscript scale/fade on completion
  const plusScale = useTransform(pathLength, [0.24, 0.25], [0.8, 1]);
  const plusOpacity = useTransform(pathLength, [0.24, 0.25], [0, 1]);

  // Glow pulse on completion
  const ringDropShadow = useTransform(
    pathLength, 
    [0.24, 0.25, 0.26], 
    ["drop-shadow(0px 0px 0px rgba(37,99,235,0))", "drop-shadow(0px 0px 15px rgba(37,99,235,0.6))", "drop-shadow(0px 0px 4px rgba(37,99,235,0.2))"]
  );

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] mx-auto flex items-center justify-center select-none -translate-y-4">
      {/* SVG Progress Ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="smartFixRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c3ff" />
            <stop offset="30%" stopColor="#2563eb" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Clean Subtle Track */}
        <circle 
          cx="220" 
          cy="220" 
          r="195" 
          fill="none" 
          stroke="#f1f5f9" 
          strokeWidth="8" 
        />
        
        {/* Scroll-Driven Dynamic Progress Ring */}
        <motion.circle 
          cx="220" 
          cy="220" 
          r="195" 
          fill="none" 
          stroke="url(#smartFixRingGradient)" 
          strokeWidth="10" 
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, filter: ringDropShadow }}
          transform="rotate(-90 220 220)"
        />
      </svg>
      
      {/* Center Content Hierarchy - Perfectly Optical Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* 11+ Unified Display Group */}
        <div className="relative flex items-center justify-center font-sans leading-none">
          <motion.span 
            className="text-[86px] sm:text-[110px] md:text-[130px] lg:text-[140px] text-slate-900 tracking-tight"
            style={{ 
              fontFamily: '"DM Serif Display", serif', 
              fontWeight: 400,
              opacity: textOpacity,
              filter: textBlur
            }}
          >
            11
          </motion.span>
          <motion.span 
            className="absolute left-full top-2 sm:top-3 md:top-4 lg:top-5 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-semibold text-orange-500 ml-1"
            style={{
              opacity: plusOpacity,
              scale: plusScale
            }}
          >
            +
          </motion.span>
        </div>
        
        {/* Accent Divider Line */}
        <div className="h-[2px] w-12 sm:w-14 md:w-16 rounded-full bg-gradient-to-r from-blue-600/30 via-sky-400/40 via-amber-400/40 to-orange-500/30 my-3 sm:my-3.5" />

        {/* YEARS Technical Label */}
        <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.6em] text-slate-400 uppercase pl-[0.6em]">
          YEARS
        </span>
      </div>
    </div>
  );
};

const ChapterVisual03 = ({ pathLength }) => {
  const targetProgress = 0.5;
  const activationPoint = targetProgress; 
  const chapterStart = 0.35;
  
  const chapterProgress = useTransform(pathLength, [chapterStart, activationPoint], [0, 1]);
  const mapOpacity = useTransform(chapterProgress, [0, 1], [0.15, 1]);

  const markers = [
    {
      id: 'chennai',
      label: 'CHENNAI',
      country: 'INDIA',
      dotLeft: '57%', dotTop: '58%',
      iconLeft: '57%', iconTop: '35%',
      textAttachedTo: 'dot',
      color: '#38BFD8',
      countryColor: '#38BFD8',
      image: chennaiPhoto
    },
    {
      id: 'kl',
      label: 'KUALA LUMPUR',
      country: 'MALAYSIA',
      dotLeft: '65%', dotTop: '62%',
      iconLeft: '80%', iconTop: '44%',
      color: '#FF7A2F',
      countryColor: '#FF7A2F',
      image: klPhoto
    },
    {
      id: 'singapore',
      label: 'SINGAPORE',
      country: 'SINGAPORE',
      dotLeft: '66.5%', dotTop: '66.5%',
      iconLeft: '83%', iconTop: '60%',
      color: '#7B61D1',
      countryColor: '#7B61D1',
      image: singaporePhoto
    }
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none bg-transparent my-10 lg:my-0 px-6 sm:px-10">
      <motion.div 
        style={{ opacity: mapOpacity }}
        className="relative w-full max-w-[850px] aspect-[15/12] flex-shrink-0 mx-auto"
      >
        {/* Dark Silhouette Regional Map */}
        <img 
          src={worldMap}
          alt="Regional Expansion" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md opacity-90"
        />
        
        {/* Animated Curved Connection Routes and Pointer Lines */}
        <svg 
          viewBox="0 0 1000 800" 
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
        >
          {/* Pointer Lines */}
          {markers.map((m) => (
            <line 
              key={`line-${m.id}`}
              x1={m.dotLeft} 
              y1={m.dotTop} 
              x2={m.iconLeft} 
              y2={m.iconTop} 
              stroke={m.color} 
              strokeWidth="1.5" 
              opacity="0.6" 
            />
          ))}

          {/* Chennai to KL curve */}
          <path id="route1" d="M 570 464 Q 610 490 650 496" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
          <circle r="4" fill="#06b6d4" opacity="0.8">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#route1"/>
            </animateMotion>
          </circle>

          {/* KL to Singapore curve */}
          <path id="route2" d="M 650 496 Q 657 514 665 532" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
          <circle r="3" fill="#FF7A2F" opacity="0.8">
            <animateMotion dur="1.5s" repeatCount="indefinite">
              <mpath href="#route2"/>
            </animateMotion>
          </circle>
        </svg>

        {/* Geographic Dots */}
        {markers.map((m) => (
          <div key={`dot-${m.id}`} className="absolute z-10 pointer-events-none" style={{ top: m.dotTop, left: m.dotLeft }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                
                {/* Center dot */}
                <div 
                  className="absolute z-10 w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                  style={{ backgroundColor: m.color }}
                />
                
                {/* Radar Rings */}
                <div className="absolute flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-full border opacity-60 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ borderColor: m.color }} />
                  <div className="absolute w-12 h-12 rounded-full border opacity-30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ borderColor: m.color, animationDelay: '0.8s' }} />
                </div>
                
                {/* Static Glow */}
                <div className="absolute w-8 h-8 rounded-full blur-md opacity-50 pointer-events-none" style={{ backgroundColor: m.color }} />

                {/* Optional Text attached to dot */}
                {m.textAttachedTo === 'dot' && (
                  <div className="absolute top-[calc(100%+16px)] -ml-3 flex flex-col items-center justify-center whitespace-nowrap">
                    <span className="font-sans text-[11px] sm:text-[12px] font-black tracking-widest text-slate-900 leading-none drop-shadow-sm">{m.label}</span>
                    {m.country && <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase mt-1.5 leading-none drop-shadow-sm" style={{ color: m.countryColor || '#64748b' }}>{m.country}</span>}
                  </div>
                )}
            </div>
          </div>
        ))}

        {/* Icon Circles and Text — hidden on mobile, shown sm+ */}
        {markers.map((m) => (
          <div key={`icon-${m.id}`} className="hidden sm:block absolute z-10 pointer-events-none" style={{ top: m.iconTop, left: m.iconLeft }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Circle Container */}
              <div 
                className="w-[85px] h-[85px] rounded-full border-[2px] p-[3px] flex items-center justify-center bg-white relative z-10"
                style={{ 
                  borderColor: m.color, 
                  boxShadow: `0 0 25px ${m.color}33, 0 8px 20px rgba(0,0,0,0.1)` 
                }}
              >
                <img src={m.image} alt={m.label} className="w-full h-full object-cover rounded-full" style={{ imageRendering: '-webkit-optimize-contrast' }} />
              </div>

              {/* Text — sm+ only, to the right */}
              {m.textAttachedTo !== 'dot' && (
                <div className="absolute left-[calc(100%+16px)] flex flex-col justify-center whitespace-nowrap items-start">
                  <span className="font-sans text-[11px] sm:text-[12px] font-black tracking-widest text-slate-900 leading-none">{m.label}</span>
                  {m.country && <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase mt-1.5 leading-none" style={{ color: m.countryColor || '#64748b' }}>{m.country}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Mobile-only location badges row */}
      <div className="sm:hidden flex items-center justify-center gap-3 mt-6 flex-wrap px-2">
        {markers.map((m) => (
          <div key={`badge-${m.id}`} className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border-2 shadow-md" style={{ borderColor: m.color }}>
            <img src={m.image} alt={m.label} className="w-8 h-8 rounded-full object-cover flex-shrink-0" style={{ border: `2px solid ${m.color}` }} />
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-black tracking-widest leading-none" style={{ color: '#0f172a' }}>{m.label}</span>
              {m.country && <span className="font-mono text-[8px] font-bold tracking-wider uppercase mt-0.5 leading-none" style={{ color: m.countryColor }}>{m.country}</span>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

const ChapterVisual04 = ({ isActive }) => {
  const steps = [
    { id: '01', title: 'DESIGN', subtitle: 'Plan & Architect', icon: PenTool, colorClass: 'text-blue-600', bgClass: 'bg-blue-50', borderClass: 'border-blue-100' },
    { id: '02', title: 'SUPPLY', subtitle: 'Global Procurement', icon: Package, colorClass: 'text-orange-600', bgClass: 'bg-orange-50', borderClass: 'border-orange-100' },
    { id: '03', title: 'INSTALL', subtitle: 'Expert Deployment', icon: Server, colorClass: 'text-purple-600', bgClass: 'bg-purple-50', borderClass: 'border-purple-100' },
    { id: '04', title: 'MAINTAIN', subtitle: '24/7 Support', icon: Activity, colorClass: 'text-amber-600', bgClass: 'bg-amber-50', borderClass: 'border-amber-100' },
  ];

  const features = [
    { title: 'Architecture & Staging', desc: 'Full-scale CAD network topologies, load balancing, and structured cable layout blueprints.' },
    { title: 'Certified Deployment', desc: 'End-to-end multi-site rollout handled exclusively by certified Tier-3 engineers.' },
    { title: 'Proactive SLA Monitoring', desc: '24/7/365 NOC surveillance with automated failover and rapid on-site spares.' },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 sm:p-8 flex flex-col gap-6">
      
      {/* 1. Top Section - 4-Step Lifecycle Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((step, i) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`flex flex-col items-center justify-center text-center p-3 rounded-xl border ${step.borderClass} ${step.bgClass} hover:shadow-md transition-all duration-300 cursor-default hover:-translate-y-1`}
          >
            <step.icon size={20} strokeWidth={2} className={`mb-2 ${step.colorClass}`} />
            <span className="font-sans text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-0.5">{step.title}</span>
            <span className="font-mono text-[7px] font-bold text-slate-500 tracking-wider uppercase leading-tight">{step.subtitle}</span>
          </motion.div>
        ))}
      </div>

      {/* 2. Middle Section - Dynamic Feature Details Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#0f172a] rounded-xl p-5 border border-slate-800 shadow-lg shadow-black/5"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-white/10 text-slate-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">STAGE DELIVERABLES</span>
          <h4 className="font-sans text-xs sm:text-sm font-bold text-white">Enterprise Infrastructure Lifecycle</h4>
        </div>
        
        <div className="flex flex-col gap-3.5">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} strokeWidth={2.5} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-sans text-[11px] sm:text-[12px] font-bold text-white block mb-0.5">{feature.title}</span>
                <span className="font-sans text-[11px] sm:text-[12px] text-slate-400 leading-snug block">{feature.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- CHAPTER 05 VISUAL — GLASSMORPHISM GROWTH CHART ---

const ChapterVisual05 = ({ pathLength }) => {
  const fallbackMotion = useMotionValue(1);
  const scrollProgress = pathLength || fallbackMotion;

  // Chart entrance animations
  const chartY = useTransform(scrollProgress, [0.7, 0.8], [60, 0], { clamp: true });
  const chartOpacity = useTransform(scrollProgress, [0.7, 0.8], [0, 1], { clamp: true });
  
  // Line drawing animation
  const lineDraw = useTransform(scrollProgress, [0.75, 0.88], [0, 1], { clamp: true });
  
  // Data points reveal
  const pt1Opacity = useTransform(scrollProgress, [0.76, 0.78], [0, 1], { clamp: true });
  const pt2Opacity = useTransform(scrollProgress, [0.80, 0.82], [0, 1], { clamp: true });
  const pt3Opacity = useTransform(scrollProgress, [0.86, 0.88], [0, 1], { clamp: true });

  return (
    <div className="relative w-full flex items-center justify-center my-8 lg:my-0" style={{ perspective: '900px' }}>
      <div className="relative w-full max-w-[460px]" style={{ height: 380 }}>
        
        <motion.div 
          style={{ y: chartY, opacity: chartOpacity }}
          className="relative w-full h-[320px] mx-auto bg-black rounded-3xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col p-7 overflow-hidden group"
        >
          {/* Grid Pattern & Orbs */}
          <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-400/20 rounded-full blur-[50px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-blue-600/15 rounded-full blur-[60px] pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <div className="font-mono text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase mb-1.5">Infrastructure Trajectory</div>
              <div className="font-sans text-xl font-black text-white tracking-tight">Exponential Scale</div>
            </div>
            <div className="flex gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative flex-1 w-full mt-4 ml-2 mb-2 pb-1 pl-1">
            
            {/* Chart Axes (X and Y) */}
            <div className="absolute inset-0 border-l-2 border-b-2 border-slate-600 pointer-events-none z-20 rounded-bl-[1px]" />
            
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-evenly">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full border-t border-white/10" />
              ))}
            </div>
            
            {/* Vertical Grid Lines */}
            <div className="absolute inset-0 flex flex-row justify-evenly">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-full border-l border-white/10" />
              ))}
            </div>

            {/* SVG Line Graph */}
            <svg className="absolute inset-0 w-full h-full overflow-visible z-10" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="growthGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00c3ff" />
                  <stop offset="35%" stopColor="#2563eb" />
                  <stop offset="65%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* The glowing trending line */}
              <motion.path
                d="M 10 180 C 80 170, 120 120, 180 110 C 260 90, 280 60, 390 10"
                fill="none"
                stroke="url(#growthGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#glow)"
                style={{ pathLength: lineDraw }}
              />

              {/* Data Points */}
              <motion.circle cx="120" cy="136" r="6" fill="#020617" stroke="#2563eb" strokeWidth="3" style={{ opacity: pt1Opacity }} />
              <motion.circle cx="250" cy="80" r="6" fill="#020617" stroke="#f59e0b" strokeWidth="3" style={{ opacity: pt2Opacity }} />
              <motion.circle cx="390" cy="10" r="8" fill="#020617" stroke="#e11d48" strokeWidth="4" style={{ opacity: pt3Opacity }} />
            </svg>

            {/* Floating Tooltips */}
            <motion.div style={{ opacity: pt1Opacity }} className="absolute left-[70px] top-[150px] bg-slate-900/90 backdrop-blur shadow-sm border border-slate-800 rounded-md px-3 py-1.5 z-20">
              <span className="font-mono text-[9px] font-bold text-blue-400 uppercase tracking-wider">Phase 1: Scale</span>
            </motion.div>

            <motion.div style={{ opacity: pt2Opacity }} className="absolute left-[180px] top-[30px] bg-slate-900/90 backdrop-blur shadow-sm border border-slate-800 rounded-md px-3 py-1.5 z-20">
              <span className="font-mono text-[9px] font-bold text-amber-400 uppercase tracking-wider">Phase 2: Resilience</span>
            </motion.div>

            <motion.div style={{ opacity: pt3Opacity }} className="absolute right-[0px] -top-[30px] bg-slate-900 shadow-xl rounded-md px-4 py-2 border border-slate-800 z-20">
              <span className="font-sans text-[11px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Future-Proof
              </span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};




const VISUALS = [ChapterVisual01, ChapterVisual02, ChapterVisual03, ChapterVisual04, ChapterVisual05];

/* ─── TIMELINE NODE ─── */
const TimelineNode = ({ chapter, index, pathLength }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { margin: "-15% 0px", once: true });
  const isNodeActive = isInView;

  const Visual = VISUALS[index];

  const isEven = index % 2 === 0;
  const colors = ['#00c3ff', '#2563eb', '#8b5cf6', '#f59e0b', '#ef4444'];
  const nodeColor = colors[index];
  
  const renderHeading = (tag) => {
    if (tag.includes('CHENNAI')) {
      const parts = tag.split('CHENNAI');
      return (
        <>
          {parts[0]}
          <span className="logo-text-gradient">CHENNAI</span>
          {parts[1]}
        </>
      );
    }
    if (tag.includes('EXPERIENCE')) {
      const parts = tag.split('EXPERIENCE');
      return (
        <>
          {parts[0]}
          <span className="logo-text-gradient">EXPERIENCE</span>
          {parts[1]}
        </>
      );
    }
    if (tag.includes('INTERNATIONAL')) {
      const parts = tag.split('INTERNATIONAL');
      return (
        <>
          {parts[0]}
          <span className="logo-text-gradient">INTERNATIONAL</span>
          {parts[1]}
        </>
      );
    }
    if (tag.includes('END TO END')) {
      const parts = tag.split(' END TO END');
      return (
        <>
          {parts[0]}<br />
          <span className="logo-text-gradient">END TO END</span>
          {parts[1]}
        </>
      );
    }
    if (tag.includes('BUSINESS GROWTH')) {
      const parts = tag.split('BUSINESS GROWTH');
      return (
        <>
          {parts[0]}<br />
          <span className="logo-text-gradient">BUSINESS GROWTH</span>
          {parts[1]}
        </>
      );
    }
    return tag;
  };

  return (
    <div ref={nodeRef} className="relative w-full flex items-center justify-center min-h-[50vh] lg:min-h-[65vh] py-16 lg:py-24">
      
      {/* Connector Node on Timeline Track */}
      <div className="absolute left-6 lg:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-20 flex items-center justify-center">
        <div 
          className="w-4 h-4 rounded-full border-2 bg-white transition-colors duration-500 shadow-sm"
          style={{ borderColor: isNodeActive ? nodeColor : '#e2e8f0' }}
        />
        <div 
          className="absolute w-1.5 h-1.5 rounded-full transition-colors duration-500"
          style={{ backgroundColor: isNodeActive ? nodeColor : 'transparent' }}
        />
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center pl-16 lg:pl-0">
        <div className={`flex flex-col ${isEven ? 'lg:items-end text-left lg:text-right lg:order-1' : 'lg:items-start text-left lg:order-2'}`}>
          <motion.div
            className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={{ 
              opacity: isNodeActive ? 1 : 0.3,
              x: isNodeActive ? 0 : (isEven ? -20 : 20)
            }}
            transition={{ duration: 0.6 }}
          >
            <RevealGroup className="flex flex-col w-full h-full">
              <div className="flex items-center gap-4 mb-5 section-eyebrow">
                {!isEven && <span className="hidden lg:block h-px w-10 bg-slate-200" />}
                <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase text-slate-400">Chapter</span>
                <span className="font-mono text-xs font-black tracking-widest text-slate-900 border border-slate-200 px-2 py-1 rounded-sm bg-slate-50 shadow-sm">
                  {chapter.id}
                </span>
                {isEven && <span className="hidden lg:block h-px w-10 bg-slate-200" />}
              </div>

              <RevealHeading className={`text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter leading-[0.95] mb-6 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                {renderHeading(chapter.tag)}
              </RevealHeading>

              <p className={`text-[15.5px] text-slate-500 font-medium leading-relaxed max-w-lg section-paragraph ${isEven ? "lg:text-right lg:ml-auto" : "lg:text-left"}`}>
                {chapter.text}
              </p>
            </RevealGroup>
          </motion.div>
        </div>

        {/* Visual Side */}
        <div className={`w-full ${index === 2 || index === 4 ? 'max-w-none lg:w-[130%] xl:w-[150%]' : 'max-w-md'} ${isEven ? 'lg:order-2' : 'lg:order-1 lg:ml-auto'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isNodeActive ? 1 : 0, y: isNodeActive ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Visual isActive={isNodeActive} pathLength={pathLength} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ─── INFRASTRUCTURE BACKGROUND ─── */
const SubtleNetworkBackground = ({ scrollYProgress }) => {
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  const bg1 = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0, 0]);
  const bg2 = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0, 1, 0, 0]);
  const bg3 = useTransform(scrollYProgress, [0.3, 0.6, 0.9, 1], [0, 0, 1, 0]);
  const bg4 = useTransform(scrollYProgress, [0.6, 0.9, 1], [0, 0, 1]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Atmospheric Glows */}
      <motion.div style={{ opacity: bg1 }} className="absolute inset-0 transition-opacity duration-500">
        <div className="absolute top-[10%] left-1/4 w-[40vw] h-[40vw] bg-cyan-400/5 rounded-full blur-[100px]" />
      </motion.div>
      <motion.div style={{ opacity: bg2 }} className="absolute inset-0 transition-opacity duration-500">
        <div className="absolute top-[30%] right-1/4 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[100px]" />
      </motion.div>
      <motion.div style={{ opacity: bg3 }} className="absolute inset-0 transition-opacity duration-500">
        <div className="absolute top-[60%] left-1/3 w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px]" />
      </motion.div>
      <motion.div style={{ opacity: bg4 }} className="absolute inset-0 transition-opacity duration-500">
        <div className="absolute bottom-[10%] right-1/3 w-[40vw] h-[40vw] bg-orange-600/5 rounded-full blur-[100px]" />
      </motion.div>

      {/* Grid Textures */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg-small" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg-small)" />
        </svg>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg-large" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#0ea5e9" strokeWidth="1" />
              <circle cx="120" cy="120" r="2" fill="#0ea5e9" />
              <circle cx="0" cy="0" r="2" fill="#0ea5e9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg-large)" />
        </svg>
      </motion.div>
      {/* Subtle fade out at the bottom to transition cleanly */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

/* ─── CUSTOM ARCHITECTURAL ICONS ─── */
const ChennaiIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-[50px] h-[50px]">
    {/* Base structure */}
    <path d="M12 52 L52 52" />
    <path d="M14 48 L50 48" />
    
    {/* Central Tower */}
    <path d="M26 48 L26 30 L38 30 L38 48" />
    <path d="M25 30 L39 30" />
    <path d="M27 30 L27 24 L37 24 L37 30" />
    <path d="M27 24 A 5 5 0 0 1 37 24" />
    <path d="M32 19 L32 14" />
    <circle cx="32" cy="13" r="1" />
    
    {/* Central Doorway */}
    <path d="M29 48 L29 38 A 3 3 0 0 1 35 38 L35 48" />
    <path d="M31 48 L31 38 A 1 1 0 0 1 33 38 L33 48" />
    
    {/* Left Tower */}
    <path d="M16 48 L16 36 L22 36 L22 48" />
    <path d="M15 36 L23 36" />
    <path d="M16 36 A 3 3 0 0 1 22 36" />
    <path d="M19 33 L19 29" />
    <circle cx="19" cy="28" r="0.5" />
    <path d="M18 44 L18 41 A 1 1 0 0 1 20 41 L20 44 Z" />
    
    {/* Right Tower */}
    <path d="M42 48 L42 36 L48 36 L48 48" />
    <path d="M41 36 L49 36" />
    <path d="M42 36 A 3 3 0 0 1 48 36" />
    <path d="M45 33 L45 29" />
    <circle cx="45" cy="28" r="0.5" />
    <path d="M44 44 L44 41 A 1 1 0 0 1 46 41 L46 44 Z" />
    
    {/* Connecting Walls */}
    <path d="M22 42 L26 42" />
    <path d="M38 42 L42 42" />
    <path d="M23 45 L25 45" />
    <path d="M39 45 L41 45" />
  </svg>
);

const KLIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[34px] h-[34px]">
    <path d="M14 56h36" />
    <path d="M20 56 V30 H22 V18 L24 12 L26 18 V30 H28 V56" />
    <path d="M24 12 V4" />
    <path d="M36 56 V30 H38 V18 L40 12 L42 18 V30 H44 V56" />
    <path d="M40 12 V4" />
    <path d="M28 38h8 M28 34h8 M32 38v18" />
    <path d="M22 56V30 M26 56V30" />
    <path d="M38 56V30 M42 56V30" />
    <path d="M24 18v12 M40 18v12" />
  </svg>
);

const SingaporeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[34px] h-[34px]">
    <path d="M10 56h44" />
    <path d="M16 56 V28 H24 V56" />
    <path d="M20 56 V28" />
    <path d="M28 56 V28 H36 V56" />
    <path d="M32 56 V28" />
    <path d="M40 56 V28 H48 V56" />
    <path d="M44 56 V28" />
    <path d="M12 28 C28 32 44 28 54 22 L54 18 C44 24 28 28 12 24 Z" />
    <path d="M16 48h8 M28 48h8 M40 48h8" />
    <path d="M16 38h8 M28 38h8 M40 38h8" />
  </svg>
);

/* ─── MAIN EXPORT ─── */
export default function CompanyStoryScroll() {
  const containerRef = useRef(null);
  
  // Track scroll specifically for the timeline section (after the header)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth the drawing of the central vertical line
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[500vh] bg-white overflow-hidden"
      aria-label="Our Story and Philosophy"
    >
      {/* TOP HEADER - Static */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12 sm:pb-24 text-center relative z-10 bg-white">
        <SectionEyebrow text="EDITORIAL STORYLINE" align="center" />

        <h2
          className="font-sans font-extrabold tracking-tight leading-[1.02] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          <span className="text-slate-900">OUR </span>
          <span className="logo-text-gradient">STORY</span>
          <span className="text-slate-900"> &amp; PHILOSOPHY</span>
        </h2>
        
        <p className="text-slate-600 font-sans text-[15.5px] leading-relaxed font-normal mx-auto max-w-2xl">
          Five chapters that define how we build and the standard we hold ourselves to.
        </p>
      </div>

      {/* VERTICAL TIMELINE CONTAINER */}
      <div ref={containerRef} className="relative w-full">
        <SubtleNetworkBackground scrollYProgress={scrollYProgress} />
        
        <div className="relative max-w-7xl mx-auto px-0 sm:px-10 lg:px-16 pb-32">
          
          {/* The Static Central Track Line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 z-10" />
          
          {/* The Animated Progress Line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 z-10">
            {/* The full static coloured gradient based on logo theme */}
            <div 
              className="absolute inset-0 w-full h-full rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              style={{ background: 'linear-gradient(to bottom, #00c3ff 0%, #2563eb 25%, #8b5cf6 50%, #f59e0b 75%, #ef4444 100%)' }}
            />
            {/* The white masking overlay that shrinks to reveal the gradient from top to bottom */}
            <motion.div 
              style={{ 
                scaleY: useTransform(pathLength, [0, 1], [1, 0]),
              }}
              className="absolute inset-0 w-full h-full bg-slate-200 origin-bottom rounded-full"
            />
          </div>

          {/* Render Timeline Chapters */}
          <div className="relative z-20">
            {CHAPTERS.map((ch, i) => (
              <TimelineNode 
                key={ch.id} 
                chapter={ch} 
                index={i} 
                pathLength={pathLength} 
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}