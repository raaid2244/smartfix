import React, { forwardRef } from 'react';

const SectionEyebrow = forwardRef(({ label, text, align = "center", className = "", lightMode = false }, ref) => {
  const displayText = label || text;
  const lineClass = `w-8 h-[1px] block origin-left ${lightMode ? 'bg-blue-400' : 'bg-blue-600'}`;
  const textClass = `eyebrow-text text-[11px] font-mono font-bold tracking-[0.25em] uppercase ${lightMode ? 'text-slate-400' : 'text-slate-500'}`;
  
  return (
    <div ref={ref} className={`flex items-center ${align === 'center' ? 'justify-center' : 'justify-start'} gap-4 mb-6 ${className}`}>
      <span className={`eyebrow-left-line ${lineClass}`} />
      <span className={textClass}>{displayText}</span>
      <span className={`eyebrow-right-line ${lineClass}`} />
    </div>
  );
});

export default SectionEyebrow;
