import React from 'react';
import { Users, Handshake, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import SectionEyebrow from './SectionEyebrow';

export default function ReferralPartnersSection() {
  const { referralPartners } = companyInfo;

  return (
    <section id="partners" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5 bg-[#020408]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionEyebrow text={referralPartners.label} align="left" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
              {referralPartners.heading}
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs shadow-md">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>COLLABORATIVE ECOSYSTEM</span>
          </div>
        </div>

        {/* 9 Technical Tag / Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {referralPartners.partners.map((partner, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const partnerBadgeStyles = [
              'bg-cyan-950/80 text-cyan-400 border-cyan-500/40',
              'bg-blue-950/80 text-blue-400 border-blue-500/40',
              'bg-amber-950/80 text-amber-400 border-amber-500/40',
              'bg-orange-950/80 text-orange-400 border-orange-500/40',
              'bg-rose-950/80 text-rose-400 border-rose-500/40',
            ];
            const badgeStyle = partnerBadgeStyles[index % partnerBadgeStyles.length];

            return (
              <div
                key={index}
                className="hud-box glass-panel p-5 rounded-lg border border-white/10 relative hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 group flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold border px-2.5 py-1 rounded ${badgeStyle}`}>
                    PARTNER-{indexStr}
                  </span>
                  <span className="font-sans font-bold text-base text-slate-100 group-hover:text-amber-300 transition-colors">
                    {partner}
                  </span>
                </div>

                <div className="p-1.5 rounded bg-slate-950 text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Callout */}
        <div className="mt-12 p-6 rounded-xl bg-slate-950/90 border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xl shadow-cyan-500/10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono font-bold text-sm text-white tracking-wider">
                STRATEGIC ALLIANCE PROGRAM
              </div>
              <div className="font-sans text-xs text-slate-300 mt-0.5">
                We partner with architects, builders & IT leaders to integrate end-to-end security & networking right from blueprint stage.
              </div>
            </div>
          </div>
          <a
            href="#connect"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 via-amber-500 to-orange-500 hover:from-cyan-400 hover:to-pink-500 text-slate-950 font-mono font-extrabold text-xs tracking-wider uppercase transition-all flex-shrink-0 shadow-md"
          >
            PARTNER WITH SMART FIX
          </a>
        </div>

      </div>
    </section>
  );
}
