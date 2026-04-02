import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { shortcutCategories } from '@/data/home'

export function CategoryShortcuts() {
  return (
    <section className="bg-white py-10 dark:bg-slate-950 sm:py-14">
      <div className="container">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Shop by category</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">Start with the collection you want most</h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base">Clear category entry points make it easier for shoppers to reach the right products fast.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400">
            Browse all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {shortcutCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`focus-ring group flex min-h-[220px] flex-col justify-between rounded-[2rem] border border-stone-200 ${category.color} p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900`}
              aria-label={`Browse ${category.label}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-black text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-50">{category.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{category.label}</h3>
                <p className="mt-2 text-sm">{category.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:translate-x-1">
                  Shop now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
