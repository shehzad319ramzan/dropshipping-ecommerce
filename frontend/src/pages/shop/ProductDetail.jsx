'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Leaf, ShieldCheck, Star } from 'lucide-react'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel'
import { getProductBySlug, getRelatedProducts } from '@/lib/catalog'

const ProductDetail = ({ slug }) => {
  const router = useRouter()
  const product = getProductBySlug(slug)

  if (!product) {
    router.replace('/shop')
    return null
  }

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
          <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <div className="surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Why it stands out</p>
              <h2 className="mt-3 text-3xl font-semibold">A product page built around confidence.</h2>
              <p className="mt-4 text-base">{product.longDescription}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {product.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-[1.5rem] bg-stone-50 p-4 text-sm font-medium dark:bg-slate-950">{highlight}</div>
                ))}
              </div>
            </div>
            <div className="surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Fit and feel</p>
              <div className="mt-4 space-y-3">
                {product.fitNotes.map((note) => (
                  <div key={note} className="rounded-[1.25rem] border border-stone-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-950">{note}</div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.5rem] bg-amber-50 p-5 dark:bg-amber-400/10">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">How it fits</p>
                    <p className="mt-1 text-sm">Most customers say this style feels true to size with a little room for layering.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container pb-10">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-slate-900 p-6 text-white sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                <Leaf className="h-4 w-4" />
                Sustainability
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white">Transparent material and packaging details.</h2>
              <p className="mt-4 text-slate-300">{product.sustainability.carbon}</p>
              <p className="mt-3 text-slate-300">{product.sustainability.packaging}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.sustainability.certifications.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">{item}</span>
                ))}
              </div>
            </div>

            <div className="surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Materials</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {product.materials.map((material) => (
                  <div key={material} className="rounded-[1.5rem] border border-stone-200 bg-white p-4 text-sm font-medium dark:border-slate-800 dark:bg-slate-950">{material}</div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.5rem] bg-stone-50 p-5 dark:bg-slate-950">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900 dark:text-slate-50">{product.rating}</span>
                  <span>Average review score from {product.reviewCount} verified reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container pb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Related products</p>
              <h2 className="mt-2 text-3xl font-semibold">Complete the story</h2>
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
