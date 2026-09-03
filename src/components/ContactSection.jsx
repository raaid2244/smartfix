import React, { useState } from 'react';
import { Mail, Globe, MapPin, Send, Shield, CheckCircle, Radio, Copy, ExternalLink } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import SectionEyebrow from './SectionEyebrow';

export default function ContactSection() {
  const { contact } = companyInfo;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="connect" className="py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 bg-[#04060a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section Eyebrow */}
        <div className="mb-6">
          <SectionEyebrow text={contact.label} align="left" />
        </div>

        {/* CTA Container Shell */}
        <div className="hud-box glass-panel-cyan p-8 sm:p-12 lg:p-16 rounded-2xl border border-cyan-500/40 relative overflow-hidden shadow-2xl">
          
          {/* Ambient Corner Telemetry & Reticle Overlay */}
          <div className="absolute top-4 right-6 font-mono text-[10px] text-cyan-400 tracking-widest hidden sm:block font-bold">
            HQ DISPATCH // CHENNAI_NODE
          </div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl">
            
            {/* Main CTA Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 whitespace-pre-line font-sans">
              {contact.heading}
            </h2>

            {/* Description Copy */}
            <p className="text-slate-200 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl font-sans border-l-3 border-cyan-400 pl-4 py-1">
              "{contact.description}"
            </p>

            {/* High-Impact CTA Button Badge */}
            <div className="mb-12">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-amber-500 via-orange-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 font-mono font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(0,195,255,0.4)]"
              >
                <Send className="w-5 h-5 text-slate-950" />
                <span className="text-slate-950 font-black">{contact.buttonText}</span>
              </a>
            </div>

            {/* Direct Official Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              
              {/* EMAIL */}
              <div className="hud-box glass-panel p-5 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors group shadow-lg">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
                  <span>// DIRECT EMAIL</span>
                  <button onClick={handleCopyEmail} title="Copy email address" className="hover:text-cyan-400">
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-cyan-400 hover:underline flex items-center gap-2 truncate"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                  <span className="truncate">{contact.email}</span>
                </a>
              </div>

              {/* WEBSITE */}
              <div className="hud-box glass-panel p-5 rounded-lg border border-white/10 hover:border-amber-400/50 transition-colors group shadow-lg">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
                  <span>// OFFICIAL DOMAIN</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100" />
                </div>
                <a
                  href={`https://${contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base font-bold text-amber-400 hover:underline flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{contact.website}</span>
                </a>
              </div>

              {/* LOCATION */}
              <div className="hud-box glass-panel p-5 rounded-lg border border-white/10 hover:border-rose-400/50 transition-colors group shadow-lg">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
                  <span>// HEADQUARTERS</span>
                  <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{contact.location}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
