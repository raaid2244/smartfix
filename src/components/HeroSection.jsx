import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SmartFixTitle from './SmartFixTitle';
import logo from '../assets/logo.jpg';

// Helper for the structured network line and traveling signal
const NetworkRoute = ({ d, delay, isMobile }) => {
  if (isMobile) return null; // Reduce complexity on mobile

  return (
    <g>
      {/* Base structured line (circuit trace) */}
      <motion.path
        d={d}
        fill="none"
        stroke="#1e293b"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
      />
      {/* Tiny traveling signal indicator */}
      <motion.path
        d={d}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: 1, opacity: 0 }}
        animate={{ 
          pathLength: [0, 0.05, 0], 
          pathOffset: [1, 0.5, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 3, 
          delay: delay + 0.5, 
          repeat: Infinity, 
          repeatDelay: 4,
          ease: "linear"
        }}
      />
      {/* Node/Connection point at the end */}
      <motion.circle
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 1.2 }}
        r="3"
        fill="#0f172a"
        stroke="#3b82f6"
        strokeWidth="1"
      />
    </g>
  );
};

// Helper for physical cable curves
const CurvedCable = ({ d, delay }) => {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#0f172a"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 2, delay: delay, ease: "easeInOut" }}
      style={{ filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.5))' }}
    />
  );
};

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 8; // Max 4px parallax
    const y = (clientY / window.innerHeight - 0.5) * 8;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      data-dark-hero="true" 
      className="relative w-full min-h-screen overflow-hidden bg-[#070b12] flex flex-col justify-center items-center"
    >
      
      {/* 1. Subtle Technical Grid (Loads at 100ms) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem'
        }}
      />

      {/* Structured Network / Engineering SVG Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.svg 
          viewBox="0 0 1200 800" 
          className="w-full h-full max-w-[1600px] absolute"
          preserveAspectRatio="xMidYMid slice"
          animate={{ x: mousePos.x, y: mousePos.y }} // Subtle parallax
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        >
          {/* Curved Physical Cables (Lower sections) */}
          <CurvedCable d="M 100 900 Q 250 500 500 450" delay={0.9} />
          <CurvedCable d="M 1100 900 Q 950 500 700 450" delay={1.0} />

          {/* Structured Network Routes (90-degree turns) */}
          <NetworkRoute d="M 0 550 L 300 550 L 300 400 L 450 400" delay={0.9} isMobile={isMobile} />
          <NetworkRoute d="M 1200 250 L 850 250 L 850 350 L 750 350" delay={1.1} isMobile={isMobile} />
          <NetworkRoute d="M 150 150 L 350 150 L 350 300 L 480 300" delay={1.3} isMobile={isMobile} />
          <NetworkRoute d="M 1050 650 L 750 650 L 750 450 L 680 450" delay={1.4} isMobile={isMobile} />
          
          {/* Node terminators next to the center */}
          <motion.circle cx="450" cy="400" r="3" fill="#1e293b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
          <motion.circle cx="750" cy="350" r="3" fill="#1e293b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
          <motion.circle cx="480" cy="300" r="3" fill="#1e293b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
          <motion.circle cx="680" cy="450" r="3" fill="#1e293b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        </motion.svg>
      </div>

      {/* Main Content (Centered) */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center mt-[-5vh]">
        
        {/* 2. Logo Area (Loads at 200ms) */}
        <div className="relative flex items-center justify-center">
          
          {/* Realistic Equipment Ambient Light (Loads at 500ms) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.5 }, 
              repeat: Infinity, 
              repeatType: "mirror", 
              duration: 4,
              ease: "easeInOut"
            }}
            className="absolute inset-[-40px] bg-blue-300/20 rounded-full blur-3xl pointer-events-none"
          />
          
          {/* Logo Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 flex items-center justify-center p-4 sm:p-5"
          >
            <img 
              src={logo} 
              alt="SMART FIX Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* 3. Main Title Animation (Loads at 650ms) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
          className="flex flex-col gap-2 relative z-20"
        >
          <SmartFixTitle 
            forceWhite={true}
            size="text-3xl sm:text-5xl md:text-6xl"
            useSemiBold={false}
          />
        </motion.div>
        
      </div>
    </section>
  );
}
