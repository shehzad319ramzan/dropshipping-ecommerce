import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function TopBanner() {
  return (
    <div className="border-b border-emerald-950/10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 text-slate-950 dark:border-white/10">
      <div className="container">
        <div className="flex min-h-12 flex-col items-center justify-center gap-2 py-2 text-center sm:flex-row sm:gap-3 sm:text-left">
          <div className="inline-flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>Spring store event: extra savings on this week's best sellers.</span>
          </div>
          <Link
            href="/shop"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-slate-950/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-slate-950/20"
          >
            Shop now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
