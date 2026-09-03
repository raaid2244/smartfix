import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileSearch } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { RevealGroup } from '../components/ui/RevealGroup';
import { SectionEyebrow, SectionHeading, SectionParagraph } from '../components/ui/Typography';

const upcomingCategories = [
  { label: 'CCTV & Surveillance', count: '150+' },
  { label: 'Access Control', count: '120+' },
  { label: 'Enterprise Networking', count: '80+' },
  { label: 'Fire Safety Systems', count: '100+' },
  { label: 'Server & Storage', count: '60+' },
  { label: 'Integrated Systems', count: '90+' },
];

export default function ProjectsPage() {
  return (
    <div className="page-transition bg-white min-h-screen flex flex-col">

      {/* 1. HEADER */}
      <section className="pt-40 pb-24 px-6 lg:px-8 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <RevealGroup className="max-w-7xl mx-auto relative">
          <SectionEyebrow label="Case Studies" />
          <SectionHeading>
            <span className="logo-text-gradient">Selected</span> <br />
            <span className="text-slate-900">Projects.</span>
          </SectionHeading>
          <SectionParagraph>
            A curated selection of our enterprise security and network infrastructure deployments across India, Singapore, and Malaysia.
          </SectionParagraph>
        </RevealGroup>
      </section>

      {/* 2. PORTFOLIO SCOPE */}
      <section className="py-16 px-6 lg:px-8 border-b border-slate-100">
        <RevealGroup className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Deployment Categories</h2>
            <SectionParagraph className="!text-sm !mb-0 max-w-none">The scope of our project work spans the following areas:</SectionParagraph>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {upcomingCategories.map((cat, i) => (
              <div key={i} className="group bg-white border border-slate-200 rounded-xl p-5 text-center card-hover-lift transition-all duration-300 cursor-default">
                <div className="stat-number text-2xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.count}</div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-tight">{cat.label}</div>
              </div>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* 3. EMPTY STATE */}
      <section className="flex-grow flex items-center justify-center py-24 px-6 lg:px-8">
        <RevealGroup className="max-w-2xl w-full text-center">

          {/* Icon */}
          <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FileSearch className="w-9 h-9 text-slate-300" />
          </div>

          <SectionEyebrow label="Coming Soon" accentColor="bg-amber-500" />

          <SectionHeading className="!text-3xl !mb-4 !normal-case">Project Portfolio in Curation</SectionHeading>
          <SectionParagraph className="mx-auto !mb-10">
            Detailed case studies and project data are currently being curated for public release. Contact us for specific portfolio examples relevant to your sector.
          </SectionParagraph>

          {/* Structural preview of upcoming card format */}
          <div className="opacity-40 pointer-events-none mt-4">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">Upcoming Format Preview</div>
            <div className="border border-slate-200 bg-white rounded-xl p-7 text-left shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <div className="w-24 h-3.5 bg-slate-200 rounded-full" />
                <div className="w-16 h-3.5 bg-slate-200 rounded-full" />
              </div>
              <div className="w-full h-6 bg-slate-200 rounded-full mb-3" />
              <div className="w-3/4 h-6 bg-slate-200 rounded-full mb-7" />
              <div className="flex gap-3">
                <div className="w-20 h-3.5 bg-slate-200 rounded-full" />
                <div className="w-20 h-3.5 bg-slate-200 rounded-full" />
                <div className="w-20 h-3.5 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* 4. CTA */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient-dark opacity-30 pointer-events-none" />
        <RevealGroup className="max-w-3xl mx-auto relative">
          <SectionHeading className="!text-3xl sm:!text-4xl !text-white !mb-6 !normal-case">
            Want to see our specific experience in your industry?
          </SectionHeading>
          <SectionParagraph className="!text-slate-400 !mb-10">
            We'll share relevant portfolio examples from our past deployments tailored to your sector.
          </SectionParagraph>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-[0.15em] transition-all rounded-lg shadow-xl shadow-blue-900/30"
          >
            REQUEST RELEVANT PORTFOLIO
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealGroup>
      </section>

    </div>
  );
}
