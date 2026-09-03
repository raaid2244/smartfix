import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import integrationImage from '../../assets/server-storage-panels.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseIntegration() {
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
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[70vh]">
        
        {/* Left: Content */}
        <div ref={contentRef} className="relative z-10 lg:pr-12 flex flex-col gap-10">
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="overflow-hidden pb-1">
              <span className="reveal-elem block text-[12px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                04
              </span>
            </div>
            <div className="overflow-hidden pb-2">
              <h2 className="reveal-elem text-4xl md:text-5xl lg:text-[56px] xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] uppercase whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>
                SERVER & <span className="logo-text-gradient">STORAGE</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden pb-2">
              <p className="reveal-elem text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                Infrastructure sized and configured for your workload. Enterprise server and storage infrastructure designed, configured, supplied, and deployed to support reliable business workloads.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="overflow-hidden pb-2">
              <div className="reveal-elem flex items-start gap-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 mt-1">01</span>
                <div className="flex flex-col">
                  <span className="text-sm font-mono font-bold tracking-wider text-slate-800 uppercase mb-2">SERVER & STORAGE SYSTEMS</span>
                  <span className="text-sm text-slate-500 font-light leading-relaxed">
                    Enterprise server and storage infrastructure designed, configured, supplied, and deployed to support reliable day-to-day operations and business workloads.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Integration Image */}
        <div className="relative flex justify-center items-center h-full w-full max-w-2xl lg:max-w-none mx-auto lg:ml-auto">
          <div className="relative w-full lg:w-[125%] xl:w-[140%] lg:translate-x-8 xl:translate-x-12">
            <img
              src={integrationImage}
              alt="Server & Storage Solutions"
              className="w-full h-auto rounded-[30px] shadow-2xl border border-slate-200/60"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
