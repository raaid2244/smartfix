import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import StrokeText from './ui/StrokeText';
import logoNew from '../assets/logo-new.png';
import ScrollExpand from './ui/ScrollExpand';
import ultra4kVideo from '../assets/Smart_Fix_Solutions_ULTRA_4K.mp4';

export default function LpasHero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [1.0] }
    );
    
    const target = document.getElementById('hero-top-sentinel');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, []);

  const heroTitle = (
    <div className={`flex flex-col items-center justify-center text-center px-4 w-full transition-opacity duration-150 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-6xl mb-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        <div className="flex items-center justify-center md:translate-x-16">
          <img src={logoNew} alt="Smart Fix Solutions Logo" className="w-24 md:w-32 lg:w-40 h-auto object-contain" />
        </div>
        
        <div className="flex-1 w-full flex justify-center">
          <StrokeText
            text="SMART FIX SOLUTIONS"
            strokeColor="#94a3b8" 
            fillColor="#ffffff" 
            strokeWidth={1}
            drawDuration={1.6}
            fillDelay={0.4}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={72} 
            fontWeight={700}
            letterSpacing={5} 
            className="font-montserrat w-full text-center md:text-left"
          />
        </div>
      </div>
      <p className="text-sm md:text-lg text-slate-400 font-mono tracking-widest uppercase font-bold text-center mt-2">
        ENTERPRISE SECURITY & NETWORK
      </p>
    </div>
  );

  return (
    <div className="relative w-full bg-black">
      <div id="hero-top-sentinel" className="absolute top-0 w-full h-[10px]" aria-hidden="true" />
      <ScrollExpand
        src={ultra4kVideo}
        mediaType="video"
        loop={true}
        cutLastSeconds={2}
        alt="Smart Fix Solutions Hero"
        title={heroTitle}
        useWindowScroll
        mediaZoom={1.35}
        overlayScrim={0.6}
        startWidth={90}
        startHeight={80}
      >
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            BUILT FOR <span className="logo-text-gradient">RESILIENCE</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-light">
            We architect systems that eliminate blind spots and ensure non-stop operations. Protect your assets with cutting-edge technology.
          </p>
        </div>
      </ScrollExpand>
    </div>
  );
}
