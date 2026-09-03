import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import SectionEyebrow from '../SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      if (contentRef.current) {
        const revealElements = contentRef.current.querySelectorAll('.reveal-elem');
        gsap.set(revealElements, { y: '120%' });
        
        const eyebrowLeft = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-left-line') : null;
        const eyebrowText = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-text') : null;
        const eyebrowRight = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-right-line') : null;
        
        gsap.set(eyebrowLeft, { scaleX: 0 });
        gsap.set(eyebrowText, { opacity: 0, y: 10 });
        gsap.set(eyebrowRight, { scaleX: 0 });
        
        // Custom massive title stagger
        gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: '120%' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });

        // 1. Reveal Eyebrow
        if (eyebrowLeft) tl.to(eyebrowLeft, { scaleX: 1, duration: 0.6, ease: "power2.out" });
        if (eyebrowText) tl.to(eyebrowText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
        if (eyebrowRight) tl.to(eyebrowRight, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
        
        // 2. Reveal Title
        tl.to([titleLine1Ref.current, titleLine2Ref.current], { 
          y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out' 
        }, "-=0.4");
        
        // 3. Reveal Paragraph and Button
        tl.to(revealElements, { 
          y: '0%', duration: 1.0, stagger: 0.15, ease: 'power4.out' 
        }, "-=0.8");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#020617] text-white border-t border-slate-800/60 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div ref={contentRef} className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <SectionEyebrow ref={eyebrowRef} label="LET'S WORK TOGETHER" className="!mb-8" />
        
        <h2 className="font-sans font-black uppercase tracking-tight leading-[0.9] flex flex-col gap-1 mb-8 w-full text-center items-center">
          <div className="overflow-hidden pb-3">
            <div ref={titleLine1Ref} className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              YOUR INDUSTRY.
            </div>
          </div>
          <div className="overflow-hidden pb-3">
            <div ref={titleLine2Ref} className="logo-text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              OUR EXPERTISE.
            </div>
          </div>
        </h2>

        <div className="overflow-hidden pb-2 mb-12">
          <p className="reveal-elem text-lg md:text-xl text-slate-400 font-light max-w-2xl text-center leading-relaxed">
            Let's build a secure, connected and reliable infrastructure for your business.
          </p>
        </div>

        <div className="overflow-hidden pb-2">
          <div className="reveal-elem">
            <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold text-xs tracking-[0.15em] hover:bg-blue-50 transition-colors rounded-none border border-white">
              LET'S TALK <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
