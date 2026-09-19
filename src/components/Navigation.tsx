import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#' + sectionId);
    }
  };

  const navBackgroundClass =
    scrolled || !isHomePage
      ? 'bg-black/95 backdrop-blur-md border-b border-white/15 py-4 shadow-2xl'
      : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-6';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="group flex flex-col tracking-[0.25em] text-white uppercase font-sans text-xs sm:text-sm font-semibold transition-opacity hover:opacity-80"
        >
          <span className="text-sm sm:text-base font-medium tracking-[0.3em]">
            SALONI PORWAL
          </span>
          <span className="text-[9px] tracking-[0.35em] text-neutral-400 font-light mt-0.5 group-hover:text-white transition-colors">
            PRODUCTION DESIGNER
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-xs tracking-[0.25em] uppercase font-sans">
          <button
            onClick={() => handleNavClick('portfolio')}
            className="text-neutral-300 hover:text-white transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Portfolio
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className="text-neutral-300 hover:text-white transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="text-neutral-300 hover:text-white transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none aria-label='Toggle navigation menu'"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 border-b border-white/10 px-6 py-8 flex flex-col space-y-6 text-center text-sm tracking-[0.25em] uppercase font-sans animate-fadeIn">
          <button
            onClick={() => handleNavClick('portfolio')}
            className="text-neutral-200 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-neutral-200 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-neutral-200 hover:text-white py-2 cursor-pointer"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
