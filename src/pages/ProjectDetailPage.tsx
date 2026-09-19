import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { LightboxModal } from '../components/LightboxModal';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projectIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
  const project = PROJECTS_DATA[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white pt-40 pb-20 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-serif mb-4">PROJECT NOT FOUND</h1>
        <p className="text-neutral-400 font-sans text-sm mb-8">
          The requested portfolio project could not be located.
        </p>
        <Link
          to="/"
          className="px-6 py-3 border border-white text-xs tracking-[0.25em] font-sans uppercase hover:bg-white hover:text-black transition-all"
        >
          RETURN TO PORTFOLIO
        </Link>
      </div>
    );
  }

  // Prev / Next project navigation
  const prevProject =
    PROJECTS_DATA[(projectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject = PROJECTS_DATA[(projectIndex + 1) % PROJECTS_DATA.length];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-black text-white pt-28 sm:pt-36 pb-24 px-6 sm:px-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Back Link */}
        <div>
          <button
            onClick={() => navigate('/#portfolio')}
            className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] font-sans text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={16}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            <span>BACK TO PORTFOLIO</span>
          </button>
        </div>

        {/* Video Preview / Main Media Banner (COMES FIRST AT TOP) */}
        <div className="w-full">
          {project.videoUrl ? (
            <div className="relative w-full aspect-video border border-white/15 bg-neutral-950 overflow-hidden shadow-2xl">
              <iframe
                src={project.videoUrl}
                title={`${project.title} Video Preview`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video border border-white/15 bg-neutral-950 overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={project.thumbnail}
                alt={`${project.title} Preview`}
                preset="detail"
                loading="eager"
                fetchPriority="high"
                fallbackSeed={`detail-${project.slug}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Title & Metadata Block (COMES BELOW VIDEO PREVIEW - MATCHING REFERENCE IMAGE) */}
        <div className="space-y-8 pt-2">
          {/* Category Badge & Release Year */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-300 font-sans">
              {project.category}
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-sans">
              RELEASED {project.year}
            </span>
          </div>

          {/* Project Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          {/* Horizontal Divider */}
          <div className="border-b border-white/15" />

          {/* Credits Summary List */}
          <div
            className={`grid grid-cols-2 ${
              project.credits.brand || project.category === 'Commercials'
                ? 'sm:grid-cols-4'
                : 'sm:grid-cols-3'
            } gap-6`}
          >
            <div>
              <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-sans block mb-1">
                DIRECTOR
              </span>
              <span className="text-base sm:text-lg font-serif text-white">
                {project.credits.director || '—'}
              </span>
            </div>

            <div>
              <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-sans block mb-1">
                PRODUCTION HOUSE
              </span>
              <span className="text-base sm:text-lg font-serif text-white">
                {project.credits.productionHouse || '—'}
              </span>
            </div>

            {(project.credits.brand || project.category === 'Commercials') && (
              <div>
                <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-sans block mb-1">
                  BRAND
                </span>
                <span className="text-base sm:text-lg font-serif text-white">
                  {project.credits.brand || '—'}
                </span>
              </div>
            )}

            <div>
              <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-sans block mb-1">
                ROLE
              </span>
              <span className="text-base sm:text-lg font-serif text-white">
                {project.credits.role}
              </span>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
              GALLERY STILLS
            </h2>
            <span className="text-xs text-neutral-400 font-sans tracking-widest uppercase">
              {project.gallery.length} STILLS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((imgUrl, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] border border-white/15 bg-neutral-950 overflow-hidden cursor-pointer hover:border-white transition-all duration-300"
              >
                <ImageWithFallback
                  src={imgUrl}
                  alt={`${project.title} Still ${index + 1}`}
                  preset="thumb"
                  loading={index < 6 ? 'eager' : 'lazy'}
                  fallbackSeed={`gallery-${project.slug}-${index}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <div className="p-3 border border-white/40 bg-black/80 flex items-center space-x-2 text-xs tracking-widest uppercase font-sans">
                    <Maximize2 size={16} />
                    <span>ENLARGE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Project Navigation */}
        <div className="border-t border-white/10 pt-12 mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to={`/portfolio/${prevProject.slug}`}
            className="w-full sm:w-auto p-6 border border-white/15 hover:border-white bg-neutral-950 flex items-center space-x-4 group transition-all"
          >
            <ChevronLeft size={20} className="text-neutral-400 group-hover:text-white transform group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-sans block">
                PREVIOUS PROJECT
              </span>
              <span className="text-base font-serif text-white">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            to={`/portfolio/${nextProject.slug}`}
            className="w-full sm:w-auto p-6 border border-white/15 hover:border-white bg-neutral-950 flex items-center justify-between sm:justify-end space-x-4 group transition-all text-right"
          >
            <div>
              <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-sans block">
                NEXT PROJECT
              </span>
              <span className="text-base font-serif text-white">
                {nextProject.title}
              </span>
            </div>
            <ChevronRight size={20} className="text-neutral-400 group-hover:text-white transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={project.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        projectTitle={project.title}
      />
    </div>
  );
};
