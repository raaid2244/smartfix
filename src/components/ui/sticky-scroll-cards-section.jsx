import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionEyebrow from '../SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

// --- Header Component ---
const AnimatedHeader = ({ title, subtitle, description }) => {
    const containerRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced || !containerRef.current) return;

        let ctx = gsap.context(() => {
            const eyebrowLeft = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-left-line') : null;
            const eyebrowText = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-text') : null;
            const eyebrowRight = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-right-line') : null;
            
            gsap.set(eyebrowLeft, { scaleX: 0 });
            gsap.set(eyebrowText, { opacity: 0, y: 10 });
            gsap.set(eyebrowRight, { scaleX: 0 });
            gsap.set(titleRef.current, { opacity: 0, y: 30 });
            if (descRef.current) gsap.set(descRef.current, { opacity: 0, y: 30 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();
                    if (eyebrowLeft) tl.to(eyebrowLeft, { scaleX: 1, duration: 0.6, ease: "power2.out" });
                    if (eyebrowText) tl.to(eyebrowText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
                    if (eyebrowRight) tl.to(eyebrowRight, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
                    
                    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
                    if (descRef.current) tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="text-center w-full max-w-4xl mx-auto mb-20 flex flex-col items-center">
            {subtitle && (
                <SectionEyebrow ref={eyebrowRef} label={subtitle} />
            )}
            <h2 
                ref={titleRef}
                className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900"
            >
                {title}
            </h2>
            {description && (
                <p 
                    ref={descRef}
                    className="text-lg lg:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed"
                >
                    {description}
                </p>
            )}
        </div>
    );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection({ features, title, subtitle, description }) {
  return (
    <div className="bg-slate-50 font-sans">
      <div className="w-full mx-auto px-4 lg:px-8">
        {/* The main section for the features */}
        <section className="py-24 md:py-32 flex flex-col items-center">
            
            <AnimatedHeader title={title} subtitle={subtitle} description={description} />

            <div className="w-full pb-32">
              {features.map((feature, index) => (
                <div
                    key={index}
                    // The sticky class makes the card stick to the top of the container.
                    className={`bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 p-8 md:p-14 lg:p-16 rounded-[2.5rem] mb-12 sticky`}
                    // Tighter stacking offset
                    style={{ top: `${130 + (index * 6)}px` }}
                >
                  {/* Card Content */}
                  <div className="flex flex-col justify-center order-2 md:order-1 relative">
                    
                    <div className="flex items-center justify-between mb-8">
                      {feature.tag && (
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-blue-600 uppercase bg-blue-50/50 px-3 py-1.5 rounded-full border border-blue-100">
                          {feature.tag}
                        </span>
                      )}
                    </div>

                    <h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-slate-900 tracking-tight leading-[1.1]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {(() => {
                        const words = feature.title.split(' ');
                        const firstWord = words[0];
                        const restOfWords = words.slice(1).join(' ');
                        return (
                          <>
                            {firstWord}
                            <br />
                            <span className="logo-text-gradient">{restOfWords}</span>
                          </>
                        );
                      })()}
                    </h3>
                    <p className={`text-base lg:text-lg leading-relaxed text-slate-500 font-light`}>
                      {feature.description}
                    </p>
                    
                    {feature.bulletPoints && (
                      <div className="mt-10 flex flex-col gap-4">
                        {feature.bulletPoints.map((bp, i) => (
                          <div key={i} className="flex items-start gap-4 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2 transition-transform duration-300 group-hover:scale-150" />
                            <span className="text-slate-700 font-medium tracking-wide">{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Image with architectural markers */}
                  <div className="image-wrapper order-1 md:order-2 w-full aspect-[4/3] relative rounded-[1.5rem] overflow-hidden bg-slate-100 border border-slate-200 group">
                    <img 
                        src={feature.imageUrl} 
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/f8fafc/94a3b8?text=Image+Not+Found"; }}
                    />
                    <div className="absolute inset-0 bg-slate-900/5 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </section>
      </div>
    </div>
  );
}
