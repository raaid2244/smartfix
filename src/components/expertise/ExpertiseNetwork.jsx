import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import networkImage from '../../assets/network-security-panels.jpg';

export default function ExpertiseNetwork() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const outlineRef = useRef(null);
  const videoRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Setup text content initial state
      if (contentRef.current) {
        const revealElements = contentRef.current.querySelectorAll('.reveal-elem');
        gsap.set(revealElements, { y: '120%' });
      }

      // Safe length helper
      const getLen = (ref) => (ref.current && typeof ref.current.getTotalLength === 'function') ? ref.current.getTotalLength() : 2500;
      
      const outlineLen = getLen(outlineRef);

      // Setup SVG outline for drawing
      gsap.set(outlineRef.current, { strokeDasharray: outlineLen, strokeDashoffset: outlineLen });
      
      // Video initial state
      gsap.set(videoRef.current, { opacity: 0.85, y: 15 });

      // Corners and labels
      gsap.set('.tech-label', { opacity: 0 });

      // Build GSAP timeline
      tl.current = gsap.timeline({ paused: true });

      // 0. Text entrance
      if (contentRef.current) {
        const revealElements = contentRef.current.querySelectorAll('.reveal-elem');
        tl.current.to(revealElements, {
          y: '0%', duration: 1.0, stagger: 0.1, ease: 'power4.out'
        }, 0);
      }

      // 1. Outline draws itself around video
      tl.current.to(outlineRef.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
      
      // 2 & 3 & 4. Video fades in from 0.85 to 1 and moves up 15px
      tl.current.to(videoRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4);

      tl.current.to('.tech-label', { opacity: 1, duration: 0.4 }, 0.6);

    }, sectionRef);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        tl.current?.play();
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-8 min-h-[70vh]">
        
        {/* Left: Content (approx 40%) */}
        <div ref={contentRef} className="w-full lg:w-[40%] xl:w-[45%] relative z-10 self-start lg:pt-16 flex flex-col gap-10">
          
          <div className="overflow-hidden pb-1">
            <h2 className="reveal-elem text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              NETWORK & <span className="logo-text-gradient">SECURITY</span>
            </h2>
          </div>

          <div className="overflow-hidden pb-2">
            <p className="reveal-elem text-lg md:text-xl text-slate-600 font-light leading-relaxed">
              A resilient network is the silent backbone of every modern enterprise. From secure VPN tunnels for remote monitoring to high-bandwidth wireless coverage and structured LAN layouts, our connectivity solutions ensure your data moves efficiently, securely, and without delay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            {[
              "Enterprise Networking",
              "Structured Cabling",
              "VPN & Remote Access",
              "Wireless Infrastructure"
            ].map(item => (
              <div key={item} className="overflow-hidden pb-1">
                <div className="reveal-elem flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 shrink-0" />
                  <span className="text-sm font-mono font-bold tracking-wider text-slate-800 uppercase">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Architectural Video Frame */}
        <div className="w-full lg:w-[50%] relative flex justify-center lg:justify-start py-10 lg:py-0">
          
          {/* Container stretches out to the right to create the empty space extension */}
          <div className="relative w-full max-w-[440px] lg:max-w-none lg:w-[650px] xl:w-[720px] shrink-0 mx-auto lg:mx-0">
            
            {/* HTML Overlay: Technical Label above the video */}
            <div className="absolute -top-6 right-0 flex gap-3 text-[9px] font-mono text-slate-400 tracking-widest tech-label z-10">
              <span>NETWORK / 02</span>
              <span className="text-blue-500/40">///</span>
              <span>LIVE INFRASTRUCTURE</span>
            </div>


            {/* SVG Composition */}
            <svg viewBox="-20 -20 760 560" className="w-full h-auto overflow-visible">
              <defs>
                {/* 
                  Video Shape: 720x520 (Fully fills the extended frame)
                  All Corners: 30px Radius
                */}
                <path 
                  id="video-shape" 
                  d="M 30,0 L 690,0 A 30 30 0 0 1 720 30 L 720,490 A 30 30 0 0 1 690 520 L 30,520 A 30 30 0 0 1 0 490 L 0,30 A 30 30 0 0 1 30 0 Z" 
                />
                <clipPath id="video-clip">
                  <use href="#video-shape" />
                </clipPath>
              </defs>

              {/* Video Group Masked by the custom shape */}
              <g ref={videoRef}>
                <foreignObject x="0" y="0" width="720" height="520" clipPath="url(#video-clip)">
                  <div className="w-full h-full relative overflow-hidden bg-slate-50">
                    <img
                      src={networkImage}
                      alt="Network Security Infrastructure"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                </foreignObject>
              </g>

              {/* Primary Video Outline extending around the empty space on the right */}
              <path 
                ref={outlineRef} 
                d="M 30,0 L 690,0 A 30 30 0 0 1 720 30 L 720,490 A 30 30 0 0 1 690 520 L 30,520 A 30 30 0 0 1 0 490 L 0,30 A 30 30 0 0 1 30 0 Z"
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="1.25" 
                strokeOpacity="0.9" 
              />
              
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
