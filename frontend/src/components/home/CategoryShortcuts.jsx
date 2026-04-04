import Link from 'next/link'
import { shortcutCategories } from '@/data/home'

const flashCountdown = [
  { label: 'Days', value: '01' },
  { label: 'Hours', value: '23' },
  { label: 'Minutes', value: '58' },
  { label: 'Seconds', value: '43' },
]

export function CategoryShortcuts() {
  const sliderCategories = [...shortcutCategories, ...shortcutCategories]

  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,178,0,0.12),_transparent_28%),linear-gradient(180deg,_rgba(250,250,249,0.98)_0%,_rgba(16,184,129,0.08)_100%)] py-12 dark:bg-[radial-gradient(circle_at_top,_rgba(255,178,0,0.08),_transparent_24%),linear-gradient(180deg,_rgba(2,6,23,1)_0%,_rgba(16,184,129,0.15)_100%)] sm:py-16">
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-3xl font-extrabold text-slate-950 dark:text-slate-50 sm:text-4xl">Flash Sale Starts Now</p>
          <p className="mt-3 text-base text-slate-700 dark:text-slate-200">
            20% off selected items with code: <span className="font-semibold tracking-[0.2em] text-brand-primary dark:text-brand-primary">FLASH20</span>
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {flashCountdown.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-brand-primary/30 bg-white/80 px-4 py-5 shadow-soft backdrop-blur-sm dark:border-brand-green/30 dark:bg-slate-900/70"
              >
                <div className="text-5xl font-semibold tracking-[0.08em] text-brand-primary dark:text-brand-primary sm:text-6xl">{item.value}</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-[0.26em] text-brand-green dark:text-brand-green">
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
  return (
    <Link href={category.href} className="focus-ring group block w-[220px] shrink-0 text-center" aria-label={`Browse ${category.label}`}>
      <div className="mx-auto relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-[4px] border-white shadow-[0_14px_38px_rgba(255,178,0,0.28)] transition duration-300 group-hover:-translate-y-2 group-hover:scale-[1.05] group-hover:shadow-[0_20px_46px_rgba(16,184,129,0.24)] dark:border-slate-800">
        <img src={category.image} alt={category.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-green dark:text-slate-50">{category.label}</h3>
      <p className="mt-2 text-sm font-semibold text-brand-green dark:text-brand-green">{category.productCount} Products</p>
    </Link>
  )
}
