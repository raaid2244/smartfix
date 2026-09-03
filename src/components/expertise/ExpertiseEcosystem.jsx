import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseEcosystem() {
  const sectionRef = useRef(null);
  
  // Elements to animate
  const sys1 = useRef(null);
  const sys2 = useRef(null);
  const sys3 = useRef(null);
  const sys4 = useRef(null);
  const sys5 = useRef(null);
  const contentRef = useRef(null);
  
  const hLines = useRef(null);
  const vLines = useRef(null);
  
  const hubRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      
      // Scatter systems vertically initially
      gsap.set(sys1.current, { y: -80 });
      gsap.set(sys2.current, { y: 60 });
      gsap.set(sys3.current, { y: -50 });
      gsap.set(sys4.current, { y: 70 });
      gsap.set(sys5.current, { y: -40 });
      
      gsap.set(hubRef.current, { opacity: 0, scale: 0.8, transformOrigin: 'center center' });

      // Prepare line drawing
      const allHLines = hLines.current.querySelectorAll('line, path');
      const allVLines = vLines.current.querySelectorAll('line, path');
      
      [allHLines, allVLines].forEach(group => {
        group.forEach(path => {
          const length = path.getTotalLength ? path.getTotalLength() : 1000;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 1.5,
        }
      });

      // Phase 1 & 2: Elements move to balanced positions and horizontal lines draw
      tl.to([sys1.current, sys2.current, sys3.current, sys4.current, sys5.current], {
        y: 0, duration: 2, ease: 'power2.inOut'
      }, 0)
      .to(allHLines, { strokeDashoffset: 0, duration: 1.5, ease: 'none', stagger: 0.1 }, 0.5)
      
      // Phase 3: Vertical lines drop down to the central hub
      .to(allVLines, { strokeDashoffset: 0, duration: 1.5, ease: 'none', stagger: 0.1 }, 1.5)
      
      // Phase 4 & 5: Hub activates
        .to(sys4.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .to(sys5.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');

      // Text content entrance animation
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children, 
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%">
          <pattern id="eco-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="0.5" fill="#94a3b8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#eco-grid)"/>
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Left: Content */}
        <div ref={contentRef} className="relative z-10 lg:pr-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-orange-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Connected Ecosystem
          </h2>
        </div>

        {/* Full-width SVG Ecosystem */}
        <div className="w-full relative hidden md:block" style={{ height: '500px' }}>
          <svg viewBox="0 0 1200 500" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
            
            {/* Horizontal Connection Bus */}
            <g ref={hLines} stroke="#94a3b8" strokeWidth="1.5" fill="none">
              <line x1="150" y1="150" x2="350" y2="150" />
              <line x1="350" y1="150" x2="550" y2="150" />
              <line x1="550" y1="150" x2="750" y2="150" />
              <line x1="750" y1="150" x2="1050" y2="150" />
            </g>

            {/* Vertical Drops to Hub */}
            <g ref={vLines} stroke="#2563eb" strokeWidth="2" fill="none">
              {/* from Security (150) */}
              <path d="M 150 170 L 150 350 L 520 350" />
              {/* from Network (350) */}
              <path d="M 350 170 L 350 330 L 520 330" />
              {/* from Infra (550) */}
              <path d="M 550 170 L 550 280" />
              {/* from Integration (750) */}
              <path d="M 750 170 L 750 330 L 680 330" />
              {/* from Support (1050) */}
              <path d="M 1050 170 L 1050 350 L 680 350" />
            </g>

            {/* 5 Domains */}
            
            {/* 1. Security */}
            <g ref={sys1} transform="translate(150, 150)">
              <rect x="-35" y="-15" width="70" height="30" fill="white" stroke="#0f172a" strokeWidth="1.5" />
              <text x="0" y="32" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#64748b" letterSpacing="1">SECURITY</text>
            </g>

            {/* 2. Network */}
            <g ref={sys2} transform="translate(350, 150)">
              <rect x="-35" y="-15" width="70" height="30" fill="white" stroke="#2563eb" strokeWidth="1.5" />
              <text x="0" y="32" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#64748b" letterSpacing="1">NETWORK</text>
            </g>

            {/* 3. Infra */}
            <g ref={sys3} transform="translate(550, 150)">
              <rect x="-35" y="-15" width="70" height="30" fill="white" stroke="#f97316" strokeWidth="1.5" />
              <text x="0" y="-22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#64748b" letterSpacing="1">INFRASTRUCTURE</text>
            </g>

            {/* 4. Integration */}
            <g ref={sys4} transform="translate(750, 150)">
              <rect x="-35" y="-15" width="70" height="30" fill="white" stroke="#2563eb" strokeWidth="1.5" />
              <text x="0" y="32" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#64748b" letterSpacing="1">INTEGRATION</text>
            </g>

            {/* 5. Support */}
            <g ref={sys5} transform="translate(1050, 150)">
              <rect x="-35" y="-15" width="70" height="30" fill="white" stroke="#0f172a" strokeWidth="1.5" />
              <text x="0" y="32" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#64748b" letterSpacing="1">SUPPORT</text>
            </g>

            {/* Central Unified Hub */}
            <g ref={hubRef} transform="translate(600, 340)">
              {/* Outer boundary */}
              <rect x="-80" y="-60" width="160" height="120" fill="white" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4" />
              
              {/* Core Engine */}
              <rect x="-40" y="-30" width="80" height="60" fill="#0f172a" />
              
              {/* Data stream lines inside */}
              <line x1="-30" y1="-10" x2="30" y2="-10" stroke="#334155" strokeWidth="2" />
              <line x1="-30" y1="0" x2="10" y2="0" stroke="#f97316" strokeWidth="2" />
              <line x1="-30" y1="10" x2="30" y2="10" stroke="#2563eb" strokeWidth="2" />
              
              {/* Ports locking the 5 incoming lines */}
              <circle cx="-80" cy="10" r="3" fill="#2563eb" />
              <circle cx="-80" cy="-10" r="3" fill="#2563eb" />
              <circle cx="-50" cy="-60" r="3" fill="#2563eb" />
              <circle cx="80" cy="-10" r="3" fill="#2563eb" />
              <circle cx="80" cy="10" r="3" fill="#2563eb" />

              <text x="0" y="48" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#0f172a" fontWeight="bold" letterSpacing="2">SMART FIX ECOSYSTEM</text>
            </g>

          </svg>
        </div>

        {/* Mobile fallback (text only or simplified) */}
        <div className="md:hidden w-full space-y-6 mt-10">
           <div className="bg-white p-6 border border-slate-200 text-center">
             <span className="block font-mono text-xs text-orange-500 mb-2">01 - 05</span>
             <h3 className="font-bold text-xl text-slate-900">Unified Operations</h3>
             <p className="text-slate-600 mt-2 text-sm">Security, Network, Infrastructure, Integration, and Support operating as one cohesive system.</p>
           </div>
        </div>

      </div>
    </section>
  );
}
