'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingCart, Star } from 'lucide-react'
import { products } from '@/data/products'

function getSoldCountLabel(product) {
  const seedSource = `${product.id}-${product.slug}-${product.price}`
  const seed = Array.from(seedSource).reduce((total, char) => total + char.charCodeAt(0), 0)
  return `${(seed % 50) + 10}K+ sold`
}

export function FeaturedShelf() {
  const featured = products.slice(0, 4)

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-slate-950">
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 h-[600px] w-[600px] rounded-full bg-brand-green/10 blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-3xl opacity-60" />

      <div className="container relative z-10">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-green">
              <Star className="h-3.5 w-3.5 fill-brand-green" />
              Featured Collection
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">Best picks to shop first</h2>
            <p className="max-w-lg text-lg text-slate-600 dark:text-slate-400">
              Clearer visuals, stronger product details, and a more compact card layout that makes browsing easier.
            </p>
          </div>
          <Link href="/shop" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-md ring-1 ring-slate-900/5 transition-all hover:bg-slate-50 hover:shadow-lg dark:bg-slate-900 dark:text-white dark:ring-white/10 dark:hover:bg-slate-800">
            View full catalogue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-brand-green" />
          </Link>
        </div>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  const soldCountLabel = getSoldCountLabel(product)

  return (
    <article className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/50 bg-white rounded-lg dark:bg-slate-900 w-full">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden aspect-square bg-stone-100 dark:bg-slate-950 w-full">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 hover:opacity-90" />
      </Link>

      <div className="flex flex-col pt-3 px-1 pb-2">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="line-clamp-1 text-[15px] font-semibold text-slate-800 hover:underline dark:text-slate-200">
            {product.name} - {product.shortDescription}
          </h3>
        </Link>
        
        <div className="mt-1 flex items-center justify-between relative">
          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1">
            <span className="text-[17px] font-bold text-slate-900 dark:text-slate-50">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-[11px] text-slate-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
            <span className="text-[11px] text-slate-500">{soldCountLabel}</span>
            {discount && (
              <span className="rounded border border-orange-400 px-1 py-[1px] text-[9px] font-bold leading-none text-orange-500">
                -{discount}%
              </span>
            )}
          </div>
          
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition-colors hover:bg-slate-100 ml-2 shrink-0 shadow-sm">
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex text-slate-900 dark:text-slate-100">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 text-slate-900 fill-current dark:text-slate-100" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-slate-500">{product.reviewCount}</span>
        </div>
      </div>
    </article>
  )
}
