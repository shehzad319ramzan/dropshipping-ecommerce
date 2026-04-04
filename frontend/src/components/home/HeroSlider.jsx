'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '@/data/home';

export function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = heroSlides[idx];

  const getOverlay = (accent) => {
    if (accent === 'emerald') return 'from-black/70 via-black/40 to-transparent'; // keeping dark theme for readability as requested by design
    if (accent === 'amber') return 'from-black/75 via-black/35 to-transparent';
    return 'from-black/70 via-black/40 to-transparent';
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(400px, 55vw, 620px)' }}>
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={idx + '-bg'}
          src={s.image}
          alt={s.title}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getOverlay(s.accent)}`} />

      {/* Content */}
      <div className="relative h-full flex items-center z-10">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx + '-content'}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide shadow">
                {s.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 drop-shadow-md">
                {s.title}
              </h1>
              <p className="text-white/85 text-base sm:text-lg mb-6 leading-relaxed">{s.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/shop">
                  <button type="button" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black h-12 px-8 rounded-full shadow-lg text-sm transition-colors">
                    {s.primaryCta} →
                  </button>
                </Link>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-full border border-white/30">
                  {s.secondaryCta}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-yellow-400 w-7' : 'bg-white/50 w-2 hover:bg-white/80'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        type="button"
        onClick={() => setIdx(i => (i - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-x-1 sm:translate-x-0 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => setIdx(i => (i + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 translate-x-1 sm:translate-x-0 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
