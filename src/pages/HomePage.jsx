import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import LpasHero from '../components/LpasHero';
import HorizontalServices from '../components/HorizontalServices';
import WhyUsSection from '../components/WhyUsSection';
import { RevealGroup } from '../components/ui/RevealGroup';
import { SectionEyebrow, SectionHeading, SectionParagraph } from '../components/ui/Typography';
import IndustriesSection from '../components/IndustriesSection';
import ProcessSection from '../components/ProcessSection';
import networkInfraImg from '../assets/new-enterprise-infra.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const introImgRef = useRef(null);
  const techLabelRef = useRef(null);


  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !introImgRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(introImgRef.current, { 
        clipPath: 'inset(0% 0% 0% 100%)',
        scale: 1.05 
      });
      if (techLabelRef.current) {
        gsap.set(techLabelRef.current, { opacity: 0, y: 20 });
      }

      // 2. Animate
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introImgRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(introImgRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
      });

      if (techLabelRef.current) {
        tl.to(techLabelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, "-=0.4");
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-transition overflow-x-clip bg-white">

      {/* 1. HERO SECTION */}
      <LpasHero />

      {/* 2. WHO WE ARE */}
      <section className="py-28 lg:py-40 px-6 lg:px-8 border-t border-slate-100 bg-[#fbfcfd] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-24 items-center">
            
            {/* Left Column: Content */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center">
              <RevealGroup delay={0.1}>
                <SectionEyebrow label="WHO WE ARE" />
                <SectionHeading className="!mb-8 max-w-[620px]">
                  <span className="block text-slate-900">SECURITY &</span>
                  <span className="block text-slate-900">CONNECTIVITY</span>
                  <span className="block logo-text-gradient">BUILT FOR</span>
                  <span className="block logo-text-gradient">BUSINESS.</span>
                </SectionHeading>
                <SectionParagraph className="max-w-[540px] !mb-12 text-[19px] leading-relaxed text-slate-600">
                  We design and deliver reliable security and networking solutions that keep businesses connected, protected, and ready for what's next.
                </SectionParagraph>
                <Link 
                  to="/about" 
                  className="group inline-flex items-center gap-3 text-slate-900 font-bold text-xs md:text-sm tracking-[0.2em] uppercase transition-all"
                >
                  <span className="relative">
                    LEARN MORE
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </RevealGroup>
            </div>

            {/* Right Column: Visual */}
            <div className="w-full lg:w-[55%] relative group mt-8 lg:mt-0">
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-[24px] overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <img 
                  ref={introImgRef}
                  src={networkInfraImg} 
                  alt="Enterprise Network Infrastructure" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Subtle Technical Annotation */}
              <div 
                ref={techLabelRef}
                className="absolute -bottom-6 lg:-bottom-8 left-6 lg:-left-8 bg-white/95 backdrop-blur-md border border-slate-200 px-6 py-4 rounded-lg shadow-xl z-20"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-bold font-mono text-slate-400">01</span>
                  <div className="w-4 h-[1px] bg-slate-300" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-900 uppercase">Enterprise Infrastructure</span>
                </div>
                <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                  Security // Network // Systems
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR EXPERTISE (Horizontal Scroll) */}
      <HorizontalServices />

      {/* 4. INDUSTRIES */}
      <IndustriesSection />

      {/* 5. HOW WE WORK */}
      <ProcessSection />

      {/* 6. WHY SMART FIX (Full Interactive Section from old page) */}
      <WhyUsSection />


    </div>
  );
}
