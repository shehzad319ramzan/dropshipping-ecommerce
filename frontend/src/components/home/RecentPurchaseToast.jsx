'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { recentPurchases } from '@/data/home'

export function RecentPurchaseToast() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % recentPurchases.length)
    }, 3600)

    return () => window.clearInterval(interval)
  }, [])

  const activePurchase = recentPurchases[activeIndex]

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-[290px] sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePurchase.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="overflow-hidden rounded-[1.1rem] border border-amber-100/80 bg-white/95 p-3 shadow-[0_16px_36px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
          aria-live="polite"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live Sale
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 ring-1 ring-amber-200/80 dark:from-amber-400/20 dark:to-orange-400/10 dark:text-amber-300 dark:ring-amber-400/20">
              <ShoppingBag className="h-3.5 w-3.5" />
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-5 text-slate-900 dark:text-slate-50">
                <span className="text-slate-700 dark:text-slate-200">{activePurchase.customer}</span>{' '}
                bought{' '}
                <span className="text-amber-700 dark:text-amber-300">{activePurchase.product}</span>
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-300">
                <span>{activePurchase.location}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">${activePurchase.price}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span>{activePurchase.minutesAgo} min ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
