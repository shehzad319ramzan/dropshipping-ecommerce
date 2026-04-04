'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Star } from 'lucide-react'
import { useState } from 'react'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel'
import { getProductBySlug, getRelatedProducts } from '@/lib/catalog'

const reviewTabs = [
  { id: 'details', label: 'Product details' },
  { id: 'reviews', label: 'Customer reviews' },
  { id: 'materials', label: 'Materials' },
]

const ProductDetail = ({ slug }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('details')
  const product = getProductBySlug(slug)

  if (!product) {
    router.replace('/shop')
    return null
  }

  const reviews = product.reviews ?? []
  const breakdown = product.reviewBreakdown ?? []
  const relatedProducts = getRelatedProducts(product.slug, product.category)

  return (
    <StorefrontShell>
      <main className="bg-stone-50 dark:bg-slate-950">
        <section className="container py-8 sm:py-10">
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-emerald-600">Shop</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-50">{product.name}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <ProductGallery name={product.name} gallery={product.gallery} />
            <ProductPurchasePanel product={product} />
          </div>
        </section>

        <section className="container pb-10">
          <div className="surface p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Customer reviews</p>
                <div className="mt-2 flex items-end gap-4">
                  <span className="text-4xl font-semibold leading-none text-slate-900 dark:text-slate-50">{product.rating.toFixed(1)}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">Average rating</p>
                    <p className="text-xs text-slate-400">{product.reviewCount} verified reviews</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                  Temu-style review confidence with aggregated feedback and verified buyers.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {reviewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                      activeTab === tab.id
                        ? 'border-transparent bg-slate-900 text-white shadow-lg dark:bg-slate-50 dark:text-slate-900'
                        : 'border-slate-200 text-slate-500 hover:border-slate-400 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {activeTab === 'details' && (
                <>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{product.longDescription}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {product.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-[1.5rem] border border-stone-200 bg-white p-4 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="grid gap-3 md:grid-cols-3">
                    {breakdown.map((item) => (
                      <div key={item.label} className="rounded-[1.5rem] border border-stone-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-xs uppercase text-slate-400 dark:text-slate-500">{item.label}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.percent}%</span>
                          <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                            <span
                              className="block h-1 rounded-full bg-amber-400"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{review.author}</p>
                            <p className="text-xs text-slate-500">{review.date}</p>
                          </div>
                          <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-600">
                            <Star className="h-4 w-4" />
                            <span className="text-sm font-semibold">{review.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-50">{review.title}</p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{review.body}</p>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-[1.5rem] border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 dark:border-slate-700 dark:text-slate-50"
                    >
                      Write a review
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="grid gap-3 md:grid-cols-3">
                  {product.materials.map((material) => (
                    <div
                      key={material}
                      className="rounded-[1.5rem] border border-stone-200 bg-white p-4 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                    >
                      {material}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container pb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Product listing</p>
              <h2 className="mt-2 text-3xl font-semibold">Similar items you might love</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Shop the rest of the curated collection without leaving the page.</p>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400">
              Back to shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(relatedProducts.length ? relatedProducts : [product]).map((item) => (
              <Link key={item.id} href={`/shop/${item.slug}`} className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900">
                <div className="relative h-72 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">{item.category}</p>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{item.name}</h3>
                  <p className="text-sm">{item.shortDescription}</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </StorefrontShell>
  )
}

export default ProductDetail
