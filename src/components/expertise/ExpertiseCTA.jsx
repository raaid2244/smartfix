import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseCTA() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      
      gsap.set(textRef.current, { y: 40, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });
      gsap.set(btnRef.current, { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.to(textRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .to(lineRef.current, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.5')
        .to(btnRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 bg-slate-900 text-white relative overflow-hidden"
    >

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        <div ref={textRef}>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            LET’S BUILD WHAT<br />
            <span className="text-slate-400">YOUR BUSINESS NEEDS</span><br />
            NEXT.
          </h2>
        </div>

        <div className="flex justify-center mb-12">
          <div ref={lineRef} className="w-24 h-px bg-orange-500" />
        </div>

        <div ref={btnRef}>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-4 bg-white text-slate-900 px-10 py-5 font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-colors duration-300 group"
          >
            START A CONVERSATION
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}
