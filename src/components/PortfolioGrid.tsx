import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryType, Project } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const CATEGORIES: CategoryType[] = [
  'All',
  'Movies',
  'Web Series',
  'Commercials',
  'Promos/Music Video',
];

export const PortfolioGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => {
          if (activeCategory === 'Promos/Music Video') {
            return (
              (project.category as string) === 'Promos/Music Video' ||
              (project.category as string) === 'Promos' ||
              (project.category as string) === 'Music Videos' ||
              (project.category as string) === 'Promos / Music Videos'
            );
          }
          return project.category === activeCategory;
        });

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-black text-white px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header with Fade-in and Slide-up */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center justify-center mb-12 border-b border-white/10 pb-8"
      >
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-sans block mb-2">
            SELECTED WORKS (2018 — 2024)
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight font-normal text-white">
            PORTFOLIO
          </h2>
        </div>
        <div className="mt-3 text-xs text-neutral-400 font-sans tracking-widest uppercase">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'} SHOWN
        </div>
      </motion.div>

      {/* Filter Tabs / Pills with Fade-in and Slide-up */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 border-b border-white/10 pb-6"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-sans transition-all duration-300 border cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white font-medium'
                  : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </motion.div>

      {/* Animated Responsive Grid - 3x3 Widescreen (16:9) Layout with Staggered Fade-in and Slide-up */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2.5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min((index % 9) * 0.045, 0.36),
              }}
              className="group relative bg-neutral-950 overflow-hidden aspect-video w-full flex flex-col justify-end border border-white/10 hover:border-white/40 transition-colors"
            >
              {/* Widescreen Thumbnail Image */}
              <ImageWithFallback
                src={project.thumbnail}
                alt={`${project.title} — ${project.category} (${project.year})`}
                preset="grid"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                fallbackSeed={`grid-${project.slug}`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.035] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />

              {/* Bottom-to-Top Dark Gradient Overlay Sized to Project Specification */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to top, rgb(5 8 12 / ${
                    project.overlay ?? 0.22
                  }) 0%, rgb(5 8 12 / 0.06) 55%, transparent 78%)`,
                }}
              />

              {/* Hover Dark Overlay (Full Cinematic Fade) */}
              <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] tracking-[0.25em] uppercase font-sans text-neutral-400">
                    {project.category}
                  </span>
                  <div className="p-1.5 border border-white/30 rounded-full text-white group-hover:border-white transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.2em] text-neutral-400 font-sans block mb-0.5">
                    {project.year}
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-serif text-white leading-tight mb-1"
                    style={{ textShadow: '0 2px 18px rgb(0 0 0 / 0.45)' }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-[11px] text-neutral-300 font-sans line-clamp-1 font-light mb-2">
                    {project.credits.role}
                  </p>

                  <div className="w-0 group-hover:w-full h-[1px] bg-white transition-all duration-500" />
                </div>
              </div>

              {/* Bottom Card Labels (Visible when not hovering) with readable text shadow */}
              <div
                className="relative z-10 p-3 sm:p-4 pointer-events-none group-hover:opacity-0 transition-opacity duration-300 flex justify-between items-end"
                style={{ textShadow: '0 2px 18px rgb(0 0 0 / 0.45)' }}
              >
                <div>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-300 uppercase font-sans block mb-0.5">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="text-sm sm:text-base font-serif text-white font-medium leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Click Target Route Link */}
              <Link
                to={`/portfolio/${project.slug}`}
                className="absolute inset-0 z-20"
                aria-label={`View project details for ${project.title}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-neutral-500 font-sans text-xs tracking-widest uppercase">
          No projects found in this category.
        </div>
      )}
    </section>
  );
};
