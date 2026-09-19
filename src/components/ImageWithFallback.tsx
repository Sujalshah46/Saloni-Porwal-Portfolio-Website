import React, { useState, useEffect, useRef } from 'react';

export type ImagePreset = 'hero' | 'grid' | 'thumb' | 'detail' | 'lightbox';

interface ImageWithFallbackProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'preset'> {
  src: string;
  alt: string;
  fallbackSeed?: string;
  preset?: ImagePreset;
}

export function proxyImageUrl(url: string, preset: ImagePreset = 'grid'): string {
  if (!url) return '';
  if (
    url.startsWith('/') ||
    url.startsWith('./') ||
    url.startsWith('data:') ||
    url.endsWith('.svg') ||
    url.includes('cloudinary.com') ||
    url.includes('res.cloudinary.com')
  ) {
    return url;
  }

  // Clean URL protocol
  const cleanUrl = url.replace(/^https?:\/\//, '');

  let width = 800;
  let quality = 80;

  switch (preset) {
    case 'hero':
      width = 1600;
      quality = 85;
      break;
    case 'grid':
    case 'thumb':
      width = 800;
      quality = 80;
      break;
    case 'detail':
      width = 1200;
      quality = 82;
      break;
    case 'lightbox':
      width = 1920;
      quality = 85;
      break;
  }

  // Use wsrv.nl image CDN proxy to compress heavy 3MB-10MB Behance PNGs into fast ~25KB WebP images
  return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&q=${quality}&output=webp`;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSeed,
  preset = 'grid',
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const currentPreset = (preset ?? 'grid') as ImagePreset;
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const isEager = loading === 'eager';
  const [isInView, setIsInView] = useState<boolean>(() => {
    if (isEager) return true;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return true;
    return false;
  });

  const [imgSrc, setImgSrc] = useState<string>(() => proxyImageUrl(src, currentPreset));
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);

  // IntersectionObserver effect for smart viewport-based lazy loading
  useEffect(() => {
    if (isEager || isInView) return;
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '800px 0px', // trigger download 800px before scrolling into view
        threshold: 0.001,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isEager, isInView]);

  useEffect(() => {
    setImgSrc(proxyImageUrl(src, currentPreset));
    setIsLoaded(false);
    setAttempt(0);
  }, [src, currentPreset]);

  // Handle cached or instantly loaded images
  useEffect(() => {
    if (isInView && imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imgSrc, isInView]);

  const handleError = () => {
    if (attempt === 0) {
      setAttempt(1);
      // Fallback 1: Direct original URL
      setImgSrc(src);
    } else if (attempt === 1) {
      setAttempt(2);
      // Fallback 2: High quality placeholder image
      const seed = fallbackSeed || alt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() || 'saloni-art';
      setImgSrc(`https://picsum.photos/seed/${seed}/1200/800`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-neutral-900">
      {/* Skeleton Loading Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse z-0" />
      )}

      {isInView && (
        <img
          {...props}
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          loading={isEager ? 'eager' : 'eager'} // IntersectionObserver handles lazy-triggering, so fetch immediately once in view
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

