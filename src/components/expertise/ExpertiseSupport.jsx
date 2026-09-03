import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import supportImage from '../../assets/maintenance-technician.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSupport() {
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

  const services = [
    {
      num: "01",
      title: "PREVENTIVE MAINTENANCE",
      desc: "Scheduled checks and maintenance to keep systems operating reliably."
    },
    {
      num: "02",
      title: "SYSTEM MONITORING",
      desc: "Regular monitoring to identify potential issues before they affect operations."
    },
    {
      num: "03",
      title: "TECHNICAL SUPPORT",
      desc: "Professional technical assistance for installed systems."
    },
    {
      num: "04",
      title: "SYSTEM MAINTENANCE",
      desc: "Ongoing maintenance and troubleshooting for deployed systems."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-black text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[70vh]">
        
        {/* Left: Content */}
        <div ref={contentRef} className="relative z-10 lg:pr-12 flex flex-col gap-10">
          
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden pb-1">
              <span className="reveal-elem block text-[12px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                05
              </span>
            </div>
            
            <div className="overflow-hidden pb-2">
              <h2 className="reveal-elem text-4xl md:text-5xl lg:text-[56px] xl:text-6xl font-extrabold text-white tracking-tight leading-[1.05] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ANNUAL <span className="logo-text-gradient">MAINTENANCE</span> <br /><span className="logo-text-gradient">CONTRACTS</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="overflow-hidden pb-1">
              <p className="reveal-elem text-lg md:text-xl text-white font-medium leading-relaxed">
                Preventive maintenance that keeps systems running.
              </p>
            </div>
            <div className="overflow-hidden pb-2">
              <p className="reveal-elem text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                Our annual maintenance contracts provide scheduled preventive maintenance, system checks, troubleshooting, and technical support to help keep installed systems reliable and operational.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {services.map((service) => (
              <div key={service.num} className="overflow-hidden pb-2">
                <div className="reveal-elem flex items-start gap-4">
                  <span className="text-[11px] font-mono font-bold text-slate-500 mt-1">{service.num}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-mono font-bold tracking-wider text-slate-200 uppercase mb-2">{service.title}</span>
                    <span className="text-sm text-slate-400 font-light leading-relaxed">
                      {service.desc}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual Container */}
        <div className="relative flex justify-center items-center h-full w-full max-w-2xl lg:max-w-none mx-auto lg:ml-auto">
          <img
            src={supportImage}
            alt="Annual Maintenance Contracts"
            className="w-full h-auto rounded-[30px] shadow-2xl border border-slate-700/50"
          />
        </div>

      </div>
    </section>
  );
}
