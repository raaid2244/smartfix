import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeatureSteps } from '../ui/feature-section';
import SectionEyebrow from '../SectionEyebrow';

import cctvImage from '../../assets/user-cctv.jpg';
import supportImage from '../../assets/user-support-v2.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesEcosystem() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowRef = useRef(null);

  const ecosystemFeatures = [
    {
      step: 'STAGE 01',
      title: 'SECURITY',
      content: 'CCTV Surveillance, Access Control & Biometrics, Fire Alarm Systems, Video Management Systems.',
      image: cctvImage
    },
    {
      step: 'STAGE 02',
      title: 'NETWORK',
      content: 'Enterprise Networking, Structured Cabling, VPN & Remote Access, Wireless Infrastructure.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop'
    },
    {
      step: 'STAGE 03',
      title: 'INFRASTRUCTURE',
      content: 'Server & Storage Systems, Public Address / Voice Evacuation, Uninterrupted Power, Hardware Provisioning.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop'
    },
    {
      step: 'STAGE 04',
      title: 'SUPPORT',
      content: 'Annual Maintenance Contracts, Preventive Maintenance, 24/7 Technical Support.',
      image: supportImage
    }
  ];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        const revealElements = headerRef.current.querySelectorAll('.reveal-elem');
        gsap.set(revealElements, { y: '120%' });
        
        const eyebrowLeft = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-left-line') : null;
        const eyebrowText = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-text') : null;
        const eyebrowRight = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-right-line') : null;
        
        gsap.set(eyebrowLeft, { scaleX: 0 });
        gsap.set(eyebrowText, { opacity: 0, y: 10 });
        gsap.set(eyebrowRight, { scaleX: 0 });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
        
        if (eyebrowLeft) tl.to(eyebrowLeft, { scaleX: 1, duration: 0.6, ease: "power2.out" });
        if (eyebrowText) tl.to(eyebrowText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
        if (eyebrowRight) tl.to(eyebrowRight, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");

        tl.to(revealElements, {
          y: '0%', 
          duration: 1.0, 
          stagger: 0.15, 
          ease: 'power4.out',
        }, "-=0.5");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-slate-50 relative overflow-hidden font-sans"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div ref={headerRef} className="mb-24 flex flex-col gap-6 max-w-4xl">
          <SectionEyebrow ref={eyebrowRef} label="OUR SOLUTION ECOSYSTEM" align="left" className="!mb-2" />
          
          <div className="overflow-hidden pb-2">
            <h2 
              className="reveal-elem text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] uppercase" 
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              SECURITY & INFRASTRUCTURE<br className="hidden lg:block"/> <span className="logo-text-gradient">ACROSS EVERY SECTOR</span>
            </h2>
          </div>
          
          <div className="overflow-hidden pb-2 mt-4">
            <p className="reveal-elem text-lg md:text-xl text-slate-600 font-light leading-relaxed">
              From protection and connectivity to infrastructure and ongoing support, our solutions work together to keep every environment secure, connected and operational.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <FeatureSteps 
          features={ecosystemFeatures} 
          title={null} 
          className="px-6 lg:px-8 p-0 md:p-0 max-w-[1400px] mx-auto" 
        />
      </div>
    </section>
  );
}
