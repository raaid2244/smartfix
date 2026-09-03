import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { lpasSlides } from '../data/lpasHeroData';

export default function HorizontalServices() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0vw", "-400vw"]);

  return (
    <div className="bg-black">
      {/* Intro Section */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center">
        <div className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase text-cyan-500 mb-6 flex items-center gap-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
          OUR EXPERTISE
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500"></div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white max-w-4xl">
          CORE <span className="logo-text-gradient">CAPABILITIES</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Comprehensive enterprise security and networking solutions designed for absolute resilience. We architect systems that eliminate blind spots and ensure non-stop operations.
        </p>
      </div>

      {/* DESKTOP */}
      <div ref={containerRef} className="hidden md:block relative h-[500vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
          <motion.div 
            style={{ x: trackX }}
            className="absolute top-0 left-0 h-full w-[500vw] flex z-20"
          >
            {lpasSlides.map((slide, index) => (
              <div key={slide.id} className="h-full w-[100vw] flex">
                <div className="w-1/2 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                  {slide.video ? (
                    <video src={slide.video} autoPlay muted loop playsInline className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                  ) : (
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                  )}
                </div>
                
                <div className={`w-1/2 h-full flex flex-col justify-center px-16 lg:px-24 ${slide.bgColor} ${slide.textColor}`}>
                  {index === 0 && (
                    <div className="text-xs font-bold tracking-[0.3em] uppercase opacity-60 mb-6">OUR SERVICES</div>
                  )}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-bold tracking-widest opacity-60">0{index + 1}</span>
                    <div className="h-[1px] w-12 bg-current opacity-40" />
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                    {slide.title.split(' ')[0]} <span className="logo-text-gradient">{slide.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-lg lg:text-xl leading-relaxed opacity-80 mb-12 max-w-xl">
                    {slide.description}
                  </p>
                  
                  <button className="group flex items-center gap-4 w-fit overflow-hidden">
                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase group-hover:translate-x-2 transition-transform duration-300">
                      Explore Sector
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden bg-black">
        {lpasSlides.map((slide, index) => (
          <div key={slide.id} className="w-full flex flex-col">
            <div className="h-[40vh] w-full">
              {slide.video ? (
                <video src={slide.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className={`p-8 py-16 ${slide.bgColor} ${slide.textColor}`}>
              {index === 0 && (
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 mb-4">OUR SERVICES</div>
              )}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold tracking-widest opacity-60">0{index + 1}</span>
                <div className="h-[1px] w-8 bg-current opacity-40" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                {slide.title.split(' ')[0]} <span className="logo-text-gradient">{slide.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-base leading-relaxed opacity-80 mb-8">
                {slide.description}
              </p>
              <button className="flex items-center gap-3 w-fit">
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase">
                  Explore Sector
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
