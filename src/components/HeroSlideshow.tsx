import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data/projects';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback, proxyImageUrl } from './ImageWithFallback';

const ORDERED_HERO_IDS = [
  'farzi',
  'cadbury-celebrations-hawker',
  'npci-upi-security',
  'cadbury-politician',
  'au-bank-soch-badlo',
];

const HERO_SLIDES = ORDERED_HERO_IDS
  .map((id) => PROJECTS_DATA.find((p) => p.id === id))
  .filter((p): p is (typeof PROJECTS_DATA)[number] => Boolean(p));

export const HeroSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all hero slide images on component mount for instant transitions
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = proxyImageUrl(slide.thumbnail, 'hero');
    });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? HERO_SLIDES.length - 1 : prevIndex - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  }, []);

  // Auto-advance timer that resets whenever currentIndex changes
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [handleNext, currentIndex]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleScrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-end justify-center select-none pb-14 sm:pb-18">
      {/* Background Image Slideshow with Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <ImageWithFallback
            src={currentSlide.thumbnail}
            alt={currentSlide.title}
            preset="hero"
            loading="eager"
            fetchPriority="high"
            fallbackSeed={`hero-${currentSlide.slug}`}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Overlay Gradient Based on Project Specification */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-700"
        style={{
          background: `linear-gradient(to top, rgb(5 8 12 / ${
            currentSlide.overlay ?? 0.22
          }) 0%, rgb(5 8 12 / 0.06) 55%, transparent 78%)`,
        }}
      />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 z-10 pointer-events-none" />

      {/* Side Navigation Buttons (Back and Forth) */}
      <button
        id="hero-prev-button"
        onClick={handlePrev}
        aria-label="Previous image slide"
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 hover:border-white/60 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </button>

      <button
        id="hero-next-button"
        onClick={handleNext}
        aria-label="Next image slide"
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 hover:border-white/60 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>

      {/* Center-Aligned Foreground Content - Matching Reference Layout */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          key={`content-${currentSlide.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3"
        >
          {/* Main Name Heading - Match Font & Scale from Reference */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-white tracking-tight leading-none font-normal drop-shadow-lg text-center">
            Saloni Porwal
          </h1>

          {/* Subheading / Roles */}
          <p className="text-base sm:text-xl md:text-2xl text-white font-light tracking-wide text-center drop-shadow-md">
            Production Designer | Set Decorator
          </p>

          {/* Featured Project Single-Quote Caption */}
          <div className="pt-1 pb-3">
            <Link
              to={`/portfolio/${currentSlide.slug}`}
              className="text-xs sm:text-sm md:text-base font-semibold text-white/90 hover:text-white transition-colors tracking-wide drop-shadow inline-block"
            >
              &lsquo;{currentSlide.title}&rsquo;
            </Link>
          </div>

          {/* Dark Semi-Transparent 'Portfolio' Pill Button with Down Arrow */}
          <div className="pt-1 flex justify-center">
            <button
              id="hero-portfolio-scroll-btn"
              onClick={handleScrollToPortfolio}
              className="px-5 py-2.5 bg-black/75 hover:bg-black/95 text-white text-xs sm:text-sm font-sans tracking-wide border border-white/20 hover:border-white/50 transition-all duration-300 rounded-sm flex items-center space-x-2 cursor-pointer shadow-xl backdrop-blur-md"
            >
              <span>Portfolio</span>
              <ChevronDown size={15} className="text-white/80" />
            </button>
          </div>
        </motion.div>

        {/* Slide Indicator Bar Dots & Counter */}
        <div className="mt-6 flex items-center space-x-2 sm:space-x-3">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              id={`hero-indicator-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/50 ${
                idx === currentIndex
                  ? 'w-7 sm:w-8 bg-white shadow-sm'
                  : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
          <span className="text-[10px] sm:text-xs text-white/50 font-mono pl-1 tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')}/{String(HERO_SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};

