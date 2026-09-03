import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { RevealGroup } from './ui/RevealGroup';
import { RevealHeading } from './ui/RevealHeading';
import SectionEyebrow from './SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {

      // Right column blocks stagger
      if (rightContentRef.current) {
        const targets = gsap.utils.toArray(rightContentRef.current.children);
        gsap.fromTo(targets,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%'
            }
          }
        );
      }
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

  const domains = [
    {
      num: '01',
      name: 'PHYSICAL SECURITY',
      color: '#00c3ff',
      tag: 'CORE DEFENSE',
      items: [
        'AI-Powered CCTV Surveillance & Analytics',
        'Enterprise Biometric & Smart Access Control',
        'Addressable Fire Alarm & Life Safety Systems',
        'Public Address & Voice Evacuation Networks',
      ],
    },
    {
      num: '02',
      name: 'NETWORK INFRASTRUCTURE',
      color: '#f59e0b',
      tag: 'CONNECTIVITY',
      items: [
        'High-Density Enterprise LAN, WAN & Fiber Optics',
        'Seamless Campus-Wide Wi-Fi & Wireless Backhauls',
        'Encrypted Site-to-Site VPN & Zero-Trust Access',
        'Unified IP Telephony & Voice Communication',
      ],
    },
    {
      num: '03',
      name: 'SYSTEM INTEGRATION',
      color: '#f97316',
      tag: 'LIFECYCLE',
      items: [
        'Architectural System Design & Technical Documentation',
        'Turnkey Equipment Supply & Precision Installation',
        'Rigorous Testing, Multi-Point Commissioning & Sign-off',
        '24/7 SLA-Backed AMC & Preventive Maintenance',
      ],
    },
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

        {/* ── RIGHT COLUMN: Pure Black Large Content Panel (No Grid) ── */}
        <div
          ref={rightContentRef}
          className="relative overflow-hidden flex flex-col justify-between bg-black text-white p-8 sm:p-12 lg:p-14"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Subtle Accent Corner Lines */}
          <span className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-60 pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-orange-500 opacity-60 pointer-events-none" />

          {/* ── Panel Header ── */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div>
              <div className="font-mono text-[11px] font-bold text-neutral-400 tracking-[0.25em] uppercase mb-1">
                SYSTEM ARCHITECTURE
              </div>
              <div className="font-display text-xl sm:text-2xl font-black text-white tracking-wider">
                SFS-INFRASTRUCTURE
              </div>
            </div>
          </div>

          {/* ── Three Large Domain Blocks ── */}
          <div className="space-y-7 my-8">
            {domains.map((domain, i) => (
              <div
                key={i}
                className="group border-b border-neutral-800/80 pb-7 last:border-b-0 last:pb-0"
              >
                {/* Domain Title & Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-sm sm:text-base font-black tracking-widest"
                      style={{ color: domain.color }}
                    >
                      {domain.num}
                    </span>
                    <span className="block w-2.5 h-px bg-neutral-700" />
                    <h3
                      className="font-display text-base sm:text-lg font-black tracking-[0.10em] uppercase text-white group-hover:text-cyan-300 transition-colors duration-300"
                    >
                      {domain.name}
                    </h3>
                  </div>
                </div>

                {/* Large Service Items List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pl-6 sm:pl-7">
                  {domain.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span
                        className="block w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                        style={{ backgroundColor: domain.color }}
                      />
                      <span className="font-sans text-[15.5px] text-neutral-300 font-medium leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Large Location & Global Reach Footer ── */}
          <div className="border-t border-neutral-800 pt-7">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="font-mono text-[10px] font-bold text-neutral-400 tracking-[0.22em] uppercase mb-1">
                  HEADQUARTERS
                </div>
                <div className="font-mono text-sm sm:text-[15px] font-bold text-white tracking-wide">
                  ANNA NAGAR · CHENNAI · INDIA
                </div>
                <div className="font-mono text-[11px] text-neutral-500 tracking-widest mt-0.5">
                  LAT 13.08° N · LON 80.27° E
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] font-bold text-neutral-400 tracking-[0.22em] uppercase mb-1">
                  GLOBAL REACH
                </div>
                <div className="font-mono text-lg sm:text-2xl font-black text-white tracking-widest">
                  IN · SG · MY
                </div>
              </div>
            </div>

            {/* Brand Spectrum Bar */}
            <div className="h-[4px] w-full rounded-full overflow-hidden">
              <div
                className="h-full w-full"
                style={{
                  background: 'linear-gradient(90deg, #00c3ff 0%, #2563eb 25%, #f59e0b 50%, #f97316 75%, #e11d48 100%)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
