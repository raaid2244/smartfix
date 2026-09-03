import React from 'react';

/**
 * SmartFixTitle component enforces exact brand typography & colors matching official logo:
 * - SMART FIX -> Montserrat Bold / ExtraBold (700/800) in dark charcoal (#0f172a), letter-spacing: 0.15em
 * - SOLUTIONS -> Montserrat Medium (500) in dark slate (#334155), letter-spacing: 0.35em
 */
export default function SmartFixTitle({
  fixText = "SMART FIX",
  solutionsText = "SOLUTIONS",
  showSolutions = true,
  useSemiBold = false,
  className = "",
  gradient = false, // default to false to match official logo font, style & color (Image 2)
  size = "text-base sm:text-lg",
  forceWhite = false, // added to support dark backgrounds
}) {
  const fixWeightClass = useSemiBold ? "font-bold" : "font-extrabold";

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-[0.35em] leading-tight font-montserrat ${gradient ? "logo-text-gradient" : ""} ${className}`}>
      <span className={`title-smart-fix ${fixWeightClass} ${size} ${gradient ? "" : (forceWhite ? "text-white" : "text-slate-900")}`} style={{ letterSpacing: '0.15em' }}>
        {fixText}
      </span>
      {showSolutions && solutionsText && (
        <span className={`title-solutions font-medium ${size} ${gradient ? "" : (forceWhite ? "text-slate-300" : "text-slate-700")}`} style={{ letterSpacing: '0.35em' }}>
          {solutionsText}
        </span>
      )}
    </span>
  );
}
