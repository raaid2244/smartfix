import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const listRef = useRef(null);
  const isHoveringRef = useRef(false);

  // Default active row logic
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none' // Play once
        }
      });

      if (prefersReducedMotion) {
        tl.to(['.eyebrow-line', '.eyebrow-text', '.heading-line', '.cta-button', '.menu-item', '.image-showcase'], {
          opacity: 1,
          width: (i, t) => t.classList.contains('eyebrow-line') ? '32px' : 'auto',
          duration: 0.1,
          y: 0
        });
      } else {
        // Eyebrow lines
        tl.to('.eyebrow-line', { width: '32px', opacity: 1, duration: 0.6, ease: 'power3.out' }, 0);
        tl.to('.eyebrow-text', { opacity: 1, duration: 0.6 }, 0.1);
        
        // Main heading lines
        tl.to('.heading-line', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 0.15);
        
        // Menu Items
        tl.to('.menu-item', { y: 0, opacity: 1, duration: 0.65, stagger: 0.05, ease: 'power3.out' }, 0.4);
        
        // Image Showcase
        tl.to('.image-showcase', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 0.5);

        // Button
        tl.to('.cta-button', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
      }
    }, sectionRef);

    let interval;
    if (!prefersReducedMotion) {
      interval = setInterval(() => {
        if (!isHoveringRef.current) {
          setActiveRow(prev => (prev + 1) % companyInfo.industries.items.length);
        }
      }, 4000);
    }

    return () => {
      ctx.revert();
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-[100px] lg:py-[130px] bg-[#f8fafc] overflow-hidden"
    >
      <style>
        {`
          @keyframes fillProgress {
            0% { transform: scaleY(0); }
            100% { transform: scaleY(1); }
          }
          .tech-progress-bar {
            animation: fillProgress 4s linear forwards;
          }
        `}
      </style>

      <div className="max-w-[1600px] w-[calc(100%-48px)] lg:w-[calc(100%-80px)] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Top Center Text */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 lg:mb-16 relative z-20">
          <div ref={leftColRef} className="flex flex-col items-center">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow-line w-0 h-px bg-blue-600 opacity-0" />
              <span className="eyebrow-text opacity-0 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                {companyInfo.industries.label}
              </span>
              <span className="eyebrow-line w-0 h-px bg-blue-600 opacity-0" />
            </div>

            {/* Main Heading */}
            <div className="mb-8">
              <h2 className="text-[52px] lg:text-[72px] xl:text-[85px] leading-[0.9] font-black tracking-tighter uppercase flex flex-wrap justify-center gap-x-4 lg:gap-x-5">
                <div className="overflow-hidden pb-2">
                  <div className="heading-line translate-y-[100%] opacity-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                    TRUSTED
                  </div>
                </div>
                <div className="overflow-hidden pb-2">
                  <div className="heading-line translate-y-[100%] opacity-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-orange-400 to-red-500">
                    ACROSS
                  </div>
                </div>
                <div className="overflow-hidden pb-2">
                  <div className="heading-line translate-y-[100%] opacity-0 text-slate-900">
                    SECTORS.
                  </div>
                </div>
              </h2>
            </div>

            {/* Button */}
            <div className="overflow-hidden">
              <Link 
                to="/industries" 
                className="cta-button opacity-0 translate-y-[20px] group inline-flex items-center gap-3 text-blue-600 font-bold text-xs tracking-[0.15em] px-7 py-4 rounded-full border border-blue-200 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all duration-300"
              >
                VIEW ALL INDUSTRIES 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Content: Menu + Image Showcase + Menu */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] gap-6 xl:gap-8 w-full max-w-[1500px]"
          ref={listRef}
          onMouseEnter={() => { isHoveringRef.current = true; }}
          onMouseLeave={() => { isHoveringRef.current = false; }}
        >

          {/* Column 1: Left Menu (Items 1-5) */}
          <div className="flex flex-col gap-2 relative z-20">
            {companyInfo.industries.items.slice(0, 5).map((item, idx) => {
              const realIdx = idx;
              const num = (realIdx + 1).toString().padStart(2, '0');
              const isActive = activeRow === realIdx;
              
              return (
                <div
                  key={item.id}
                  className={`menu-item opacity-0 translate-y-[20px] group relative p-4 xl:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between overflow-hidden
                    ${isActive ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-200' : 'hover:bg-slate-100 border border-transparent'}
                  `}
                  onMouseEnter={() => setActiveRow(realIdx)}
                  onFocus={() => setActiveRow(realIdx)}
                  tabIndex={0}
                >
                  {/* Progress Indicator (Active) */}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 origin-top tech-progress-bar"
                      style={{ animationPlayState: isHoveringRef.current ? 'paused' : 'running' }}
                      key={`progress-left-${realIdx}`}
                    />
                  )}

                  <div className="flex items-center gap-3 xl:gap-4 relative z-10">
                    <span className={`font-mono text-base xl:text-lg font-bold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                      {num}
                    </span>
                    <div>
                      <h3 className={`text-sm xl:text-base transition-colors ${isActive ? 'text-slate-900 font-extrabold' : 'text-slate-700 font-bold group-hover:text-slate-900'}`}>
                        {item.name}
                      </h3>
                      <span className={`text-[9px] xl:text-[10px] font-mono tracking-widest uppercase mt-0.5 block transition-colors ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Right Arrow (Active) */}
                  <div className={`transition-all duration-300 hidden xl:block ${isActive ? 'opacity-100 translate-x-0 text-blue-600' : 'opacity-0 -translate-x-2'}`}>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Image Showcase (Sticky) */}
          <div className="relative z-20 h-[500px] lg:h-[calc(100vh-200px)] min-h-[500px] lg:sticky lg:top-[120px] self-start image-showcase opacity-0 scale-95 rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
            {/* The Images */}
            {companyInfo.industries.items.map((item, idx) => {
              const isActive = activeRow === idx;
              return (
                <div 
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
                  />
                  {/* Subtle Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>
              );
            })}

            {/* Active Image Overlay Data */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-20 flex flex-col sm:flex-row justify-between items-end gap-6">
              <div>
                <span className="inline-block px-3 py-1 mb-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-widest uppercase rounded">
                  {companyInfo.industries.items[activeRow].tag}
                </span>
                <h3 className="text-3xl xl:text-4xl font-bold text-white drop-shadow-md">
                  {companyInfo.industries.items[activeRow].name}
                </h3>
              </div>
            </div>
            
            {/* End of Image Showcase */}
          </div>

          {/* Column 3: Right Menu (Items 6-10) */}
          <div className="flex flex-col gap-2 relative z-20">
            {companyInfo.industries.items.slice(5, 10).map((item, idx) => {
              const realIdx = idx + 5;
              const num = (realIdx + 1).toString().padStart(2, '0');
              const isActive = activeRow === realIdx;
              
              return (
                <div
                  key={item.id}
                  className={`menu-item opacity-0 translate-y-[20px] group relative p-4 xl:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between overflow-hidden flex-row-reverse
                    ${isActive ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-200' : 'hover:bg-slate-100 border border-transparent'}
                  `}
                  onMouseEnter={() => setActiveRow(realIdx)}
                  onFocus={() => setActiveRow(realIdx)}
                  tabIndex={0}
                >
                  {/* Progress Indicator (Active) - Right Side */}
                  {isActive && (
                     <div 
                       className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-600 origin-top tech-progress-bar"
                       style={{ animationPlayState: isHoveringRef.current ? 'paused' : 'running' }}
                       key={`progress-right-${realIdx}`}
                     />
                  )}

                  <div className="flex items-center gap-3 xl:gap-4 relative z-10 flex-row-reverse text-right">
                    <span className={`font-mono text-base xl:text-lg font-bold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                      {num}
                    </span>
                    <div>
                      <h3 className={`text-sm xl:text-base transition-colors ${isActive ? 'text-slate-900 font-extrabold' : 'text-slate-700 font-bold group-hover:text-slate-900'}`}>
                        {item.name}
                      </h3>
                      <span className={`text-[9px] xl:text-[10px] font-mono tracking-widest uppercase mt-0.5 block transition-colors ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Left Arrow (Active) */}
                  <div className={`transition-all duration-300 hidden xl:block ${isActive ? 'opacity-100 translate-x-0 text-blue-600' : 'opacity-0 translate-x-2'}`}>
                    <ArrowRight className="w-5 h-5 rotate-180" />
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
