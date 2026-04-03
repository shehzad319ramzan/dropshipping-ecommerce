import Link from 'next/link'
import {
  Armchair,
  Baby,
  CookingPot,
  LaptopMinimal,
  PillBottle,
  UserRound,
} from 'lucide-react'
import { shortcutCategories } from '@/data/home'

const iconMap = {
  devices: LaptopMinimal,
  beauty: PillBottle,
  kids: Baby,
  kitchen: CookingPot,
  spa: UserRound,
  decor: Armchair,
}

const flashCountdown = [
  { label: 'Days', value: '01' },
  { label: 'Hours', value: '23' },
  { label: 'Minutes', value: '58' },
  { label: 'Seconds', value: '43' },
]

export function CategoryShortcuts() {
  const sliderCategories = [...shortcutCategories, ...shortcutCategories]

  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,183,0,0.12),_transparent_28%),linear-gradient(180deg,_rgba(250,250,249,0.98)_0%,_rgba(236,253,245,0.75)_100%)] py-12 dark:bg-[radial-gradient(circle_at_top,_rgba(255,183,0,0.08),_transparent_24%),linear-gradient(180deg,_rgba(2,6,23,1)_0%,_rgba(6,78,59,0.28)_100%)] sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-3xl font-extrabold text-slate-950 dark:text-slate-50 sm:text-4xl">Flash Sale Starts Now</p>
          <p className="mt-3 text-base text-slate-700 dark:text-slate-200">
            20% off selected items with code: <span className="font-semibold tracking-[0.2em] text-amber-500 dark:text-amber-300">FLASH20</span>
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {flashCountdown.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-amber-200/70 bg-white/80 px-4 py-5 shadow-soft backdrop-blur-sm dark:border-emerald-900/70 dark:bg-slate-900/70"
              >
                <div className="text-5xl font-semibold tracking-[0.08em] text-amber-500 dark:text-amber-300 sm:text-6xl">{item.value}</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-[0.26em] text-emerald-700 dark:text-emerald-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50 sm:text-4xl">Shop by Category</h2>
            <p className="mt-3 text-base">Explore our curated collections</p>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="flex w-max gap-6 pr-6 animate-marquee hover:[animation-play-state:paused]">
            {sliderCategories.map((category, index) => (
              <CategoryCard key={`${category.id}-${index}`} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] ?? LaptopMinimal

  return (
    <Link href={category.href} className="focus-ring group block w-[220px] shrink-0 text-center" aria-label={`Browse ${category.label}`}>
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-br from-amber-400 via-amber-400 to-emerald-400 shadow-[0_14px_38px_rgba(255,183,0,0.28)] transition duration-200 group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-[0_20px_46px_rgba(5,150,105,0.24)] dark:border-slate-800">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-slate-950/85 bg-white/20 text-slate-950 backdrop-blur-sm">
          <Icon className="h-12 w-12 stroke-[1.75]" />
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">{category.label}</h3>
      <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">{category.productCount} Products</p>
    </Link>
  )
}
