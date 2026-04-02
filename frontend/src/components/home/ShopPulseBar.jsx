import { pulseMetrics } from '@/data/home'

export function ShopPulseBar() {
  return (
    <section className="border-b border-stone-200 bg-amber-50/80 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="container flex flex-col gap-4 py-4 text-sm md:flex-row md:items-center md:gap-8">
        {pulseMetrics.map((metric) => (
          <div key={metric.id} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${metric.tone === 'success' ? 'bg-emerald-500' : metric.tone === 'highlight' ? 'bg-amber-400' : 'bg-slate-400'}`} />
            <p className="text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-slate-50">{metric.value}</span>{' '}
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
