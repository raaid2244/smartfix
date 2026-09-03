import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import infraImage from '../../assets/fire-safety.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseInfra() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {


      // Text content entrance animation
      if (contentRef.current) {
        const revealElements = contentRef.current.querySelectorAll('.reveal-elem');
        gsap.set(revealElements, { y: '120%' });
        
        gsap.to(revealElements, {
          y: '0%', 
          duration: 1.0, 
          stagger: 0.15, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }
        
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%">
          <pattern id="infra-bg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#infra-bg-grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-12 lg:gap-16 min-h-[70vh]">
        
        {/* Right: Content */}
        <div ref={contentRef} className="w-full lg:w-[40%] xl:w-[40%] relative z-10 self-center lg:pl-10 xl:pl-16 shrink-0 flex flex-col gap-10">
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="overflow-hidden pb-1">
              <span className="reveal-elem block text-[12px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                03
              </span>
            </div>
            
            <div className="overflow-hidden pb-2">
              <h2 className="reveal-elem text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                FIRE & <span className="logo-text-gradient">SAFETY</span>
              </h2>
            </div>
          </div>

          <div className="overflow-hidden pb-2">
            <p className="reveal-elem text-lg md:text-xl text-slate-600 font-light leading-relaxed">
              Early detection, clear communication, and coordinated emergency response systems designed to protect people, facilities, and critical operations.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {[
              {
                id: "01",
                name: "FIRE ALARM SYSTEMS",
                desc: "Early detection and warning systems to protect people and assets."
              },
              {
                id: "02",
                name: "PUBLIC ADDRESS & VOICE EVACUATION",
                desc: "Clear announcements and evacuation guidance, site-wide."
              }
            ].map(item => (
              <div key={item.name} className="overflow-hidden pb-1">
                <div className="reveal-elem flex items-start gap-4">
                  <span className="text-[11px] font-mono font-bold text-slate-400 mt-1">{item.id}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-mono font-bold tracking-wider text-slate-800 uppercase mb-1">{item.name}</span>
                    <span className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left: Architectural Image */}
        <div className="w-full lg:w-[60%] xl:w-[60%] relative flex justify-center lg:justify-start py-10 lg:py-0">
          <div className="relative w-full max-w-[800px] lg:max-w-none shrink-0 mx-auto lg:mx-0 pr-0 lg:pr-8 xl:pr-12">
            <img
              src={infraImage}
              alt="IT Infrastructure"
              className="w-full h-auto rounded-[30px] shadow-2xl border border-slate-200"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
