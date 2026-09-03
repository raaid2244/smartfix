import React from 'react';
import SmartFixTitle from './SmartFixTitle';

export default function PageHeader({ eyebrow, title, subtitle }) {
  const renderFormattedText = (text) => {
    if (typeof text !== 'string') return text;
    if (text.includes('SMART FIX SOLUTIONS')) {
      const parts = text.split('SMART FIX SOLUTIONS');
      return (
        <span className="inline-flex items-center flex-wrap gap-1">
          {parts[0]}
          <SmartFixTitle size="text-xs" gradient={false} />
          {parts[1]}
        </span>
      );
    } else if (text.includes('SMART FIX')) {
      const parts = text.split('SMART FIX');
      return (
        <span className="inline-flex items-center flex-wrap gap-1">
          {parts[0]}
          <SmartFixTitle showSolutions={false} size="text-xs" gradient={false} />
          {parts[1]}
        </span>
      );
    }
    return text;
  };

  return (
    <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 overflow-hidden bg-white">
      {/* Background Soft Mesh Glow */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-80 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
            <span>{renderFormattedText(eyebrow)}</span>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-4 whitespace-pre-line font-sans logo-text-gradient">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-600 font-sans text-base sm:text-xl max-w-3xl leading-relaxed font-normal border-l-2 border-amber-400 pl-4">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
