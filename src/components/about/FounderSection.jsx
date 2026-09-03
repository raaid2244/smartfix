import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { companyInfo } from '../../data/companyData';
import founderImg from '../../assets/founder.png';

export default function FounderSection() {
  const { founderCard } = companyInfo;
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Subtle scroll parallax for the image (~8px)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-8, 8]
  );

  // Restrained, coordinated editorial entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="bg-white border-t border-slate-100 relative overflow-hidden"
      style={{ scrollMarginTop: '88px' }}
    >
      <div
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
        style={{
          paddingTop: '0.75rem',
          paddingBottom: 'clamp(3.5rem, 5.5vw, 5rem)',
        }}
      >
        {/* Mobile Header: Visible only on smaller screens for proper sequential flow */}
        <div className="block lg:hidden mb-8">
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight leading-[1.06]">
            <span className="block text-slate-900">THE MAN</span>
            <span className="block logo-text-gradient">BEHIND THE</span>
            <span className="block text-slate-900">SYSTEM.</span>
          </h2>
        </div>

        {/*
         * 2-COLUMN ASYMMETRIC EDITORIAL GRID (Large Hero Image)
         * Left: ~58% (Large Portrait + Caption) | Right: ~42% (Leadership Content)
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* ═══════ LEFT COLUMN: Large Hero Portrait + Caption Directly Below (col-span-7) ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start w-full"
          >
            {/* Unified Frame: Image + Caption in single card */}
            <div
              className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] border border-slate-200/80 bg-white"
            >
              {/* Portrait — fills the frame */}
              <div className="relative w-full" style={{ aspectRatio: '4 / 4.1' }}>
                <motion.img
                  style={{ y: imageY }}
                  src={founderImg}
                  alt={founderCard?.name ?? 'Vinoth Kumar V — Founder & Managing Director'}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>

              {/* Caption strip — inside the same frame, below the image */}
              <div
                className="px-6 py-5 border-t border-slate-100"
                style={{ background: '#ffffff' }}
              >
                <h3 className="text-2xl sm:text-3xl font-montserrat font-black tracking-[0.03em] text-slate-900 leading-tight">
                  VINOTH KUMAR V
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-900 font-bold">
                  <span>FOUNDER &amp; MANAGING DIRECTOR</span>
                </p>
              </div>
            </div>
          </motion.div>


          {/* ═══════ RIGHT COLUMN: Section Title · Heading · Highlighted Founder Speech · Credentials (col-span-5) ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-start h-full gap-3"
          >

            {/* Desktop Header: Visible only on lg+ */}
            <div className="hidden lg:block text-left">

              {/* 2 — Main Editorial Heading */}
              <h2 className="text-3xl lg:text-[2.65rem] xl:text-[2.9rem] font-black font-sans tracking-tight leading-[1.06]">
                <span className="block text-slate-900">THE MAN</span>
                <span className="block logo-text-gradient">BEHIND THE</span>
                <span className="block text-slate-900">SYSTEM.</span>
              </h2>
            </div>

            {/* 3 — Founder's Statement — Premium Editorial Panel */}
            <div className="relative rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)]" style={{ background: '#000000' }}>

              {/* Subtle top-right glow accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #00c3ff 0%, transparent 70%)' }} />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />

              <div className="relative p-6 sm:p-8 pt-5 sm:pt-6 pb-8 sm:pb-9 text-left">

                {/* Large decorative open-quote — bold, elegant, logo spectrum */}
                <div
                  className="font-serif leading-none font-black select-none mt-0 -mb-6 -ml-2.5"
                  style={{
                    fontSize: '5.5rem',
                    lineHeight: 0.65,
                    background: 'linear-gradient(135deg, #00c3ff 0%, #2563eb 35%, #f59e0b 70%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.04em',
                  }}
                >
                  &ldquo;
                </div>

                <div className="space-y-4 sm:space-y-4.5">

                  {/* Statement 1 — Introduction (Uniform Bright White) */}
                  <p className="font-sans text-base sm:text-[1.05rem] lg:text-[1.1rem] leading-relaxed text-white font-semibold">
                    I am Vinoth Kumar V, Founder and Managing Director of Smart Fix Solutions, a Chennai-based company specialising in enterprise security and network infrastructure solutions.
                  </p>

                  {/* Statement 2 — Experience */}
                  <p className="font-sans text-sm sm:text-base lg:text-[0.98rem] leading-relaxed text-white font-normal">
                    With over 11 years of professional experience, including international exposure in Singapore and Malaysia, I&apos;ve developed expertise in designing, implementing and maintaining reliable security and networking systems for businesses of every size.
                  </p>

                  {/* Statement 3 — Philosophy: Existing Founder Quote */}
                  <div
                    className="mt-5 sm:mt-6 rounded-xl p-5 sm:p-6"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,195,255,0.15) 0%, rgba(37,99,235,0.12) 50%, rgba(245,158,11,0.10) 100%)',
                      border: '1px solid rgba(0,195,255,0.22)',
                    }}
                  >
                    <blockquote className="font-sans italic font-semibold text-white text-base sm:text-lg lg:text-[1.05rem] leading-relaxed">
                      &ldquo;Every business deserves a secure, scalable, future-ready infrastructure that supports growth and operational excellence &mdash; that&rsquo;s the standard we build to.&rdquo;
                    </blockquote>
                  </div>

                </div>
              </div>
            </div>

            {/* 4 — Experience Credentials Row */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-7 sm:gap-9">
              {/* 11+ Years */}
              <div className="flex-shrink-0">
                <div className="font-black font-mono leading-none text-slate-900 text-3xl sm:text-[2.2rem]">
                  11+
                </div>
                <div className="mt-1 text-[10px] font-mono font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  Years Experience
                </div>
              </div>

              {/* Thin Vertical Rule */}
              <div className="h-8 w-px bg-slate-200 flex-shrink-0" />

              {/* International Scope */}
              <div>
                <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.12em] text-slate-800 uppercase">
                  Singapore &amp; Malaysia
                </div>
                <div className="mt-0.5 text-[10px] font-mono tracking-[0.16em] text-slate-400 uppercase">
                  International Exposure
                </div>
              </div>
            </div>

          </motion.div>
          {/* end right column */}

        </div>

      </div>
    </section>
  );
}
