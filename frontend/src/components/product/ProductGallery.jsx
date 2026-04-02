'use client'

import { useState } from 'react'

export function ProductGallery({ name, gallery }) {
  const [activeImage, setActiveImage] = useState(gallery[0])

  return (
    <div className="grid gap-4 lg:grid-cols-[110px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
        {gallery.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`focus-ring relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.25rem] border transition ${image === activeImage ? 'border-emerald-500' : 'border-stone-200 dark:border-slate-800'}`}
            aria-label={`View ${name} image`}
          >
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 relative min-h-[460px] overflow-hidden rounded-[2rem] border border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <img src={activeImage} alt={name} className="h-full w-full object-cover" />
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 backdrop-blur">360 view ready</div>
      </div>
    </div>
  )
}
