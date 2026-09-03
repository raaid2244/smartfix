import React from 'react';
import { RevealLine } from './RevealGroup';
import { RevealHeading } from './RevealHeading';

export function SectionEyebrow({ number, label, align = "left", className = "", accentColor = "bg-blue-600", variant = "line" }) {
  if (variant === "pill") {
    return (
      <div className={`section-eyebrow inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${accentColor} animate-pulse`} />
        <span className={`text-[11px] font-mono font-bold text-slate-500 tracking-[0.25em] uppercase`}>{label}</span>
      </div>
    );
  }

  const justifyClass = align === 'center' ? 'justify-center' : (align === 'right' ? 'justify-end' : 'justify-start');

  return (
    <div className={`section-eyebrow flex items-center ${justifyClass} gap-4 mb-6 ${className}`}>
      <span className={`w-8 h-[1px] shrink-0 ${accentColor}`} />
      <span className="text-[11px] font-mono font-bold text-slate-500 tracking-[0.25em] uppercase text-center">
        {number ? `${number} // ${label}` : label}
      </span>
      <span className={`w-8 h-[1px] shrink-0 ${accentColor}`} />
    </div>
  );
}

export function SectionHeading({ children, className = "" }) {
  return (
    <RevealHeading className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8 ${className}`}>
      {children}
    </RevealHeading>
  );
}

export function SectionParagraph({ children, className = "" }) {
  return (
    <p className={`section-paragraph text-xl md:text-2xl text-slate-600 font-light leading-relaxed mb-10 ${className}`}>
      {children}
    </p>
  );
}

export function TechLabel({ children, dotColor = "bg-slate-400", className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`w-1.5 h-1.5 ${dotColor} shrink-0`} />
      <span className="text-sm font-mono tracking-wide text-slate-600 uppercase">
        {children}
      </span>
    </div>
  );
}
