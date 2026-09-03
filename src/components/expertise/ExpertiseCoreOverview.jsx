import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Network, Layers, Blocks, Headset, Cctv, Bell, Server, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE_ITEMS = [
  {
    id: '01',
    title: 'SECURITY & SURVEILLANCE',
    desc: 'Integrated security solutions designed to protect people, property, and critical operations. From intelligent CCTV surveillance and centralized video management to controlled access and time attendance, we build connected security systems that provide visibility, control, and confidence.',
    icon: Cctv,
    offsetClass: 'ml-0', 
    services: [
      { id: '01', name: 'CCTV SURVEILLANCE', desc: 'Round-the-clock visual coverage with remote viewing and recording.' },
      { id: '02', name: 'VIDEO MANAGEMENT SYSTEMS', desc: 'One dashboard for every camera, feed and recording.' },
      { id: '03', name: 'ACCESS CONTROL & TIME ATTENDANCE', desc: 'Control who goes where, and track it automatically.' }
    ]
  },
  {
    id: '02',
    title: 'NETWORK ARCHITECTURE',
    desc: 'A resilient network is the silent backbone of every modern enterprise. From secure VPN tunnels for remote monitoring to high-bandwidth wireless coverage and structured LAN layouts, our connectivity solutions ensure your data moves efficiently, securely, and without delay.',
    icon: Network,
    offsetClass: 'ml-0', 
    services: [
      { id: '01', name: 'ENTERPRISE NETWORKING', desc: 'LAN, WAN and Wi-Fi built for reliability and scale.' },
      { id: '02', name: 'VPN & REMOTE MONITORING', desc: 'Secure access to your systems from anywhere.' }
    ]
  },
  {
    id: '03',
    title: 'FIRE & LIFE SAFETY',
    desc: 'Early detection, clear communication, and coordinated emergency response systems designed to protect people, facilities, and critical operations.',
    icon: Bell,
    offsetClass: 'ml-0', 
    isFocal: true,
    services: [
      { id: '01', name: 'FIRE ALARM SYSTEMS', desc: 'Early detection and warning systems to protect people and assets.' },
      { id: '02', name: 'PUBLIC ADDRESS & VOICE EVACUATION', desc: 'Clear announcements and evacuation guidance, site-wide.' }
    ]
  },
  {
    id: '04',
    title: 'SERVER & STORAGE SOLUTIONS',
    desc: 'Infrastructure designed around your workload, with reliable server and storage solutions configured for performance, availability, and long-term scalability.',
    icon: Server,
    offsetClass: 'ml-0', 
    services: [
      { id: '01', name: 'SERVER & STORAGE SOLUTIONS', desc: 'Infrastructure sized and configured for your workload.' }
    ]
  },
  {
    id: '05',
    title: 'ANNUAL MAINTENANCE CONTRACTS',
    desc: 'Preventive maintenance and ongoing technical support designed to keep critical systems reliable, secure, and operational throughout the year.',
    icon: Wrench,
    offsetClass: 'ml-0', 
    services: [
      { id: '01', name: 'ANNUAL MAINTENANCE CONTRACTS', desc: 'Preventive maintenance that keeps systems running.' }
    ]
  }
];

export default function ExpertiseCoreOverview() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const lineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const descRef = useRef(null);
  
  // Calculate timeline line perfectly
  useEffect(() => {
    const calculateLine = () => {
      if (!listRef.current || !lineRef.current) return;
      const icons = listRef.current.querySelectorAll('.exp-icon-box');
      if (icons.length < 2) return;
      
      const firstIcon = icons[0];
      const lastIcon = icons[icons.length - 1];
      
      const firstRect = firstIcon.getBoundingClientRect();
      const lastRect = lastIcon.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      
      const topOffset = firstRect.top - listRect.top + (firstRect.height / 2);
      const leftOffset = firstRect.left - listRect.left + (firstRect.width / 2) - 1;
      const height = lastRect.top - firstRect.top;
      
      lineRef.current.style.top = `${topOffset}px`;
      lineRef.current.style.left = `${leftOffset}px`;
      lineRef.current.style.height = `${height}px`;
    };

    calculateLine();
    window.addEventListener('resize', calculateLine);
    const t1 = setTimeout(calculateLine, 100);
    const t2 = setTimeout(calculateLine, 500);

    return () => {
      window.removeEventListener('resize', calculateLine);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  
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

      // 2. Timeline Scrub Animation
      gsap.set('.tech-backbone', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('.exp-item-container', { opacity: 1 }); // Remove opacity 0 from container
      gsap.set('.exp-icon-box', { scale: 0.9, opacity: 0 });
      gsap.set('.reveal-text', { y: '120%' });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1, 
        }
      });

      tl.to('.tech-backbone', { scaleY: 1, ease: 'none', duration: 1.5 }, 0);

      const itemDuration = 0.5;
      const staggerDelay = 0.25;

      EXPERTISE_ITEMS.forEach((_, i) => {
        const startTime = i * staggerDelay;

        tl.to(`.exp-item-${i} .exp-icon-box`, {
          scale: 1,
          opacity: 1,
          duration: itemDuration,
          ease: 'back.out(1.5)'
        }, startTime);

        tl.to(`.exp-item-${i} .reveal-text`, {
          y: '0%',
          duration: itemDuration,
          stagger: 0.05,
          ease: 'power3.out'
        }, startTime + 0.1);
      });

      tl.to({}, { duration: 0.6 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#fdfdfd] overflow-hidden min-h-[900px] pt-16 lg:pt-24 pb-32 lg:pb-40 border-t border-b border-slate-100"
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

        {/* BOTTOM SECTION: Left-Aligned Technical System */}
        <div ref={listRef} className="w-full flex justify-start">
          <div className="flex flex-col w-full max-w-5xl gap-16 lg:gap-24 relative z-10 pl-4 lg:pl-8">
            
            {/* The Vertical Backbone Timeline Line */}
            <div ref={lineRef} className="absolute w-[2px] bg-slate-200 z-0">
              <div className="tech-backbone w-full h-full bg-blue-500 origin-top scale-y-0"></div>
            </div>

            {EXPERTISE_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className={`exp-item-container exp-item-${index} flex items-start w-full relative z-10`}
                >
                  
                  {/* Content Group - Background removed so line shows through */}
                  <div className="flex items-start flex-shrink-0 py-2 w-full">
                    
                    {/* Highly Polished Icon Container */}
                    <div className={`exp-icon-box w-16 h-16 rounded-full flex items-center justify-center border mr-8 relative transition-colors flex-shrink-0 ${
                      item.isFocal ? 'bg-white border-blue-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]' : 'bg-slate-50 border-slate-200 hover:border-blue-100 hover:shadow-sm'
                    }`}>
                      {item.isFocal && (
                        <div className="absolute inset-[-4px] rounded-full border border-blue-500/10"></div>
                      )}
                      <Icon strokeWidth={1.5} className="w-[26px] h-[26px] text-blue-600" />
                    </div>

                    {/* Text Content */}
                    <div className="w-full max-w-[800px]">
                      <div className="overflow-hidden pb-1 mb-2">
                        <h3 className={`reveal-text text-[18px] lg:text-[22px] font-bold uppercase tracking-[0.02em] ${
                          item.isFocal ? 'text-[#0a0a0a]' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Render Services if available */}
                      {item.services && item.services.length > 0 && (
                        <div className="flex flex-col gap-5 mt-2">
                          {item.services.map((svc) => (
                            <div key={svc.id} className="overflow-hidden pb-1">
                              <div className="reveal-text flex items-start gap-4">
                                <span className="font-mono text-[11px] text-blue-500 mt-1">
                                  {svc.id}
                                </span>
                                <div>
                                  <h4 className="text-[15px] font-bold text-slate-800 mb-0.5">
                                    {svc.name}
                                  </h4>
                                  <p className="text-[14px] text-slate-500">
                                    {svc.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
