'use client'

import Link from 'next/link'

export function StaticPage({ title, subtitle, description, highlights = [], ctaLabel, ctaHref }) {
  return (
    <section className="min-h-[70vh] bg-stone-50 py-16 dark:bg-slate-950">
      <div className="container mx-auto space-y-8">
        <div className="rounded-[2rem] border border-stone-200 bg-white/95 p-10 shadow-[0px_30px_80px_rgba(15,23,42,0.15)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0px_30px_80px_rgba(2,6,23,0.8)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">{subtitle}</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-200">{description}</p>

          {highlights.length > 0 && (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {ctaLabel && ctaHref && (
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
              >
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
