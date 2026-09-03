import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { RevealGroup } from '../ui/RevealGroup';
import { RevealHeading } from '../ui/RevealHeading';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHeroKinetic() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100vh] flex flex-col justify-center bg-[#FDFCF9] overflow-hidden text-slate-900 font-sans pt-32 pb-20">
      
      {/* Background Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5">
        <h1 className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-black leading-[0.8] tracking-tighter text-slate-900">
          <span className="block">SMART</span>
          <span className="block transform translate-x-[25vw] lg:translate-x-[40vw]">FIX</span>
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col justify-center px-6 md:px-16 lg:px-32 w-full">
        <RevealGroup className="max-w-[1200px] w-full relative">
          
          <div className="mb-6 section-eyebrow">
            <div className="text-xs md:text-sm font-bold tracking-[0.3em] text-slate-500 mb-6 uppercase flex items-center gap-3">
              <span className="w-4 h-[1px] bg-blue-500"></span>
              ABOUT
            </div>
          </div>
          
          <RevealHeading className="text-5xl md:text-7xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tighter leading-[0.9] max-w-5xl uppercase mb-12">
            <span className="block text-slate-900">BUILT ON THE</span>
            <span className="block logo-text-gradient">GROUND TESTED</span>
            <span className="block text-slate-900">INTERNATIONALLY</span>
          </RevealHeading>
          
          <div className="border-l border-orange-500 pl-6 md:pl-8 max-w-2xl ml-4 md:ml-12 mt-8 md:mt-12 section-paragraph">
            <p className="text-[15.5px] text-slate-700 font-medium leading-relaxed">
              Smart Fix Solutions is a Chennai-based system integrator designing, installing and maintaining the security and network infrastructure for the businesses.
            </p>
          </div>

        </RevealGroup>
      </div>

    </section>
  );
}
