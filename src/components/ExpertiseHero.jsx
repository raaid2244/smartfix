import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseHero() {
  const sectionRef = useRef(null);
  
  // Left column refs
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const subRef = useRef(null);
  const decorationRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. LEFT TEXT ENTRANCE ANIMATION
      // ----------------------------------------------------
      gsap.set([titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current], { y: "120%" });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
      gsap.set(subRef.current, { opacity: 0, y: 20 });
      gsap.set(decorationRef.current, { scaleX: 0, transformOrigin: "left center" });

      const textTl = gsap.timeline({ delay: 0.1 });

      textTl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      textTl.to([titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current], {
        y: "0%", duration: 1.2, stagger: 0.15, ease: 'power4.out'
      }, "-=0.4");
      textTl.to(subRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6");
      textTl.to(decorationRef.current, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-black overflow-hidden text-white min-h-screen flex items-center justify-center pt-24 pb-12"
    >
      
      {/* Premium dark ambient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col justify-center h-full">
        
        {/* We use a grid layout to push the text to the left like the previous implementation, but leave the right side empty */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center text-left">
            
            <div ref={eyebrowRef} className="flex items-center gap-4 mb-8 xl:mb-10 w-full justify-start">
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-slate-400 uppercase">
                01 / EXPERTISE
              </span>
              <span ref={decorationRef} className="w-16 h-[1px] bg-blue-500"></span>
            </div>

            <h1 className="font-sans font-black uppercase tracking-tight leading-[0.9] flex flex-col gap-1 mb-10 xl:mb-12 w-full text-left">
              <div className="overflow-hidden pb-3 w-full">
                <div ref={titleLine1Ref} className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.5rem] w-full">
                  EXPERTISE
                </div>
              </div>
              <div className="overflow-hidden pb-3 w-full">
                <div ref={titleLine2Ref} className="logo-text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.5rem] w-full">
                  BUILT AROUND
                </div>
              </div>
              <div className="overflow-hidden pb-3 w-full">
                <div ref={titleLine3Ref} className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.5rem] w-full">
                  YOUR SUCCESS
                </div>
              </div>
            </h1>

            <div ref={subRef} className="max-w-2xl border-l-2 border-blue-500 pl-6 xl:pl-8 ml-1 text-left">
              <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                Complete design, supply, installation, testing, commissioning and maintenance — end to end, under one roof. We build the technological backbone that modern enterprises rely on.
              </p>
            </div>

          </div>

          {/* The right column is empty now, which keeps the text constrained to the left like the previous layout */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5"></div>

        </div>

      </div>
    </section>
  );
}
