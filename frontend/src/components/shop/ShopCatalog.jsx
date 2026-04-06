'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Grid2X2, Heart, LayoutList, Leaf, SlidersHorizontal, Star } from 'lucide-react'

const PAGE_SIZE = 6

function getSoldCountLabel(product) {
  const seedSource = `${product.id}-${product.slug}-${product.price}`
  const seed = Array.from(seedSource).reduce((total, char) => total + char.charCodeAt(0), 0)
  return `${(seed % 50) + 10}K+ sold`
}

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
  const soldCountLabel = getSoldCountLabel(product)

  return (
    <article className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/50 bg-white rounded-lg dark:bg-slate-900 w-full border border-slate-100 dark:border-slate-800">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden aspect-square bg-stone-100 dark:bg-slate-950 w-full">
        <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-0 z-10" />
        <img src={product.hoverImage} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105 z-0" />
        
        <button
          type="button"
          className="focus-ring absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/92 text-slate-700 shadow-sm transition hover:scale-105 dark:bg-slate-900/90 dark:text-slate-100 z-20"
          aria-label={`Save ${product.name}`}
          onClick={(event) => event.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>

      <div className="flex flex-col pt-3 px-2 pb-2">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="line-clamp-1 text-[15px] font-semibold text-slate-800 hover:underline dark:text-slate-200">
            {product.name} - {product.shortDescription}
          </h3>
        </Link>
        
        <div className="mt-1 flex flex-wrap items-center justify-between relative gap-1">
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
          
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition-colors hover:bg-slate-100 ml-2 shrink-0 shadow-sm z-20">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
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
