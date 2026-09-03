import React from 'react';
import { companyInfo } from '../../data/companyData';
import { StickyFeatureSection } from '../ui/sticky-scroll-cards-section';

const PREVIEW_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
];

const SECTOR_FEATURES = [
  ["Access Control", "Surveillance", "Enterprise Wi-Fi"],
  ["Loss Prevention", "Multi-site VPN", "PA Systems"],
  ["Perimeter Security", "Industrial LAN", "Fire Safety"],
  ["Production Monitoring", "Safety Compliance", "Robust Connectivity"],
  ["Guest Wi-Fi", "IPTV", "Unified Comms"],
  ["Nurse Call", "Critical Care Networks", "Asset Tracking"],
  ["Campus Wi-Fi", "PA Systems", "Emergency Lockdown"],
  ["Smart Intercoms", "Community CCTV", "FTTH"],
  ["Site Surveillance", "Temporary Wi-Fi", "Safety Comms"],
  ["BMS Integration", "Structured Cabling", "Facility Security"]
];

const CARD_COLORS = [
  "bg-blue-50",
  "bg-slate-50",
  "bg-indigo-50",
  "bg-sky-50",
  "bg-cyan-50",
];

export default function IndustriesSolutions() {
  const industries = companyInfo.industries.items;

  // Prepare features array for StickyFeatureSection
  const features = industries.map((ind, idx) => ({
    title: ind.name,
    tag: `REQUIREMENT // ${ind.tag}`,
    description: `Integrated deployments specifically engineered for ${ind.name.toLowerCase()} ensuring uncompromising safety, reliable connectivity, and strict regulatory compliance.`,
    imageUrl: PREVIEW_IMAGES[idx],
    bgColor: CARD_COLORS[idx % CARD_COLORS.length],
    textColor: "text-slate-600",
    bulletPoints: SECTOR_FEATURES[idx]
  }));

  return (
    <StickyFeatureSection 
      title={
        <>
          Infrastructure built around<br className="hidden md:block" />
          <span className="logo-text-gradient"> how your industry operates.</span>
        </>
      }
      subtitle="INDUSTRY-SPECIFIC SOLUTIONS"
      features={features}
    />
  );
}
