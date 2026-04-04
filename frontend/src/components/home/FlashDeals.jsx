'use client'

import { Clock3, ArrowRight, Flame, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { flashDeals } from '@/data/home'

export function FlashDeals() {
  const deals = flashDeals.slice(0, 4)
  // Duplicate array multiple times to ensure seamless infinite scrolling
  const sliderDeals = [...deals, ...deals, ...deals, ...deals]

  return (
    <section className="relative overflow-hidden bg-stone-50 py-12 sm:py-16 dark:bg-slate-950">
      <div className="container relative z-10">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-brand-green/10 px-4 py-2 text-sm font-bold text-brand-green">
              <Flame className="h-4 w-4 animate-pulse text-brand-green" />
              HOT DEALS NOW ON
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 sm:text-5xl">Flash Deals</h2>
              
              <div className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Clock3 className="ml-2 h-5 w-5 text-brand-primary" />
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-stone-100 text-lg font-black text-slate-900 dark:bg-slate-800 dark:text-slate-50">
                      {['05', '22', '19'][i]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600 transition hover:text-brand-green dark:text-slate-400">
            View all deals
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 dark:bg-slate-800 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-4 overflow-hidden w-full">
        <div className="flex w-max gap-5 pr-5 animate-marquee hover:[animation-play-state:paused]">
          {sliderDeals.map((deal, idx) => (
            <article 
              key={`${deal.id}-${idx}`} 
              className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/50 bg-white rounded-lg dark:bg-slate-900 w-[240px] shrink-0 border border-slate-100 dark:border-slate-800"
            >
              <Link href={`/shop/${deal.slug || '#'}`} className="relative block overflow-hidden aspect-square bg-stone-100 dark:bg-slate-950 w-full">
                <img src={deal.image} alt={deal.title} className="h-full w-full object-cover transition duration-300 hover:opacity-90" />
              </Link>

              <div className="flex flex-col pt-3 px-2 pb-2">
                <Link href={`/shop/${deal.slug || '#'}`}>
                  <h3 className="line-clamp-1 text-[13px] text-slate-600 hover:underline dark:text-slate-300">
                    {deal.title}
                  </h3>
                </Link>
                
                <div className="mt-1 flex flex-wrap items-center justify-between gap-1">
                  <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1">
                    <span className="text-[17px] font-bold text-slate-900 dark:text-slate-50">${deal.price.toFixed(2)}</span>
                    {deal.originalPrice && (
                      <span className="text-[11px] text-slate-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="text-[11px] text-slate-500">{Math.floor(deal.discount * 0.8)}K+ sold</span>
                    {deal.discount && (
                      <span className="rounded border border-orange-400 px-1 py-[1px] text-[9px] font-bold leading-none text-orange-500">
                        -{deal.discount}%
                      </span>
                    )}
                  </div>
                  
                  <button type="button" className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition-colors hover:bg-slate-100 shrink-0 shadow-sm">
                    <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                  </button>
                </div>
                
                <div className="mt-1.5 flex items-center gap-1">
                  <div className="flex text-slate-900 dark:text-slate-100">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-slate-900 fill-current dark:text-slate-100" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{deal.originalPrice * 2}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
