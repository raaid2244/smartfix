import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';

import { RevealGroup } from './ui/RevealGroup';
import { RevealHeading } from './ui/RevealHeading';
import SectionEyebrow from './SectionEyebrow';
import logoColorful from '../assets/logo-colorful-transparent.png';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // nothing needed here now
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingLines = [
    { text: 'BUILT ON', color: '#0f172a', isGradient: false },
    { text: 'THE GROUND,', color: '#0f172a', isGradient: false },
    { text: 'TESTED', isGradient: true },
    { text: 'INTERNATIONALLY.', isGradient: true },
  ];

  const customAboutCopy = [
    "Smart Fix Solutions is a high-performance infrastructure and systems integration firm based in Chennai, delivering enterprise-grade electronic security, optical networking, and unified communication backbones across India and Southeast Asia.",
    "With more than a decade of international project execution across Singapore, Malaysia, and India, our engineering team architects resilient, scalable digital-physical infrastructure designed to eliminate operational blind spots and ensure non-stop system continuity.",
    "From mission-critical surveillance command centers and multi-facility access management to high-capacity structured cabling and private enterprise IP networks, we engineer turnkey solutions from blueprint design to lifecycle maintenance."
  ];


  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative w-full border-b border-slate-200"
    >


      {/* ════════════════════════════════════════════
          MAIN SPLIT LAYOUT
      ════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[720px]">

        {/* ── LEFT COLUMN: Editorial Content (Light Canvas) ── */}
        <RevealGroup
          className="flex flex-col justify-between px-8 lg:px-14 xl:px-20 py-16 lg:py-20"
          style={{ backgroundColor: '#F5F4F0' }}
        >
          <div className="section-eyebrow">
            <SectionEyebrow text="WHO WE ARE" />
          </div>

          {/* Big Editorial Heading */}
          <RevealHeading
            className="font-black text-[3.2rem] leading-[0.95] tracking-tight mb-12"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            aria-label="Built on the ground. Tested internationally."
          >
            {headingLines.map((line, i) => (
              <span
                key={i}
                className={`block ${line.isGradient ? 'logo-text-gradient' : ''}`}
                style={{
                  color: line.isGradient ? undefined : line.color,
                }}
              >
                {line.text}
              </span>
            ))}
          </RevealHeading>

          {/* Unique, Non-Repeating Editorial Paragraphs */}
          <div className="space-y-5 mb-10 max-w-[540px] section-paragraph">
            {customAboutCopy.map((para, i) => (
              <p
                key={i}
                className="font-sans text-[15.5px] text-slate-600 font-medium leading-[1.75]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Standard / Philosophy Box */}
          <div className="max-w-[540px]">
            <div className="border border-slate-300/80 bg-white px-7 py-6 shadow-sm">
              <div className="flex items-start gap-5">
                {/* Vertical brand gradient bar */}
                <div
                  className="w-[4px] self-stretch rounded-full flex-shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, #00c3ff 0%, #2563eb 30%, #f59e0b 70%, #e11d48 100%)',
                  }}
                />
                <div>
                  <p className="font-sans text-[15.5px] text-slate-800 leading-[1.7] mb-3.5">
                    <span className="font-bold text-slate-900">Uncompromising Engineering Standard:</span> Systems
                    designed with zero-compromise precision, deployed with military-grade rigor, and backed by
                    comprehensive end-to-end lifecycle support.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9.5px] font-bold tracking-[0.20em] text-slate-900 uppercase">
                      SMART FIX SOLUTIONS
                    </span>
                    <span className="block w-px h-3 bg-slate-300" />
                    <span className="font-mono text-[9.5px] text-slate-500 tracking-[0.14em] uppercase">
                      Engineering Philosophy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealGroup>

        {/* ── RIGHT COLUMN: Animated Logo Panel ── */}
        <AnimatedLogoPanel />

      </div>
    </section>
  );
}

/* ── ANIMATED LOGO PANEL ── */
function AnimatedLogoPanel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden flex items-center justify-center bg-black min-h-[380px] sm:min-h-[520px]"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0f172a_0%,#000000_70%)] pointer-events-none" />

      {/* The Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Logo image with glow */}
        <motion.div
          className="relative w-36 h-36 sm:w-44 sm:h-44"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Drop shadow glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none scale-75"
            style={{ background: 'radial-gradient(circle, #00c3ff 0%, #2563eb 40%, transparent 75%)' }}
          />
          <img
            src={logoColorful}
            alt="Smart Fix Solutions Logo"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Brand name */}
        <motion.div
          className="flex flex-col items-center gap-1.5 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
            SMART FIX
          </span>
          <span
            className="font-sans text-2xl sm:text-3xl font-black tracking-tight leading-none"
            style={{ background: 'linear-gradient(90deg, #00c3ff, #2563eb, #f59e0b, #e11d48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            SOLUTIONS
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.35em] text-slate-400 uppercase mt-2">
            Enterprise Security &amp; Network
          </span>
        </motion.div>

        {/* Animated brand spectrum bar */}
        <motion.div
          className="h-[3px] rounded-full overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 160, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'linear-gradient(90deg, #00c3ff 0%, #2563eb 25%, #f59e0b 60%, #e11d48 100%)' }}
        />

        {/* Stats row */}
        <motion.div
          className="flex items-center gap-8 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1, ease: 'easeOut' }}
        >
          {[
            { value: '11+', label: 'Years' },
            { value: '3', label: 'Countries' },
            { value: '500+', label: 'Projects' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="font-sans text-xl sm:text-2xl font-black text-white leading-none">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
