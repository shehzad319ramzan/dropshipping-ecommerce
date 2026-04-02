import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { products } from '@/data/products'

export function FeaturedShelf() {
  const featured = products.slice(0, 3)

  return (
    <section className="bg-stone-50 py-10 dark:bg-slate-950 sm:py-14">
      <div className="container">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Featured products</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">See the products first</h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base">A simpler storefront works best when customers immediately land on clear, premium product cards.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400">
            View full shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-80 overflow-hidden bg-stone-100 dark:bg-slate-950">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {product.badges.map((badge) => (
                    <span key={badge} className="rounded-full bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">{badge}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">{product.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{product.name}</h3>
                  <p className="mt-2 text-sm">{product.shortDescription}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900 dark:text-slate-50">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-slate-900 dark:text-slate-50">${product.price}</span>
                    {product.compareAtPrice ? <span className="text-sm text-slate-400 line-through">${product.compareAtPrice}</span> : null}
                  </div>
                  <Link href={`/shop/${product.slug}`} className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300">View product</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
