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
    // Refresh ScrollTrigger after all elements are loaded and rendered
    const handleRefresh = () => ScrollTrigger.refresh();
    
    // Initial refresh with slight delay to ensure DOM is ready
    const timer = setTimeout(handleRefresh, 200);
    
    window.addEventListener('resize', handleRefresh);
    window.addEventListener('load', handleRefresh);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
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
