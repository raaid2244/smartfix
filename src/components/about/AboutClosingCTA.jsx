import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { companyInfo } from '../../data/companyData';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutClosingCTA() {
  const { contact } = companyInfo;

  // Magnetic Button Hover Physics
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 18 };
  const smoothButtonX = useSpring(buttonX, springConfig);
  const smoothButtonY = useSpring(buttonY, springConfig);

  const handleButtonMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    buttonX.set(x * 0.3);
    buttonY.set(y * 0.3);
  };

  const handleButtonMouseLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  return (
    <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden border-t border-slate-200/80">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-400/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-9 relative z-10">
        
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-cyan-700 font-mono text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-cyan-500" />
          <span>CONCLUSION OF OUR STORY</span>
        </motion.div>

        {/* Oversized Editorial Closing Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 font-sans tracking-tight leading-tight max-w-4xl mx-auto"
        >
          READY TO SECURE & CONNECT YOUR{' '}
          <span className="logo-text-gradient block mt-1 sm:mt-2">
            ENTERPRISE INFRASTRUCTURE?
          </span>
        </motion.h2>

        {/* Exact Description Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-600 font-sans text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-normal"
        >
          "{contact.description}"
        </motion.p>

        {/* Magnetic Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-6 inline-block"
        >
          <motion.div
            style={{ x: smoothButtonX, y: smoothButtonY }}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="inline-block"
          >
            <Link
              to="/expertise"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 via-amber-500 to-orange-500 hover:from-cyan-400 hover:to-indigo-600 text-white font-sans text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-500 shadow-xl shadow-cyan-500/25 overflow-hidden"
            >
              <span className="relative z-10">EXPLORE OUR EXPERTISE</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

