import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-neutral-400 py-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs tracking-[0.25em] font-sans uppercase space-y-4 sm:space-y-0">
        <div>
          © {new Date().getFullYear()} SALONI PORWAL. ALL RIGHTS RESERVED.
        </div>
        <div className="text-[10px] text-neutral-500">
          PRODUCTION DESIGN · ART DIRECTION · SET DECORATION
        </div>
      </div>
    </footer>
  );
};
