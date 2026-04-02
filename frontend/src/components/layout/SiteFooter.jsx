import Link from 'next/link'
import { Instagram, Leaf, ShieldCheck, Truck } from 'lucide-react'

const footerColumns = [
  { title: 'Shop', links: ['New Arrivals', 'Best Sellers', 'Gift Cards', 'Sustainability'] },
  { title: 'Support', links: ['Shipping', 'Returns', 'Fit Guide', 'Contact'] },
  { title: 'Company', links: ['About', 'Materials', 'Journal', 'Careers'] },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container py-14">
        <div className="grid gap-8 rounded-[2rem] bg-slate-900 p-8 text-slate-50 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Verdant Goods</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold text-white">
              Designed for everyday momentum, made with lower-impact materials.
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">
              Premium product storytelling, clear trust signals, and accessible storefront interactions start here.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, label: 'Free shipping', meta: 'Orders $120+' },
              { icon: ShieldCheck, label: 'Easy returns', meta: 'Within 30 days' },
              { icon: Leaf, label: 'Eco certified', meta: 'Tracked sourcing' },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] bg-white/8 p-4">
                <item.icon className="h-5 w-5 text-amber-300" />
                <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-sm text-slate-300">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 dark:text-slate-50">
                  {column.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <Link key={link} href="/" className="block text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400">
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Stay in the loop</p>
            <h3 className="mt-3 text-2xl font-semibold">Product drops, fit notes, and low-impact living stories.</h3>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="focus-ring h-12 flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                aria-label="Email address"
              />
              <button type="button" className="cta-secondary">Subscribe</button>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm">Follow the studio and customer stories.</p>
              <Link
                href="/"
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
