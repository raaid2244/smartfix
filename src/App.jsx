import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExpertisePage from './pages/ExpertisePage';
import IndustriesPage from './pages/IndustriesPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';

import GlobalCTA from './components/GlobalCTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on every route change, killing stale GSAP triggers
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // 1. Instant scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Kill all stale ScrollTrigger instances from the previous page
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // 3. After next frame, refresh and re-assert top position
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600/10 selection:text-blue-700 flex flex-col justify-between">
        
        {/* Navigation Header */}
        <Navbar />

        {/* Main Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <GlobalCTA />
        <FloatingWhatsApp />
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
