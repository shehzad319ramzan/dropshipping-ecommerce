import { Clock3, Zap } from 'lucide-react'
import { flashDeals } from '@/data/home'

export function FlashDeals() {
  return (
    <section className="bg-gradient-to-r from-red-500 via-orange-500 to-orange-400 py-8 text-white sm:py-10">
      <div className="container">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-lg font-semibold backdrop-blur-sm">
              <Zap className="h-5 w-5 text-amber-200" />
              Flash Deals
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900">
              <Clock3 className="h-4 w-4 text-orange-500" />
              Ends in 05 : 22 : 19
            </div>
          </div>
          <button type="button" className="text-sm font-semibold text-white underline underline-offset-4">View all</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {flashDeals.map((deal) => (
            <article key={deal.id} className="overflow-hidden rounded-[1.5rem] bg-white text-slate-900 shadow-lift transition hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">-{deal.discount}%</div>
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{deal.category}</p>
                <h3 className="line-clamp-2 text-base font-semibold">{deal.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-emerald-600">${deal.price}</span>
                  <span className="text-sm text-slate-400 line-through">${deal.originalPrice}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
