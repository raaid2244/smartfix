import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSecurity() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  // Animation Refs
  const videoWrapperRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Text content entrance
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

      // 2. Video entrance sequence
      gsap.set(videoWrapperRef.current, { x: 50, opacity: 0, scale: 0.95 });

      gsap.to(videoWrapperRef.current, {
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.6, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-black text-white relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[70vh]">
        
        {/* Left: Content */}
        <div ref={contentRef} className="relative z-10 lg:pr-12 order-2 lg:order-1 self-start pt-12 flex flex-col gap-10">
          
          <div className="overflow-hidden pb-1">
            <h2 className="reveal-elem text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              SECURITY & <span className="logo-text-gradient">SURVEILLANCE</span>
            </h2>
          </div>

          <div className="overflow-hidden pb-2">
            <p className="reveal-elem text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-lg">
              Integrated security solutions designed to protect people, property, and critical operations. From intelligent CCTV surveillance and centralized video management to controlled access and time attendance, we build connected security systems that provide visibility, control, and confidence.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {[
              {
                name: "CCTV SURVEILLANCE",
                desc: "Round-the-clock visual coverage with remote viewing and recording."
              },
              {
                name: "VIDEO MANAGEMENT SYSTEMS",
                desc: "One dashboard for every camera, feed and recording."
              },
              {
                name: "ACCESS CONTROL & TIME ATTENDANCE",
                desc: "Control who goes where, and track it automatically."
              }
            ].map(item => (
              <div key={item.name} className="overflow-hidden pb-2">
                <div className="reveal-elem flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-500 shrink-0 mt-2" />
                  <div className="flex flex-col">
                    <span className="text-base font-mono tracking-wide text-white font-bold uppercase mb-1">{item.name}</span>
                    <span className="text-sm text-slate-400 font-light leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: True Photorealistic CCTV Visualization */}
        <div className="relative flex justify-center items-center h-full order-1 lg:order-2 w-full max-w-2xl mx-auto min-h-[600px]">
          
          {/* Layer 1: The Looping Video Background */}
          <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full">
            <video
              src="/cctv-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover contrast-[1.15] brightness-[1.1] saturate-[1.2]"
              style={{
                maskImage: 'radial-gradient(circle at 50% 50%, black 45%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 45%, transparent 75%)'
              }}
            />
          </div>


        </div>

      </div>
    </section>
  );
}
