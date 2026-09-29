import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function ExpertiseCoreOverview() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const descRef = useRef(null);
  
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Text Entrance Animation (plays once)
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: "120%" });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          const textTl = gsap.timeline();
          textTl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
          textTl.to([titleLine1Ref.current, titleLine2Ref.current], {
            y: "0%", duration: 1.0, stagger: 0.1, ease: 'power4.out'
          }, "-=0.5");
          textTl.to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#fdfdfd] overflow-hidden pt-16 lg:pt-24 pb-16 lg:pb-24 border-t border-b border-slate-100"
    >
      {/* Extremely Faint Premium Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.2]">
        <svg width="100%" height="100%">
          <pattern id="premium-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            <circle cx="120" cy="120" r="1" fill="#cbd5e1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#premium-grid)"/>
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-24 w-full relative z-10 flex flex-col items-center">
        
        {/* TOP SECTION: Centered Editorial Typography */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl mb-24 z-20">
          
          <div ref={eyebrowRef} className="flex items-center justify-center gap-6 mb-10 w-full">
            <span className="w-16 h-[1px] bg-blue-600"></span>
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-slate-800 uppercase">
              OUR CORE EXPERTISE
            </span>
            <span className="w-16 h-[1px] bg-blue-600"></span>
          </div>

          <h2 className="font-sans font-black uppercase tracking-tighter leading-[0.95] mb-8 text-6xl md:text-7xl lg:text-[6rem] flex flex-col items-center">
            <span className="overflow-hidden pb-1"><span ref={titleLine1Ref} className="block text-[#0a0a0a]">OUR CORE</span></span>
            <span className="overflow-hidden pb-2 mt-2"><span ref={titleLine2Ref} className="block logo-text-gradient">EXPERTISE</span></span>
          </h2>

          <div ref={descRef} className="max-w-[600px] mx-auto">
            <p className="text-[18px] lg:text-[20px] text-slate-600 font-normal leading-[1.7]">
              The foundation of a connected ecosystem. We architect resilient systems that scale securely with your enterprise demands.
            </p>
          </div>
          
        </div>



      </div>
    </section>
  );
}
