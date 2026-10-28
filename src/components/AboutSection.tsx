import React from 'react';
import { motion } from 'motion/react';
import { WORK_EXPERIENCE } from '../data/projects';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-black text-white px-6 sm:px-10 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-24">
        
        {/* Top Section: Left-aligned Portrait & Left-aligned About Bio on the same level */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Compact Left-Aligned Portrait Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 xl:col-span-4 flex flex-col items-start"
          >
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] rounded-sm overflow-hidden bg-neutral-900 border border-white/15 shadow-2xl">
              <img
                src="/assets/aistudio/IMG-20260919-WA0009_22186ff2.jpg"
                alt="Saloni Porwal - Production Designer"
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
              />

              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Portrait Label */}
              <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                <span className="text-[9px] tracking-[0.2em] text-neutral-300 uppercase font-sans block">
                  PORTFOLIO PROFILE
                </span>
                <span className="text-xs font-serif text-white tracking-wider">
                  Saloni Porwal
                </span>
              </div>
            </div>

            <p className="mt-4 text-[11px] sm:text-xs text-neutral-400 font-serif italic max-w-[280px] sm:max-w-[320px] tracking-wide leading-relaxed">
              &ldquo;Transforming cinematic narratives into tangible, atmospheric worlds.&rdquo;
            </p>
          </motion.div>

          {/* Right: Left-Aligned About Bio on the same level */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 xl:col-span-8 space-y-6 text-left"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-sans block mb-2">
                BACKGROUND & PROFILE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight font-normal text-white uppercase">
                ABOUT
              </h2>
            </div>

            <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-light">
              <p className="text-lg sm:text-xl font-serif text-white font-normal tracking-wide leading-snug">
                I build worlds for stories.
              </p>

              <p className="text-neutral-200">
                Worlds that exist on screen, but feel real enough to step into.
              </p>

              <p>
                I’m Saloni Porwal, a Mumbai-based Production Designer and Set Decorator. I create spaces that give stories a visual identity, from intimate, lived-in environments to expansive sets and imagined worlds.
              </p>

              <p>
                My process begins with understanding the story and the people within it. Who are they? Where do they come from? What does their world look and feel like? I translate these answers through culture, architecture, texture, colours, objects, and layers of detail.
              </p>

              <p>
                With 10+ years of experience, my journey from Set Designer to Production Designer has been shaped by learning, observing, experimenting, and understanding the craft from the ground up.
              </p>

              <p>
                I create spaces that don’t simply surround the characters, but become a part of their story and influence how the audience experiences it.
              </p>

              <p className="text-base sm:text-lg font-serif text-white font-bold leading-relaxed pt-2">
                Because when a set makes you want to step inside it, I know I’ve done my job.
              </p>
            </div>

            {/* Quick Statistics / Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-white">10+ Years</span>
                <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-sans uppercase">Industry Experience</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-white">100+</span>
                <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-sans uppercase">Film &amp; Brand Projects</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Full-Width Career Highlights / Selected Experience */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-16 border-t border-white/10 space-y-8"
        >
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-sans block mb-2">
              CAREER HIGHLIGHTS
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white uppercase tracking-tight">
              SELECTED EXPERIENCE
            </h3>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {WORK_EXPERIENCE.map((exp, index) => (
              <div
                key={index}
                className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group hover:bg-white/[0.02] px-3 -mx-3 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-serif text-white group-hover:text-neutral-200 transition-colors">
                    {exp.project}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light">
                    {exp.productionHouse}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="block text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans text-neutral-300">
                    {exp.role}
                  </span>
                  {exp.year && (
                    <span className="block text-[10px] sm:text-xs tracking-widest text-neutral-500 font-sans mt-1">
                      {exp.year}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
