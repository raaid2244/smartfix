import React, { useEffect, useRef } from 'react';
import { SectionEyebrow, SectionHeading } from './ui/Typography';
import { RevealGroup } from './ui/RevealGroup';
import imgDesign from '../assets/real-process-1-design.jpg';
import imgSupply from '../assets/real-process-2-supply.jpg';
import imgInstallation from '../assets/real-process-3-installation.jpg';
import imgTesting from '../assets/real-process-4-testing.jpg';
import imgMaintenance from '../assets/real-process-5-maintenance.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const workflowSteps = [
  { 
    step: '01', title: 'Design', desc: 'End-to-end planning & system architecture tailored to your site.', image: imgDesign, 
    activeColor: 'group-data-[active=true]:text-cyan-400',
    activeBorder: 'group-data-[active=true]:border-cyan-400',
    activeShadow: 'group-data-[active=true]:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    pingBorder: 'border-cyan-400'
  },
  { 
    step: '02', title: 'Supply', desc: 'Enterprise-grade components sourced from global technology leaders.', image: imgSupply, 
    activeColor: 'group-data-[active=true]:text-blue-500',
    activeBorder: 'group-data-[active=true]:border-blue-500',
    activeShadow: 'group-data-[active=true]:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    pingBorder: 'border-blue-500'
  },
  { 
    step: '03', title: 'Installation', desc: 'Expert deployment teams with zero-compromise quality execution.', image: imgInstallation, 
    activeColor: 'group-data-[active=true]:text-amber-500',
    activeBorder: 'group-data-[active=true]:border-amber-500',
    activeShadow: 'group-data-[active=true]:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    pingBorder: 'border-amber-500'
  },
  { 
    step: '04', title: 'Testing & Comm.', desc: 'Rigorous validation against international compliance standards.', image: imgTesting, 
    activeColor: 'group-data-[active=true]:text-orange-500',
    activeBorder: 'group-data-[active=true]:border-orange-500',
    activeShadow: 'group-data-[active=true]:shadow-[0_0_30px_rgba(249,115,22,0.4)]',
    pingBorder: 'border-orange-500'
  },
  { 
    step: '05', title: 'Maintenance', desc: 'Proactive support ensuring maximum system uptime long-term.', image: imgMaintenance, 
    activeColor: 'group-data-[active=true]:text-rose-500',
    activeBorder: 'group-data-[active=true]:border-rose-500',
    activeShadow: 'group-data-[active=true]:shadow-[0_0_30px_rgba(244,63,94,0.4)]',
    pingBorder: 'border-rose-500'
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const pipelineRef = useRef(null);
  const lineRef = useRef(null);
  const activeStepRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop Animation
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current, // Use the tall outer section as the timeline trigger
            start: 'top top', 
            end: 'bottom bottom', // The animation plays perfectly across the 300vh scroll height
            scrub: 1, // Smooth scrub
          },
          onUpdate: function() {
            let prog = this.progress();
            
            // The line animation finishes at 80% of the total scroll.
            // Calculate the actual visual progress of the line (0 to 1)
            let lineProg = Math.min(prog / 0.8, 1);
            
            let step = 0;
            if (lineProg >= 0.99) step = 4;
            else if (lineProg >= 0.75) step = 3;
            else if (lineProg >= 0.50) step = 2;
            else if (lineProg >= 0.25) step = 1;
            
            if (step !== activeStepRef.current) {
              activeStepRef.current = step;
              if (sectionRef.current) {
                const nodes = sectionRef.current.querySelectorAll('.process-item');
                nodes.forEach((node, idx) => {
                  node.dataset.active = idx <= step ? "true" : "false";
                  node.dataset.current = idx === step ? "true" : "false";
                });
              }
            }
          }
        });

        // Animate line using scaleX for exact 0-100% precision over 80% of the scroll
        tl.fromTo(lineRef.current, 
          { scaleX: 0 }, 
          { scaleX: 1, ease: 'none', duration: 0.8 }
        );
        
        // Add a blank 20% duration at the end to hold the 100% complete state
        // before the section unpins and scrolls away
        tl.to({}, { duration: 0.2 });
      });

      // Mobile Animation (No pinning, activate on scroll)
      mm.add("(max-width: 1023px)", () => {
        if (!sectionRef.current) return;
        gsap.utils.toArray(sectionRef.current.querySelectorAll('.mobile-step-node')).forEach((node) => {
          ScrollTrigger.create({
            trigger: node,
            start: 'top 50%',
            onEnter: () => {
              node.dataset.active = "true";
              node.dataset.current = "true";
            },
            onEnterBack: () => {
              node.dataset.active = "true";
              node.dataset.current = "true";
            },
            onLeave: () => {
              node.dataset.current = "false";
            },
            onLeaveBack: () => {
              node.dataset.active = "false";
              node.dataset.current = "false";
            }
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-[300vh] bg-black relative border-t border-slate-900">
      
      {/* Sticky Container - Natively locks to the screen while scrolling through the 300vh section */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-mesh-gradient-dark opacity-20 pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-dot-grid opacity-[0.05] pointer-events-none" />
        
        <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        <RevealGroup>
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center">
            <SectionEyebrow label="HOW WE WORK" align="center" className="!mb-6" />
            <SectionHeading className="!text-center mb-16 lg:mb-24">
              <span className="logo-text-gradient">ONE PARTNER,</span><br />
              <span className="text-white">END TO END.</span>
            </SectionHeading>
          </div>

          {/* Interactive Pipeline */}
          <div ref={pipelineRef} className="relative flex flex-col lg:flex-row items-start justify-between w-full max-w-6xl mx-auto gap-12 lg:gap-0">
            
            {/* The Background Line (Desktop Only) */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-1 bg-slate-900 hidden lg:block rounded-full" />
            
            {/* The Active Animated Line (Desktop Only) */}
            <div 
              ref={lineRef}
              className="absolute top-[28px] left-[10%] right-[10%] h-1 bg-[linear-gradient(to_right,#00c3ff_0%,#2563eb_33%,#f59e0b_66%,#e11d48_100%)] hidden lg:block rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] origin-left" 
            />

            {workflowSteps.map((item, idx) => {
              return (
                <div 
                  key={idx}
                  className="process-item mobile-step-node relative z-10 flex flex-col items-center flex-1 group cursor-default"
                  data-active={idx === 0 ? "true" : "false"}
                  data-current={idx === 0 ? "true" : "false"}
                >
                  {/* Node */}
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-black relative border-slate-800 overflow-hidden ${item.activeBorder} ${item.activeShadow}`}>
                    {/* Inner pulse ring when current */}
                    <div className={`absolute inset-0 rounded-full border ${item.pingBorder} animate-ping opacity-0 group-data-[current=true]:opacity-20 transition-opacity z-10 pointer-events-none`} />
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-30 group-data-[active=true]:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                  
                  {/* Text Content */}
                  <div className="mt-8 text-center px-4 lg:px-2">
                    <span className={`block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3 transition-colors duration-300 text-slate-700 ${item.activeColor}`}>
                      STEP {item.step}
                    </span>
                    <h4 className="text-lg lg:text-xl font-bold mb-4 transition-colors duration-300 text-slate-500 group-data-[active=true]:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed transition-colors duration-300 max-w-xs mx-auto text-slate-600 opacity-50 lg:opacity-100 group-data-[current=true]:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealGroup>
      </div>
    </div>
    </section>
  );
}
