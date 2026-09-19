import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const sectionId = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="bg-black text-white">
      <HeroSlideshow />
      <PortfolioGrid />
      <AboutSection />
      <ContactSection />
    </div>
  );
};
