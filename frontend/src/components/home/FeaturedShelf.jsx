import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/data/products'

export function FeaturedShelf() {
  const featured = products.slice(0, 3)

  return (
    <section className="bg-stone-50 py-12 dark:bg-slate-950 sm:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Featured products</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50 sm:text-[2.15rem]">Best picks to shop first</h2>
            <p className="mt-3 text-sm leading-7 sm:text-base">
              Start with the products customers notice fastest: clearer visuals, stronger product details, and a more premium card layout that makes browsing easier.
            </p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400">
            View full shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductShowcaseCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductShowcaseCard({ product }) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null

  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[1.1rem] bg-white shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift dark:bg-slate-900">
          <div className="relative aspect-[1/1] overflow-hidden bg-stone-100 dark:bg-slate-950">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            {discount ? (
              <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="px-1 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{product.category}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mt-2 line-clamp-2 text-[1.45rem] font-bold leading-tight text-amber-600 transition hover:text-emerald-600 dark:text-amber-300 dark:hover:text-emerald-300">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6">{product.shortDescription}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[1.55rem] font-bold text-amber-600 dark:text-amber-300">${product.price.toFixed(2)}</span>
          {product.compareAtPrice ? <span className="text-base font-medium text-slate-400 line-through">${product.compareAtPrice.toFixed(2)}</span> : null}
        </div>
        <Link href={`/shop/${product.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-300">
          View product
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
