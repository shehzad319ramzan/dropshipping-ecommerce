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
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-[320px] sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePurchase.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="rounded-[1.25rem] border border-stone-200 bg-white/96 p-4 shadow-lift backdrop-blur dark:border-slate-800 dark:bg-slate-900/96"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{activePurchase.customer} just bought {activePurchase.product}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{activePurchase.location} · ${activePurchase.price} · {activePurchase.minutesAgo} min ago</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
