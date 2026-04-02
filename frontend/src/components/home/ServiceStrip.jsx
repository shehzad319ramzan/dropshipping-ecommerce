import { CreditCard, Gift, Headphones, RefreshCcw, ShieldCheck, Truck } from 'lucide-react'
import { serviceHighlights } from '@/data/home'

const iconMap = {
  truck: Truck,
  refresh: RefreshCcw,
  shield: ShieldCheck,
  gift: Gift,
  'credit-card': CreditCard,
  headphones: Headphones,
}

export function ServiceStrip() {
  return (
    <section className="border-y border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container grid gap-0 divide-y divide-stone-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-6 dark:divide-slate-800">
        {serviceHighlights.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <div key={item.id} className="flex items-center gap-3 px-4 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-emerald-600 dark:bg-slate-900">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-300">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
