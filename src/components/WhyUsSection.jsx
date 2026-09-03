import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { SectionEyebrow } from './ui/Typography';

const ReasonCard = ({ reason, index }) => {
  const ref = useRef(null);
  
  // Track this specific card's scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 100%", "50% 50%", "100% 0%"]
  });

  // Animate opacity and scale based on scroll position
  // 0 -> start of view, 0.5 -> center of screen, 1 -> out of view
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.2, 1, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.95, 1, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  
  // Dynamic border glow
  const borderColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    ["rgba(226,232,240,0.5)", "rgba(0,195,255,0.4)", "rgba(226,232,240,0.5)"]
  );

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, y, borderColor }}
      className="relative p-10 md:p-14 lg:p-16 rounded-[2.5rem] bg-black border shadow-xl shadow-slate-200/50 overflow-hidden"
    >
      {/* Giant Background Number */}
      <div className="absolute top-4 right-6 md:right-8 text-[8rem] md:text-[14rem] font-bold text-white/10 font-mono leading-none pointer-events-none select-none tracking-tighter">
        0{index + 1}
      </div>

      <div className="relative z-10">
        <Quote className="w-10 h-10 md:w-14 md:h-14 text-cyan-500 mb-6 md:mb-8 opacity-80" fill="currentColor" />
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold text-white leading-[1.15] tracking-tight">
          {reason}
        </h3>
      </div>
    </motion.div>
  );
};

export default function WhyUsSection() {
  const reasons = companyInfo.whyChooseUs.reasons;

  return (
    <section className="bg-white relative pt-32 pb-40 border-t border-slate-100">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-100/50 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Centered Top Eyebrow */}
        <div className="flex justify-center mb-16">
          <SectionEyebrow label="WHY CHOOSE US" accentColor="bg-cyan-500" />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          {/* Left Side: Sticky Header */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-40 z-20">
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-slate-900 leading-[1.05]">
              NINE REASONS<br/>
              <span className="logo-text-gradient">CLIENTS STAY.</span>
            </h2>
            <p className="text-slate-600 mt-8 text-lg md:text-xl max-w-lg leading-relaxed">
              We don't just supply equipment. We engineer, integrate, and maintain complete enterprise ecosystems built for reliability and scale.
            </p>
          </div>

          {/* Right Side: Scrolling Cards */}
          <div className="w-full lg:w-[55%] flex flex-col gap-12 lg:gap-32 mt-12 lg:mt-0 pb-32">
            {reasons.map((reason, idx) => (
              <ReasonCard key={idx} reason={reason} index={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
