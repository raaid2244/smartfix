import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import logo from '../assets/logo-colorful-transparent.png';
import SmartFixTitle from './SmartFixTitle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const location = useLocation();
  const isExpertisePage = location.pathname === '/expertise';

  useEffect(() => {
    let ticking = false;

    const updateNavbarTheme = () => {
      // Basic scrolled state for whether we're at the top or not
      setScrolled(window.scrollY > 20);

      const navbar = document.querySelector('header');
      if (navbar) {
        // Find elements under the center of the navbar
        const rect = navbar.getBoundingClientRect();
        const yPos = rect.top + rect.height / 2;
        const xPos = window.innerWidth / 2;
        
        const elements = document.elementsFromPoint(xPos, yPos);
        let darkFound = false;
        
        for (const el of elements) {
          if (
            el.classList.contains('bg-black') || 
            el.classList.contains('bg-slate-900') ||
            el.classList.contains('bg-slate-950') ||
            el.hasAttribute('data-dark-hero')
          ) {
            darkFound = true;
            break;
          }
        }
        
        // Also ensure Expertise hero is dark before scroll
        if (isExpertisePage && window.scrollY < 100) {
          darkFound = true;
        }

        setIsDarkBackground(darkFound);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbarTheme);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check (delay slightly to ensure DOM is rendered)
    setTimeout(updateNavbarTheme, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isExpertisePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Use dynamic dark background check for styling
  const isDarkHeroMode = isDarkBackground;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Expertise', path: '/expertise' },
    { name: 'Industries', path: '/industries' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDarkHeroMode
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-sm shadow-black/20 py-2'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2'
          : isDarkHeroMode 
            ? 'bg-transparent py-6' 
            : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center gap-4 group">
              <div className={`transition-all duration-500 overflow-hidden flex items-center justify-center translate-x-1.5 group-hover:scale-105 ${
                scrolled 
                  ? 'w-0 h-0 opacity-0 opacity-0 pointer-events-none -ml-4' 
                  : 'w-12 h-12 sm:w-14 sm:h-14 opacity-100'
              }`}>
                <img 
                  src={logo} 
                  alt="SMART FIX SOLUTIONS" 
                  className="w-full h-full object-contain"
                />
              </div>
            <div className="flex flex-col justify-center">
              <span className={`font-montserrat font-bold tracking-[0.3em] whitespace-nowrap transition-colors duration-300 ${isDarkHeroMode ? 'text-white' : 'text-slate-900'} text-sm lg:text-base`}>
                SMART FIX SOLUTIONS
              </span>
              <span className={`text-[9px] sm:text-[10px] ${isDarkHeroMode ? 'text-slate-400' : 'text-slate-500'} font-mono tracking-widest uppercase mt-0.5 hidden sm:block font-bold transition-colors duration-300`}>
                ENTERPRISE SECURITY & NETWORK
              </span>
            </div>
            </Link>
          </div>

          {/* Right Side: Navigation & CTA */}
          <div className="flex flex-1 items-center justify-end gap-6 lg:gap-8">
            
            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center">
              <div className={`backdrop-blur-md rounded-full px-2 py-1.5 flex items-center shadow-inner transition-colors duration-300 ${isDarkHeroMode ? 'bg-white/10 border border-white/20' : 'bg-slate-50/80 border border-slate-200'}`}>
              {navLinks.filter(l => !l.mobileOnly).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    relative px-5 py-2.5 text-xs font-bold font-sans tracking-wide transition-all duration-300 rounded-full flex items-center gap-1.5
                    ${isActive 
                      ? 'text-white bg-blue-600 shadow-md shadow-blue-500/20' 
                      : isDarkHeroMode 
                        ? 'text-slate-300 hover:text-white hover:bg-white/10'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }
                  `}
                >
                  {link.name}
                  {/* Removed ChevronDown as per user request */}
                </NavLink>
              ))}
            </div>
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className={`hidden lg:flex px-6 py-3 font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-md rounded-full items-center gap-2 ${isDarkHeroMode ? 'bg-white text-slate-900 hover:bg-blue-50' : 'bg-slate-900 hover:bg-blue-600 text-white'}`}
              >
                LET'S TALK
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden p-2 rounded-full transition-colors ${isDarkHeroMode ? 'text-white bg-white/10' : 'text-slate-900 bg-slate-100'}`}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 overflow-y-auto"
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    block px-6 py-4 rounded-2xl text-lg font-bold transition-colors
                    ${isActive ? 'bg-cyan-50 text-cyan-700 border border-cyan-100' : 'text-slate-700 hover:bg-slate-50'}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
