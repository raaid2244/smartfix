import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersHero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  
  // Text refs
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subRef = useRef(null);
  const decorationRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. INITIAL SET STATES
      // ----------------------------------------------------
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: "120%" });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
      gsap.set(subRef.current, { opacity: 0, y: 20 });
      gsap.set(decorationRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(imageRef.current, { scale: 1.03 });

      // ----------------------------------------------------
      // 2. ENTRANCE TIMELINE
      // ----------------------------------------------------
      const tl = gsap.timeline({ delay: 0.1 });

      // Subtle scale-down of the background image
      tl.to(imageRef.current, { scale: 1, duration: 2.5, ease: 'power2.out' }, 0);

      // Eyebrow fades in and moves upward
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2);
      
      // Decoration line expands
      tl.to(decorationRef.current, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 0.2);

      // Heading reveals line by line
      tl.to([titleLine1Ref.current, titleLine2Ref.current], {
        y: "0%", duration: 1.2, stagger: 0.15, ease: 'power4.out'
      }, 0.5);

      // Paragraph fades upward with a slight delay
      tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.8);

      // ----------------------------------------------------
      // 3. PARALLAX ON SCROLL
      // ----------------------------------------------------
      gsap.to(imageRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-slate-900 overflow-hidden text-white min-h-[80vh] lg:min-h-screen flex items-center justify-center pt-24 pb-12"
    >
      
      {/* ── BACKGROUND IMAGE & OVERLAYS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Container for parallax image to ensure bounds */}
        <div className="absolute inset-[-15%] w-[130%] h-[130%]">
          <img 
            ref={imageRef}
            src="/partners-collaboration-bg.jpg" 
            alt="Enterprise Professionals Collaborating"
            className="w-full h-full object-cover object-right lg:object-center origin-center opacity-80"
          />
        </div>
        
        {/* Mobile: lighter overlay so image is visible; Desktop: strong left fade for text column */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent lg:from-slate-950 lg:via-slate-900/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col justify-center h-full">
        
        {/* Grid layout pushing text strictly to the left side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center text-left">
            
            {/* EYEBROW */}
            <div ref={eyebrowRef} className="flex items-center gap-4 mb-8 xl:mb-10 w-full justify-start">
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-slate-400 uppercase">
                IDEAL REFERRAL PARTNERS
              </span>
              <span ref={decorationRef} className="w-16 h-[1px] bg-blue-500"></span>
            </div>

            {/* MAIN HEADING */}
            <h1 className="font-sans font-black uppercase tracking-tight leading-[0.9] flex flex-col gap-1 mb-10 xl:mb-12 w-full text-left">
              <div className="overflow-hidden pb-3 w-full">
                <div ref={titleLine1Ref} className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.5rem] w-full">
                  WHO WE WORK
                </div>
              </div>
              <div className="overflow-hidden pb-3 w-full">
                <div ref={titleLine2Ref} className="logo-text-gradient text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.5rem] w-full">
                  ALONGSIDE.
                </div>
              </div>
            </h1>

            {/* PARAGRAPH */}
            <div ref={subRef} className="max-w-2xl border-l-2 border-blue-500 pl-6 xl:pl-8 ml-1 text-left">
              <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                We collaborate with trusted professionals to deliver secure, connected solutions for complex projects.
              </p>
            </div>

          </div>

          {/* Right column empty for visual focus on background photography */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5"></div>

        </div>

      </div>
    </section>
  );
}
