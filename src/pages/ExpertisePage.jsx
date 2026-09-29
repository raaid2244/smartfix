import React from 'react';
import ExpertiseHero from '../components/ExpertiseHero';
import ExpertiseCoreOverview from '../components/expertise/ExpertiseCoreOverview';
import ExpertiseSecurity from '../components/expertise/ExpertiseSecurity';
import ExpertiseNetwork from '../components/expertise/ExpertiseNetwork';
import ExpertiseInfra from '../components/expertise/ExpertiseInfra';
import ExpertiseIntegration from '../components/expertise/ExpertiseIntegration';
import ExpertiseSupport from '../components/expertise/ExpertiseSupport';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ExpertisePage() {
  useEffect(() => {
    // Force scroll to top first
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Refresh ScrollTrigger after all elements are loaded and rendered
    // Use a slight delay, then re-assert scroll top afterwards
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      // Re-assert top position after refresh in case GSAP moved it
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);

    window.addEventListener('resize', () => ScrollTrigger.refresh());

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="page-transition bg-white min-h-screen">
      <ExpertiseHero />
      <ExpertiseCoreOverview />
      <ExpertiseSecurity />
      <ExpertiseNetwork />
      <ExpertiseInfra />
      <ExpertiseIntegration />
      <ExpertiseSupport />
    </div>
  );
}
