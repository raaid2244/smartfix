import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Globe, MapPin } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import logo from '../assets/logo-colorful-transparent.png';
import SmartFixTitle from './SmartFixTitle';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-600 relative overflow-hidden border-t border-slate-200">


      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        {/* Top row: Brand + tagline */}
        <div className="pt-20 pb-16 border-b border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Brand block */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-6 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="SMART FIX SOLUTIONS"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <SmartFixTitle size="text-sm lg:text-base" forceWhite={false} />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-blue-600 uppercase tracking-[0.3em] font-semibold group-hover:text-blue-500 transition-colors ml-16 block mt-1">
                  Enterprise Security & Network
                </span>
              </Link>
              <p className="text-sm font-sans text-slate-500 leading-relaxed max-w-sm mb-8">
                {companyInfo.description}
              </p>

              {/* Contact mini-list */}
              <div className="space-y-3">
                <a href={`mailto:${companyInfo.contact.email}`} className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-600 transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                    <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  {companyInfo.contact.email}
                </a>
                <a href={`https://${companyInfo.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-600 transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                    <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  {companyInfo.contact.website}
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  {companyInfo.contact.location}
                </div>
              </div>
            </div>

            {/* Nav links */}
            <div className="lg:col-span-2 lg:pl-8">
              <h4 className="text-slate-900 text-[11px] font-bold tracking-widest uppercase mb-7 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Company
              </h4>
              <ul className="space-y-3.5">
                {['Home', 'About', 'Projects', 'Partners'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-blue-500 transition-all duration-300 rounded-full" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capabilities */}
            <div className="lg:col-span-3 lg:pl-8">
              <h4 className="text-slate-900 text-[11px] font-bold tracking-widest uppercase mb-7 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Capabilities
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Expertise', to: '/expertise' },
                  { label: 'Industries', to: '/industries' },
                  { label: 'Referral Partners', to: '/partners' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-between group py-2 border-b border-slate-100 hover:border-amber-300"
                    >
                      <span>{label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA block */}
            <div className="lg:col-span-3 lg:pl-8">
              <h4 className="text-slate-900 text-[11px] font-bold tracking-widest uppercase mb-7 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Get Started
              </h4>

              <div className="bg-slate-900 rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient-dark opacity-30 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">Ready to Deploy</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Have a project in mind? Let's discuss your requirements and build something great.
                  </p>
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-center w-full px-5 py-3 bg-white hover:bg-blue-600 text-slate-900 hover:text-white font-bold text-[11px] tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-blue-900/30"
                  >
                    Start a Project
                    <ArrowUpRight className="w-3.5 h-3.5 ml-2 text-blue-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-400">
            © {currentYear} Smart Fix Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">Enterprise Security & Network Integrator</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
