import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { companyInfo } from '../../data/companyData';
import { Target, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../ui/Typography';
import { RevealGroup } from '../ui/RevealGroup';
import { RevealHeading } from '../ui/RevealHeading';

gsap.registerPlugin(ScrollTrigger);

export default function MissionVisionModern() {
  const { missionVision } = companyInfo;
  const [hoveredPanel, setHoveredPanel] = useState(null); // 'mission' | 'vision' | null
  const sectionRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {

      // Core container fade up
      if (coreRef.current) {
        gsap.fromTo(coreRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#04060a] text-white overflow-hidden py-12 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
          <RevealGroup className="flex-1">
            <div className="mb-6 section-eyebrow">
              <div className="inline-flex items-center gap-3 text-xs font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                STRATEGIC DIRECTIVES
              </div>
            </div>
            <RevealHeading className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-white">
              THE <span className="logo-text-gradient">CORE</span>
            </RevealHeading>
          </RevealGroup>
          <RevealGroup className="max-w-xl text-left md:text-right">
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed section-paragraph">
              {missionVision.intro}
            </p>
          </RevealGroup>
        </div>

        {/* Dual-Core Expanding Container */}
        <div 
          ref={coreRef}
          className="relative flex flex-col lg:flex-row w-full h-auto lg:h-[70vh] min-h-[600px] rounded-[2rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/5 bg-[#04060a] ring-1 ring-white/10 ring-inset"
          onMouseLeave={() => setHoveredPanel(null)}
        >
          
          {/* ================================================== */}
          {/* MISSION PANEL (DARK, SOLID, GROUNDED) */}
          {/* ================================================== */}
          <div
            onMouseEnter={() => setHoveredPanel('mission')}
            style={{
              flex: hoveredPanel === 'mission' ? 1.6 : hoveredPanel === 'vision' ? 0.4 : 1,
            }}
            className={`relative flex flex-col justify-between p-6 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              hoveredPanel === 'vision' ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {/* Bold Logo Theme Start Fade (CO Colors) */}
            <div 
              className={`absolute inset-0 z-0 bg-gradient-to-r from-[#00c3ff]/80 via-[#2563eb]/40 to-transparent mix-blend-screen transition-all duration-500 ${
                hoveredPanel === 'mission' ? 'opacity-100' : 'opacity-40'
              }`} 
            />

            {/* Top Content */}
            <div className="relative z-10 flex items-center lg:items-start justify-center lg:justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl lg:text-5xl font-black tracking-[0.05em] uppercase text-white drop-shadow-lg text-center lg:text-left">
                  MISSION
                </h3>
              </div>
            </div>

            <div 
              className={`relative z-10 mt-6 lg:mt-0 flex flex-col items-center lg:items-start transition-all duration-500 ease-out ${
                hoveredPanel === 'vision' ? 'opacity-30 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="w-12 h-[2px] bg-cyan-400/80 mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
              <p className="text-xl lg:text-3xl xl:text-4xl text-slate-100 font-medium leading-snug lg:leading-tight italic max-w-3xl drop-shadow-md text-center lg:text-left">
                "{missionVision.mission.quote}"
              </p>
            </div>
          </div>


          {/* ================================================== */}
          {/* VISION PANEL (LIGHT, EXPANSIVE, FORWARD-LOOKING) */}
          {/* ================================================== */}
          <div
            onMouseEnter={() => setHoveredPanel('vision')}
            style={{
              flex: hoveredPanel === 'vision' ? 1.6 : hoveredPanel === 'mission' ? 0.4 : 1,
            }}
            className={`relative flex flex-col justify-between p-6 lg:p-16 overflow-hidden cursor-pointer group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              hoveredPanel === 'mission' ? 'opacity-50' : 'opacity-100'
            }`}
          >
            {/* Bold Logo Theme End Fade (Yellow Edge, Red Middle) */}
            <div 
              className={`absolute inset-0 z-0 bg-gradient-to-l from-[#f59e0b]/80 via-[#e11d48]/60 to-transparent mix-blend-screen transition-all duration-500 ${
                hoveredPanel === 'vision' ? 'opacity-100' : 'opacity-40'
              }`} 
            />

            {/* Top Content */}
            <div className="relative z-10 flex items-center lg:items-start justify-center lg:justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl lg:text-5xl font-black tracking-[0.05em] uppercase text-white drop-shadow-lg text-center lg:text-left">
                  VISION
                </h3>
              </div>
            </div>

            <div 
              className={`relative z-10 mt-6 lg:mt-0 flex flex-col items-center lg:items-start transition-all duration-500 ease-out ${
                hoveredPanel === 'mission' ? 'opacity-30 translate-y-5' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="w-12 h-[2px] bg-orange-400/80 mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
              <p className="text-xl lg:text-3xl xl:text-4xl text-slate-100 font-medium leading-snug lg:leading-tight italic max-w-3xl drop-shadow-md text-center lg:text-left">
                "{missionVision.vision.quote}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
