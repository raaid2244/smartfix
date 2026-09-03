import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Globe, Zap } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { RevealGroup } from '../components/ui/RevealGroup';
import { SectionEyebrow, SectionHeading, SectionParagraph } from '../components/ui/Typography';
import { LetsWorkTogether } from '../components/ui/lets-work-section';
import logoNew from '../assets/logo-new.png';
import SmartFixTitle from '../components/SmartFixTitle';

const services = [
  'Physical Security Systems',
  'Enterprise Networking',
  'IT Infrastructure',
  'Integrated Solutions',
  'Maintenance & Support',
  'Other',
];

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState('');

  return (
    <div className="page-transition bg-slate-50 min-h-screen">

      {/* 1. HERO */}
      <LetsWorkTogether />
      {/* 2. CONTACT INTERFACE */}
      <section id="contact-form-section" className="py-24 px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

            {/* Contact Details Card */}
            <div className="lg:col-span-4 relative group self-stretch">
              {/* Animated gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

              <div className="relative bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl h-full flex flex-col">
                {/* Top subtle glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="p-8 sm:p-10 relative z-10 flex flex-col h-full">
                  
                  {/* Brand Header */}
                  <div className="flex items-center gap-4 mb-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 shrink-0 relative group/logo cursor-pointer">
                      <div className="absolute inset-0 bg-white/5 rounded-2xl scale-0 group-hover/logo:scale-100 transition-transform duration-300 origin-center -z-10"></div>
                      <img src={logoNew} alt="Smart Fix Solutions Logo" className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover/logo:scale-110" />
                    </div>
                    <div>
                      <SmartFixTitle size="text-sm sm:text-base" forceWhite={true} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-10 font-montserrat tracking-tight">
                    Get in touch
                  </h3>
                  
                  <div className="space-y-6 flex-1">
                    <a href={`mailto:${companyInfo.contact.email}`} className="group flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/5 text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:scale-110">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Email Us</div>
                        <div className="text-slate-400 text-sm font-medium">{companyInfo.contact.email}</div>
                      </div>
                    </a>

                    <div className="h-px bg-white/5 w-full" />

                    <a href={`https://${companyInfo.contact.website}`} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/5 text-cyan-400 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 group-hover:scale-110">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Website</div>
                        <div className="text-slate-400 text-sm font-medium">{companyInfo.contact.website}</div>
                      </div>
                    </a>

                    <div className="h-px bg-white/5 w-full" />

                    <div className="flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/5 text-slate-300 rounded-xl flex items-center justify-center shrink-0 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">Headquarters</div>
                        <div className="text-slate-400 text-sm leading-relaxed font-medium">{companyInfo.contact.location}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-8 relative group self-stretch">
              {/* Animated gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative bg-[#050505] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden h-full">
                {/* Top subtle glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="p-8 sm:p-12 relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
                    <span className="text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">PROJECT ENQUIRY FORM</span>
                  </div>

                  <form action={`mailto:${companyInfo.contact.email}`} method="post" encType="text/plain" className="space-y-8 flex-1 flex flex-col">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Full Name */}
                      <div className="space-y-2 group/input">
                        <label className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase block group-focus-within:text-blue-400 transition-colors">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          className="w-full border-b border-slate-800 py-3 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 text-base"
                          placeholder="e.g. Jane Doe"
                        />
                      </div>
                      {/* Company */}
                      <div className="space-y-2 group/input">
                        <label className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase block group-focus-within:text-blue-400 transition-colors">Company</label>
                        <input
                          type="text"
                          name="company"
                          className="w-full border-b border-slate-800 py-3 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 text-base"
                          placeholder="e.g. Acme Corp"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 group/input">
                      <label className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase block group-focus-within:text-blue-400 transition-colors">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full border-b border-slate-800 py-3 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 text-base"
                        placeholder="jane@example.com"
                      />
                    </div>

                    {/* Service Type */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase block">Service Required</label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedService(s)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                              selectedService === s
                                ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)] scale-[1.02]'
                                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="service" value={selectedService} />
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2 group/input flex-1">
                      <label className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase block group-focus-within:text-blue-400 transition-colors">Project Requirements</label>
                      <textarea
                        name="requirements"
                        rows={4}
                        className="w-full border-b border-slate-800 py-3 bg-transparent text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 resize-none text-base h-full min-h-[120px]"
                        placeholder="Please provide details about your facility or infrastructure needs..."
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-6 mt-auto">
                      <button
                        type="submit"
                        className="relative overflow-hidden group/btn flex items-center justify-between w-full px-8 py-5 bg-blue-600 text-white font-bold text-xs tracking-[0.2em] transition-all duration-500 rounded-xl shadow-lg hover:shadow-blue-500/25"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative z-10">SEND ENQUIRY VIA EMAIL</span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </button>
                      <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest font-medium">
                        This will open your default email client.
                      </p>
                    </div>

                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
