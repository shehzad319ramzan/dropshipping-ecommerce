'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, Tag } from 'lucide-react'
import { heroSlides } from '@/data/home'

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const activeSlide = heroSlides[activeIndex]
  const isEmerald = activeSlide.accent === 'emerald'

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white">
      <div className="container py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimatePresence mode="wait">
            <motion.div key={activeSlide.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-amber-300" />
                {activeSlide.eyebrow}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl font-sans text-[42px] font-black leading-[42px] text-white sm:text-[52px] sm:leading-[52px] lg:text-[60px] lg:leading-[60px]">{activeSlide.title}</h1>
                <p className="max-w-lg text-lg text-emerald-50/90">{activeSlide.description}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/shop" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-stone-100">{activeSlide.primaryCta}</Link>
                <Link href="/shop" className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition ${isEmerald ? 'bg-white/12 text-white hover:bg-white/18' : 'bg-amber-400 text-slate-900 hover:bg-amber-300'}`}>
                  <Tag className="h-4 w-4" />
                  {activeSlide.secondaryCta}
                </Link>
              </div>
              <div className="grid max-w-xl gap-3 sm:grid-cols-3">
                {['Single-brand product story', 'Product-first shopping flow', 'Cleaner, easier browsing'].map((point) => (
                  <div key={point} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-sm">{point}</div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[430px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeSlide.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="absolute inset-0 rounded-[2rem] bg-white/15 p-4 backdrop-blur-sm">
                <div className="relative h-full overflow-hidden rounded-[1.75rem]">
                  <img src={activeSlide.image} alt={activeSlide.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/35 via-transparent to-white/20" />
                  <div className="absolute right-5 top-5 rounded-[1.5rem] bg-white/85 px-5 py-4 text-slate-900 shadow-soft backdrop-blur-sm">
                    <p className="text-sm text-slate-500">Starting from</p>
                    <p className="text-3xl font-black text-orange-500">{activeSlide.priceNote}</p>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/86 p-4 text-slate-900 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Featured edit</p>
                    <p className="mt-2 text-lg font-semibold">Clean silhouettes, warm pricing cues, and a simpler path to products.</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button key={slide.id} type="button" onClick={() => setActiveIndex(index)} className={`h-2.5 rounded-full transition ${index === activeIndex ? 'w-10 bg-white' : 'w-2.5 bg-white/35'}`} aria-label={`Go to slide ${index + 1}`} aria-pressed={index === activeIndex} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setActiveIndex((current) => current === 0 ? heroSlides.length - 1 : current - 1)} className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20" aria-label="Previous slide"><ArrowLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => setActiveIndex((current) => (current + 1) % heroSlides.length)} className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20" aria-label="Next slide"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
