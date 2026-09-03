import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '../ui/card';
import SectionEyebrow from '../SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    sys: 'SYSTEM / 01',
    title: 'INTEGRATED SOLUTIONS',
    desc: 'Security, networking and infrastructure designed to work together as one system.',
    colorFrom: 'from-black'
  },
  {
    sys: 'SYSTEM / 02',
    title: 'SCALABLE DEPLOYMENT',
    desc: 'Solutions designed for individual locations and multi-site environments.',
    colorFrom: 'from-black'
  },
  {
    sys: 'SYSTEM / 03',
    title: 'RELIABLE INFRASTRUCTURE',
    desc: 'Systems engineered to support continuous business operations.',
    colorFrom: 'from-black'
  },
  {
    sys: 'SYSTEM / 04',
    title: 'PROACTIVE SUPPORT',
    desc: 'Monitoring, maintenance and technical support beyond initial installation.',
    colorFrom: 'from-black'
  }
];

export default function IndustriesWhyUs() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const listRef     = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {

      // ── Header: exact Expertise pattern ─────────────────────────
      const eyebrowLeft = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-left-line') : null;
      const eyebrowText = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-text') : null;
      const eyebrowRight = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-right-line') : null;
      
      gsap.set(eyebrowLeft, { scaleX: 0 });
      gsap.set(eyebrowText, { opacity: 0, y: 10 });
      gsap.set(eyebrowRight, { scaleX: 0 });
      gsap.set(titleLine1Ref.current, { y: '120%' });
      gsap.set(titleLine2Ref.current, { y: '120%' });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          const tl = gsap.timeline();
          if (eyebrowLeft) tl.to(eyebrowLeft, { scaleX: 1, duration: 0.6, ease: "power2.out" });
          if (eyebrowText) tl.to(eyebrowText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
          if (eyebrowRight) tl.to(eyebrowRight, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
          
          tl.to([titleLine1Ref.current, titleLine2Ref.current], {
            y: '0%', duration: 1.0, stagger: 0.1, ease: 'power4.out'
          }, '-=0.5');
        }
      });

      // ── List items: sequential staggered reveal ──────────────────
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.why-row');
        
        gsap.set(items, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out'
            });
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-white text-slate-900 relative overflow-hidden font-sans"
    >
      {/* Very faint dot grid – mirrors Expertise background treatment */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.18]">
        <svg width="100%" height="100%">
          <pattern id="why-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            <circle cx="120" cy="120" r="1" fill="#cbd5e1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#why-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        {/* ── TOP: centered heading ── */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl mb-16">
          
          {/* Eyebrow */}
          <SectionEyebrow ref={eyebrowRef} label="WHY SMART FIX" />

          {/* Heading */}
          <h2
            className="font-sans font-black uppercase tracking-tight leading-[1.0] text-4xl md:text-5xl lg:text-[3.25rem] flex flex-col items-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="overflow-hidden pb-1 block">
              <span ref={titleLine1Ref} className="block text-slate-900">
                WHY INDUSTRIES
              </span>
            </span>
            <span className="overflow-hidden pb-2 block mt-1">
              <span ref={titleLine2Ref} className="block logo-text-gradient">
                CHOOSE SMART FIX.
              </span>
            </span>
          </h2>
        </div>

        {/* ── BOTTOM: 2x2 Card Grid ── */}
        <div ref={listRef} className="w-full max-w-[1300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {reasons.map((reason, idx) => (
              <div key={idx} className="why-row group" style={{ opacity: 0 }}>
                <Card className="h-full p-8 md:p-10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl border-slate-200 bg-white relative overflow-hidden cursor-default">
                  
                  {/* Expanding color gradient circle */}
                  <div 
                    className={`absolute top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-br ${reason.colorFrom} to-transparent opacity-10 scale-100 group-hover:scale-[50] group-hover:opacity-100 origin-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0`} 
                  />

                  <div className="flex flex-col h-full relative z-10 pt-4">
                    <h3 className="text-slate-900 text-lg md:text-xl font-bold uppercase tracking-wide mb-3 transition-colors duration-500 group-hover:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {reason.title}
                    </h3>
                    
                    <p className="text-slate-500 text-base font-light leading-relaxed transition-colors duration-500 group-hover:text-white/90">
                      {reason.desc}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
