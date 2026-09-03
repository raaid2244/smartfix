import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { companyInfo } from '../data/companyData';
import CompanyStoryScroll from '../components/about/CompanyStoryScroll';
import AboutHeroKinetic from '../components/about/AboutHeroKinetic';
import AboutSection from '../components/AboutSection';
import MissionVisionModern from '../components/about/MissionVisionModern';

import { RevealGroup } from '../components/ui/RevealGroup';
import { RevealHeading } from '../components/ui/RevealHeading';


gsap.registerPlugin(ScrollTrigger);



export default function AboutPage() {
  const leadershipRef = useRef(null);
  const leadershipImageRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !leadershipRef.current) return;

    let ctx = gsap.context(() => {
      // Image fade
      if (leadershipImageRef.current) {
        gsap.fromTo(leadershipImageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: leadershipRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, leadershipRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-transition bg-white">
      
      {/* 1. HERO / INTRODUCTION (Kinetic Typography) */}
      <AboutHeroKinetic />

      {/* 2. WHO WE ARE */}
      <AboutSection />

      {/* 3. OUR STORY (Existing Component) */}
      <CompanyStoryScroll />

      {/* 3. FOUNDER / LEADERSHIP */}
      <section ref={leadershipRef} id="leadership" className="py-32 px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Founder Image */}
            <div ref={leadershipImageRef} className="lg:col-span-6 relative">
              <div className="aspect-[3/4] w-full bg-slate-200 rounded-sm overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src={companyInfo.founderCard.image}
                  alt={companyInfo.founderCard.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating ID Tag */}
              <div className="absolute -bottom-6 -right-6 md:right-auto md:-left-8 bg-white p-6 shadow-xl border border-slate-100 max-w-[240px]">
                <div className="text-lg font-bold text-slate-900">{companyInfo.founderCard.name}</div>
                <div className="text-sm text-slate-500">{companyInfo.founderCard.role}</div>
              </div>
            </div>

            {/* Founder Content */}
            <RevealGroup className="lg:col-span-6">
              <RevealHeading className="text-5xl sm:text-6xl md:text-[4rem] font-black tracking-tight leading-[0.95] mb-8 uppercase">
                <span className="block text-slate-900">THE PEOPLE</span>
                <span className="block logo-text-gradient">BEHIND THE</span>
                <span className="block text-slate-900">SYSTEMS.</span>
              </RevealHeading>

              <div className="relative bg-slate-950 rounded-2xl p-6 sm:p-8 shadow-2xl">
                {/* Quote Icon */}
                <div className="text-cyan-500 text-7xl sm:text-8xl font-serif leading-none tracking-tighter">
                  “
                </div>
                
                <div className="space-y-4 leading-relaxed -mt-4 sm:-mt-8">
                  <p className="text-white text-[15.5px] font-bold">
                    {companyInfo.about.paragraphs[0]}
                  </p>
                  <p className="text-slate-300 text-[15.5px] font-medium">
                    {companyInfo.about.paragraphs[1]}
                  </p>
                  
                  {/* Highlight Box */}
                  <div className="bg-slate-900/80 border border-slate-800/60 rounded-xl p-6 mt-6">
                    <p className="text-cyan-100 italic text-[15.5px]">
                      "Every business deserves a secure, scalable, future-ready infrastructure that supports growth and operational excellence — that's the standard we build to."
                    </p>
                  </div>
                </div>
              </div>
            </RevealGroup>

          </div>
        </div>
      </section>


      {/* 5. MISSION & VISION */}
      <MissionVisionModern />

    </div>
  );
}
