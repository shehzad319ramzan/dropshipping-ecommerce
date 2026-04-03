'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Grid2X2, Heart, LayoutList, Leaf, SlidersHorizontal, Star } from 'lucide-react'

const PAGE_SIZE = 6

export function ShopCatalog({ products }) {
  const categories = useMemo(() => ['All Products', ...Array.from(new Set(products.map((product) => product.category)))], [products])
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [ecoOnly, setEcoOnly] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatch = selectedCategory === 'All Products' || product.category === selectedCategory
        const ecoMatch = !ecoOnly || product.ecoScore >= 85
        return categoryMatch && ecoMatch
      }),
    [ecoOnly, products, selectedCategory]
  )

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, ecoOnly, viewMode])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  return (
    <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)] 2xl:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="space-y-4 xl:sticky xl:top-[120px] xl:self-start">
        <div className="surface p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="text-lg font-semibold">Filters</span>
            </div>
            <button type="button" onClick={() => { setSelectedCategory('All Products'); setEcoOnly(false) }} className="text-sm font-medium text-slate-500 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400">Clear all</button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Category</p>
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`focus-ring flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-amber-50 text-slate-900 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:text-slate-50 dark:ring-amber-500/30'
                      : 'text-slate-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{category}</span>
                  {selectedCategory === category ? <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button type="button" onClick={() => setEcoOnly((current) => !current)} className={`focus-ring flex w-full items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-medium transition ${ecoOnly ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-700' : 'bg-stone-100 text-slate-700 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}>
              <Leaf className="h-4 w-4" />
              Eco-Certified Only
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium text-slate-900 dark:text-slate-50">{filteredProducts.length} products</span>
            <span>{selectedCategory}{ecoOnly ? ' - Eco only' : ''}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-stone-200 bg-white p-1 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <button type="button" onClick={() => setViewMode('grid')} className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full transition ${viewMode === 'grid' ? 'bg-amber-400 text-slate-900' : 'text-slate-500 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800'}`} aria-label="Grid view"><Grid2X2 className="h-4 w-4" /></button>
              <button type="button" onClick={() => setViewMode('list')} className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full transition ${viewMode === 'list' ? 'bg-amber-400 text-slate-900' : 'text-slate-500 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800'}`} aria-label="List view"><LayoutList className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid gap-5 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3' : 'space-y-5'}>
          {paginatedProducts.map((product) =>
            viewMode === 'grid' ? (
              <ShopGridCard key={product.id} product={product} />
            ) : (
              <article key={product.id} className="group grid gap-5 overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-lift md:grid-cols-[280px_1fr] dark:border-slate-800 dark:bg-slate-900">
                <Link href={`/shop/${product.slug}`} className="relative min-h-[260px] overflow-hidden rounded-[1.5rem] bg-stone-100 dark:bg-slate-950">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex flex-col justify-between gap-5 p-2">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {product.badges.map((badge) => <span key={badge} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">{badge}</span>)}
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">{product.category}</p>
                    <Link href={`/shop/${product.slug}`}><h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{product.name}</h3></Link>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base">{product.longDescription}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.highlights.slice(0, 3).map((highlight) => <span key={highlight} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{highlight}</span>)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-900 dark:text-slate-50">{product.rating}</span>
                        <span>({product.reviewCount} reviews)</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <p className="text-3xl font-semibold text-slate-900 dark:text-slate-50">${product.price}</p>
                        {product.compareAtPrice ? <p className="text-sm text-slate-400 line-through">${product.compareAtPrice}</p> : null}
                      </div>
                    </div>
                    <Link href={`/shop/${product.slug}`} className="cta-primary justify-center px-6">View Product</Link>
                  </div>
                </div>
              </article>
            )
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="focus-ring rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">Previous</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`focus-ring h-10 w-10 rounded-full text-sm font-semibold transition ${currentPage === page ? 'bg-amber-400 text-slate-900' : 'border border-stone-200 bg-white text-slate-700 hover:bg-stone-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'}`}>{page}</button>
          ))}
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="focus-ring rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">Next</button>
        </div>
      </div>
    </div>
  )
}

function ShopGridCard({ product }) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null

  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[1.1rem] bg-white shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift dark:bg-slate-900">
          <div className="relative aspect-[1/1] overflow-hidden bg-stone-100 dark:bg-slate-950">
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-0" />
            <img src={product.hoverImage} alt={product.name} className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
            {discount ? (
              <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            ) : null}
            <button
              type="button"
              className="focus-ring absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-slate-700 shadow-sm transition hover:scale-105 dark:bg-slate-900/90 dark:text-slate-100"
              aria-label={`Save ${product.name}`}
              onClick={(event) => event.preventDefault()}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>

      <div className="px-1 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{product.category}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mt-2 line-clamp-2 text-[1.35rem] font-bold leading-tight text-amber-600 transition hover:text-emerald-600 dark:text-amber-300 dark:hover:text-emerald-300">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6">{product.shortDescription}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[1.45rem] font-bold text-amber-600 dark:text-amber-300">${product.price.toFixed(2)}</span>
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
