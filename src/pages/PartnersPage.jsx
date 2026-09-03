import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, PenTool, Paintbrush, Zap, Server, Briefcase, LineChart, Users, Store } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { RevealGroup } from '../components/ui/RevealGroup';
import { SectionEyebrow, SectionHeading, SectionParagraph } from '../components/ui/Typography';
import PartnersHero from '../components/PartnersHero';

// Map icon names from data to actual Lucide components
const IconMap = {
  Building2,
  PenTool,
  Paintbrush,
  Zap,
  Server,
  Briefcase,
  LineChart,
  Users,
  Store
};

const PartnerCard = ({ partner }) => {
  const Icon = IconMap[partner.icon] || ArrowRight;
  return (
    <div className="group w-[320px] sm:w-[400px] shrink-0 bg-white border border-slate-200/60 rounded-[1.25rem] hover:border-slate-300 transition-all duration-500 flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-slate-200/50 relative overflow-hidden">
      
      {/* Photographic Header */}
      <div className="w-full h-[180px] sm:h-[220px] relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        <img 
          src={partner.image} 
          alt={partner.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
          {partner.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 font-light">
          {partner.description}
        </p>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
            Integration Partner
          </span>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

const MarqueeRow = ({ items, direction = 'left' }) => {
  const animateClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  return (
    <div className="flex w-full overflow-hidden group/marquee mb-6">
      <div className={`flex shrink-0 gap-6 pr-6 ${animateClass}`}>
        {items.map((partner, idx) => <PartnerCard key={`track1-${idx}`} partner={partner} />)}
      </div>
      <div className={`flex shrink-0 gap-6 pr-6 ${animateClass}`}>
        {items.map((partner, idx) => <PartnerCard key={`track2-${idx}`} partner={partner} />)}
      </div>
    </div>
  );
};

export default function PartnersPage() {
  const allPartners = companyInfo.referralPartners.partners;
  const topRow = allPartners.slice(0, 5);
  const bottomRow = allPartners.slice(5, 9);

  return (
    <div className="page-transition bg-white min-h-screen">

      {/* 1. HERO */}
      <PartnersHero />

      {/* 2. INFINITE SCROLLING MARQUEE (PHOTOGRAPHIC) */}
      <section className="py-24 sm:py-32 bg-slate-50 overflow-hidden relative border-y border-slate-100">
        
        {/* Large Editorial Watermark (Light Mode) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black text-[15vw] text-slate-200/50 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
          NETWORK
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10 flex flex-col items-center text-center">
          <RevealGroup className="max-w-3xl flex flex-col items-center">
            <SectionHeading className="!text-4xl sm:!text-5xl !mb-6 !normal-case tracking-tight text-slate-900">
              Our Referral <span className="logo-text-gradient">Network</span>
            </SectionHeading>
            <SectionParagraph className="!text-lg !text-slate-500 !mb-0 max-w-2xl font-light mx-auto">
              Industry professionals we work with to deliver complete infrastructure solutions.
            </SectionParagraph>
          </RevealGroup>
        </div>

        {/* Marquee Container (Full Width Bleed) */}
        <div className="relative w-full overflow-hidden flex flex-col z-10">
          {/* Subtle gradient fades on edges so the cards appear/disappear smoothly */}
          <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <MarqueeRow items={topRow} direction="left" />
          <MarqueeRow items={bottomRow} direction="right" />
        </div>
      </section>


    </div>
  );
}
