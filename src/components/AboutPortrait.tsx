import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, Sparkles } from 'lucide-react';

interface AboutPortraitProps {
  onImageChange?: (dataUrl: string) => void;
}

const STORAGE_KEY = 'saloni_portrait_custom_img';
const DEFAULT_IMAGE_PATH = '/saloni-porwal-portrait.png';

export const AboutPortrait: React.FC<AboutPortraitProps> = ({ onImageChange }) => {
  const [imageSrc, setImageSrc] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_IMAGE_PATH;
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setImageSrc(saved);
      setHasError(false);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          setHasError(false);
          try {
            localStorage.setItem(STORAGE_KEY, result);
          } catch {
            // If image is larger than 5MB localStorage limit, keep in memory
          }
          if (onImageChange) onImageChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImageSrc(result);
          setHasError(false);
          try {
            localStorage.setItem(STORAGE_KEY, result);
          } catch {
            // Ignore quota errors
          }
          if (onImageChange) onImageChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full bg-neutral-950 text-white pt-16 pb-8 px-6 sm:px-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Subtle Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-neutral-400 font-sans block mb-2">
            PRODUCTION DESIGNER &bull; ART DIRECTOR &bull; SET DECORATOR
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-white font-normal tracking-wide">
            Saloni Porwal
          </h3>
        </motion.div>

        {/* Portrait Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative group w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-sm overflow-hidden bg-neutral-900 border border-white/15 shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Portrait Image */}
          {!hasError ? (
            <img
              src={imageSrc}
              alt="Saloni Porwal - Production Designer"
              className="w-full h-full object-cover object-center grayscale contrast-105 filter transition-all duration-700 group-hover:scale-105"
              onError={() => setHasError(true)}
            />
          ) : (
            /* Fallback artistic placeholder with one-click upload */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-neutral-900 to-black text-neutral-300">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-4 bg-white/5">
                <Camera className="w-8 h-8 text-neutral-400" />
              </div>
              <h4 className="font-serif text-lg text-white mb-2">Portrait Photo</h4>
              <p className="text-xs text-neutral-400 font-sans max-w-xs mb-6 leading-relaxed">
                Drag and drop your portrait photo here, or click below to select the image file.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white text-black text-xs font-sans font-medium tracking-wider uppercase rounded-sm hover:bg-neutral-200 transition-colors flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Portrait</span>
              </button>
            </div>
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Action Button to Update/Replace Photo anytime */}
          <div className="absolute bottom-4 right-4 z-20">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Change portrait photo"
              className={`px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-sans tracking-wide rounded-sm border border-white/25 backdrop-blur-md transition-all duration-300 flex items-center space-x-1.5 shadow-xl cursor-pointer ${
                isHovered || hasError ? 'opacity-100' : 'opacity-75 sm:opacity-0 sm:group-hover:opacity-100'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-neutral-300" />
              <span className="hidden sm:inline text-[11px]">Change Photo</span>
            </button>
          </div>

          {/* Name overlay at the bottom of the portrait */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <span className="text-[10px] tracking-[0.2em] text-neutral-300 uppercase font-sans block">
              PORTFOLIO PROFILE
            </span>
            <span className="text-sm font-serif text-white tracking-wider">
              Saloni Porwal
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </motion.div>

        {/* Captivating quote / caption under the portrait */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xs sm:text-sm text-neutral-400 font-serif italic text-center max-w-lg tracking-wide"
        >
          &ldquo;Transforming cinematic narratives into tangible, atmospheric worlds.&rdquo;
        </motion.p>
      </div>
    </section>
  );
};
