import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "../../data/companyData";
import SectionEyebrow from "../SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

const SECTOR_DESC = [
  "Enterprise network infrastructure & integrated security systems.",
  "Multi-site connectivity, surveillance and access control at scale.",
  "Industrial-grade networking, fire safety and perimeter security.",
  "Robust production-floor monitoring and safety compliance systems.",
  "Guest experience networks, CCTV and unified communications.",
  "Mission-critical security, nurse-call and emergency systems.",
  "Campus-wide connectivity, public address and access management.",
  "Smart home integration, CCTV and community network solutions.",
  "Temporary site comms, surveillance and safety infrastructure.",
  "Centralised building management, CCTV and structured cabling.",
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

const PREVIEW_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", // Corporate
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800", // Retail
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800", // Warehouse
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", // Manufacturing
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800", // Hotels
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800", // Healthcare
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", // Educational
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800", // Residential
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800", // Construction
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", // Commercial
];

export default function IndustriesGrid() {
  const sectionRef    = useRef(null);
  const eyebrowRef    = useRef(null);
  const titleMaskRef  = useRef(null);
  const descRef       = useRef(null);
  const headerLineRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const sectors = companyInfo.industries.items;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Initial states — left side
      const eyebrowLeft = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-left-line') : null;
      const eyebrowText = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-text') : null;
      const eyebrowRight = eyebrowRef.current ? eyebrowRef.current.querySelector('.eyebrow-right-line') : null;
      
      gsap.set(eyebrowLeft, { scaleX: 0 });
      gsap.set(eyebrowText, { opacity: 0, y: 10 });
      gsap.set(eyebrowRight, { scaleX: 0 });
      
      gsap.set(titleMaskRef.current,  { y: "120%" });
      gsap.set(descRef.current,       { opacity: 0, y: 20 });
      gsap.set(headerLineRef.current, { scaleX: 0, transformOrigin: "left center" });
      
      // Initial states — right side (Expertise pattern)
      const rowTextMasks = document.querySelectorAll('.industry-row-text-mask');
      gsap.set(rowTextMasks, { y: "120%" });
      const rowLines = document.querySelectorAll('.industry-row-line');
      gsap.set(rowLines, { scaleX: 0, transformOrigin: "left center" });

      // Left heading reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (eyebrowLeft) tl.to(eyebrowLeft, { scaleX: 1, duration: 0.6, ease: "power2.out" });
          if (eyebrowText) tl.to(eyebrowText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
          if (eyebrowRight) tl.to(eyebrowRight, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
          
          tl.to(titleMaskRef.current,  { y: "0%", duration: 1.0, ease: "power4.out" }, "-=0.5");
          tl.to(descRef.current,       { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
          tl.to(headerLineRef.current, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, "-=0.7");
        },
      });

      // Right Side Row text reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(rowTextMasks, {
            y: "0%", 
            duration: 1.0, 
            stagger: 0.1, 
            ease: "power4.out", 
            delay: 0.2
          });
          gsap.to(rowLines, {
            scaleX: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.inOut",
            delay: 0.2
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white border-b border-white/10 overflow-hidden"
      style={{ paddingTop: "7.5rem", paddingBottom: "7.5rem" }}
      aria-labelledby="industry-directory-heading"
    >
      {/* Ambient dark glow accents */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute"
          style={{
            top: "-10%",
            right: "0%",
            width: "550px",
            height: "550px",
            background: "radial-gradient(circle, rgba(0, 195, 255, 0.08) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "0%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* LEFT — sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col">
            <SectionEyebrow ref={eyebrowRef} label="INDUSTRY DIRECTORY" align="left" className="!mb-8" />

            <div className="overflow-hidden pb-3 mb-8">
              <h2
                id="industry-directory-heading"
                ref={titleMaskRef}
                className="font-sans font-black uppercase tracking-tight leading-[0.92]"
                style={{ fontSize: "clamp(2.6rem, 4vw, 3.8rem)" }}
              >
                <span className="block text-white">INDUSTRIES</span>
                <span className="block logo-text-gradient mt-2">WE SERVE</span>
              </h2>
            </div>

            <div ref={descRef} className="border-l-2 border-blue-500 pl-5 mb-10">
              <p className="text-base lg:text-[17px] text-slate-300 font-light leading-relaxed">
                Solutions engineered around the operational requirements of the environments we serve.
              </p>
            </div>

            <div
              ref={headerLineRef}
              className="h-px bg-white/10 mb-8"
              style={{ width: "5rem" }}
            />

            <div className="flex items-start gap-8">
              <div>
                <div
                  className="leading-none font-light text-white mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.4rem", letterSpacing: "-0.03em" }}
                >
                  10
                </div>
                <div className="text-[9px] font-mono tracking-[0.24em] text-slate-400 uppercase font-bold">
                  INDUSTRY SECTORS
                </div>
              </div>
              <div className="self-center w-px h-10 bg-white/10" />
              <div>
                <div
                  className="leading-none font-light text-white mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.4rem", letterSpacing: "-0.03em" }}
                >
                  3
                </div>
                <div className="text-[9px] font-mono tracking-[0.24em] text-slate-400 uppercase font-bold">
                  GLOBAL REGIONS
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Industry Directory & Dynamic Preview */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row gap-8 xl:gap-16 items-start">
            
            {/* List */}
            <div className="flex-1 w-full flex flex-col" role="list">
              {sectors.map((sector, i) => {
                const isHov = hoveredIdx === i;
                const num   = String(i + 1).padStart(2, "0");
                const desc  = SECTOR_DESC[i] ?? "";
                const tag   = sector.tag ?? "";

                return (
                  <div
                    key={sector.id}
                    role="listitem"
                    tabIndex={0}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onFocus={() => setHoveredIdx(i)}
                    onBlur={() => setHoveredIdx(null)}
                    className="group relative cursor-default select-none outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded-lg -mx-4 px-4 sm:-mx-6 sm:px-6"
                    style={{
                      transition: "background-color 0.4s ease",
                      backgroundColor: isHov ? "rgba(37, 99, 235, 0.04)" : "transparent",
                    }}
                    aria-label={`Industry ${num}: ${sector.name}`}
                  >
                    
                    {/* Top Divider (animated scaleX) */}
                    <div className="w-full h-px overflow-hidden">
                      <div 
                        className="industry-row-line w-full h-full"
                        style={{ 
                          backgroundColor: isHov ? "rgba(37, 99, 235, 0.4)" : "rgba(255, 255, 255, 0.08)",
                          transition: "background-color 0.4s ease" 
                        }} 
                      />
                    </div>

                    {/* Left subtle animated accent border */}
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 rounded-r-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: isHov ? "scaleY(1)" : "scaleY(0)",
                        opacity: isHov ? 1 : 0,
                      }}
                    />

                    {/* Content Mask Container for Scroll Reveal */}
                    <div className="overflow-hidden py-5 lg:py-6">
                      <div className="industry-row-text-mask flex items-center justify-between gap-4 w-full">
                        
                        {/* Number & Title */}
                        <div className="flex items-center gap-5 sm:gap-6 flex-1 min-w-0">
                          {/* Editorial number */}
                          <div
                            aria-hidden="true"
                            className="font-light leading-none flex-shrink-0 transition-colors duration-400"
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "2.1rem",
                              letterSpacing: "-0.02em",
                              color: isHov ? "#00c3ff" : "#475569",
                              minWidth: "3.5rem"
                            }}
                          >
                            {num}
                          </div>

                          {/* Text block */}
                          <div className="flex-1 min-w-0">
                            <div
                              className="block truncate transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              style={{
                                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                                fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                                fontWeight: isHov ? 800 : 700,
                                letterSpacing: "0.02em",
                                color: isHov ? "#ffffff" : "#cbd5e1",
                                textTransform: "uppercase",
                                transform: isHov ? "translateX(8px)" : "translateX(0)",
                              }}
                            >
                              {sector.name}
                            </div>
                            
                            {/* Description & Tags (Accordion style) */}
                            <AnimatePresence>
                              {isHov && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="block overflow-hidden"
                                >
                                  <div className="pt-3 pb-2 pr-6">
                                    <motion.p 
                                      initial={{ y: 8, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, delay: 0.05 }}
                                      className="text-[13px] text-slate-400 font-light leading-relaxed mb-4"
                                      style={{ transform: "translateX(8px)" }}
                                    >
                                      {desc}
                                    </motion.p>
                                    
                                    <motion.div 
                                      initial={{ y: 8, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, delay: 0.15 }}
                                      className="flex flex-wrap gap-2"
                                      style={{ transform: "translateX(8px)" }}
                                    >
                                      {SECTOR_FEATURES[i].map((feat, idx) => (
                                        <span key={idx} className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                          {feat}
                                        </span>
                                      ))}
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Tag & Arrow (Desktop mostly) */}
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <span
                            className="hidden sm:block transition-colors duration-400"
                            style={{
                              fontFamily: "'SF Mono', ui-monospace, monospace",
                              fontSize: "9px",
                              fontWeight: 700,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: isHov ? "#00c3ff" : "#475569",
                            }}
                          >
                            {tag}
                          </span>
                          
                          {/* Arrow chevron */}
                          <div
                            aria-hidden="true"
                            className="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center w-6 h-6"
                            style={{
                              opacity: isHov ? 1 : 0,
                              transform: isHov ? "translateX(0)" : "translateX(-8px)"
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7h8M8 4l3 3-3 3" stroke="#00c3ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Bottom line for the last item */}
              <div className="w-full h-px overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6">
                <div className="industry-row-line w-full h-full bg-white/10" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
