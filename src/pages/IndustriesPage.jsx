import React, { useEffect } from 'react';
import IndustriesHero from '../components/industries/IndustriesHero';
import IndustriesGrid from '../components/industries/IndustriesGrid';
import IndustriesSolutions from '../components/industries/IndustriesSolutions';
import IndustriesEcosystem from '../components/industries/IndustriesEcosystem';
import IndustriesWhyUs from '../components/industries/IndustriesWhyUs';

export default function IndustriesPage() {
  
  // Ensure the page scrolls to the top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-500/30">
      <IndustriesHero />
      <IndustriesGrid />
      <IndustriesSolutions />
      <IndustriesEcosystem />
      <IndustriesWhyUs />
    </div>
  );
}
