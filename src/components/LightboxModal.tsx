import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback, proxyImageUrl } from './ImageWithFallback';

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  projectTitle: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  projectTitle,
}) => {
  // Preload previous and next images in lightbox for instantaneous switching
  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    const imgNext = new Image();
    imgNext.src = proxyImageUrl(images[nextIndex], 'lightbox');

    const imgPrev = new Image();
    imgPrev.src = proxyImageUrl(images[prevIndex], 'lightbox');
  }, [isOpen, currentIndex, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-neutral-400 font-sans uppercase block">
            GALLERY LIGHTBOX
          </span>
          <h3 className="text-lg font-serif">{projectTitle}</h3>
        </div>

        {/* Counter & Close */}
        <div className="flex items-center space-x-6">
          <span className="text-xs tracking-[0.25em] font-sans text-neutral-400 uppercase">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
            aria-label="Close image lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 bg-black/70 border border-white/20 hover:border-white text-white transition-all cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Center Image with thin white border */}
        <div className="relative max-w-5xl max-h-[75vh] p-2 border border-white/20 bg-black shadow-2xl">
          <ImageWithFallback
            src={images[currentIndex]}
            alt={`${projectTitle} still ${currentIndex + 1}`}
            preset="lightbox"
            loading="eager"
            fallbackSeed={`lightbox-${projectTitle}-${currentIndex}`}
            className="max-h-[70vh] w-auto max-w-full object-contain filter grayscale-[15%]"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 bg-black/70 border border-white/20 hover:border-white text-white transition-all cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Footer Instructions */}
      <div className="text-center text-[10px] tracking-[0.2em] font-sans text-neutral-500 uppercase border-t border-white/10 pt-4">
        USE LEFT / RIGHT ARROWS OR CLICK TO NAVIGATE · PRESS ESC TO CLOSE
      </div>
    </div>
  );
};
