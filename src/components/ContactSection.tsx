import React from 'react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../data/projects';
import { Mail, Instagram, ArrowUpRight, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-black text-white px-6 sm:px-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with subtle fade-in slide-up */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 border-b border-white/10 pb-8"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-sans block mb-2">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight font-normal text-white">
            CONTACT
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Direct Contact Details */}
          <div className="space-y-8">
            <p className="text-neutral-300 font-sans text-sm sm:text-base font-light leading-relaxed">
              Available for freelance feature films, commercial campaigns, web series, and artistic art direction worldwide. Based in Mumbai, India.
            </p>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-white/15 text-white mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-sans block mb-0.5">
                    LOCATION
                  </span>
                  <span className="text-base font-serif text-white">
                    {CONTACT_INFO.location}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-white/15 text-white mt-1">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-sans block mb-0.5">
                    DIRECT EMAIL
                  </span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-base sm:text-lg font-serif text-white hover:underline underline-offset-4 decoration-white/50 transition-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Professional Links */}
          <div className="space-y-6 flex flex-col justify-between">
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-sans block">
              PORTFOLIO ARCHIVES & PROFILES
            </span>

            <div className="space-y-4">
              {/* Instagram */}
              <a
                href={CONTACT_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-white/15 hover:border-white bg-neutral-950 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <Instagram size={20} className="text-white" />
                  <div>
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-sans block">
                      INSTAGRAM
                    </span>
                    <span className="text-base font-serif text-white">
                      {CONTACT_INFO.instagram.handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Behance */}
              <a
                href={CONTACT_INFO.behance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-white/15 hover:border-white bg-neutral-950 flex items-center justify-between group transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-sans block mb-0.5">
                    BEHANCE PORTFOLIO
                  </span>
                  <span className="text-base font-serif text-white">
                    {CONTACT_INFO.behance.title}
                  </span>
                </div>
                <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* IMDb */}
              <a
                href={CONTACT_INFO.imdb.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-white/15 hover:border-white bg-neutral-950 flex items-center justify-between group transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-sans block mb-0.5">
                    IMDb CREDITS
                  </span>
                  <span className="text-base font-serif text-white">
                    {CONTACT_INFO.imdb.title}
                  </span>
                </div>
                <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT_INFO.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 border border-white/15 hover:border-white bg-neutral-950 flex items-center justify-between group transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-sans block mb-0.5">
                    LINKEDIN
                  </span>
                  <span className="text-base font-serif text-white">
                    {CONTACT_INFO.linkedin.title}
                  </span>
                </div>
                <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
