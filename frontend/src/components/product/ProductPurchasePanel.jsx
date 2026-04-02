'use client'

import { useState } from 'react'
import { Heart, Minus, Plus, Share2, ShieldCheck, Truck } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'

export function ProductPurchasePanel({ product }) {
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0]?.id)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const activeVariant = product.variants.find((variant) => variant.id === activeVariantId) ?? product.variants[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {product.badges.map((badge) => (
          <span key={badge} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
            {badge}
          </span>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">{product.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-slate-50 lg:text-5xl">{product.name}</h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg">{product.longDescription}</p>
      </div>

      <div className="flex items-end gap-3">
        <span className="text-4xl font-semibold text-slate-900 dark:text-slate-50">${activeVariant.price}</span>
        {product.compareAtPrice ? <span className="pb-1 text-lg text-slate-400 line-through">${product.compareAtPrice}</span> : null}
      </div>

      <div className="surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Color and size</p>
            <p className="mt-1 text-sm">Choose the variant that fits your daily routine best.</p>
          </div>
          <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {activeVariant.inStock ? `${activeVariant.stockCount} in stock` : 'Sold out'}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setActiveVariantId(variant.id)}
              disabled={!variant.inStock}
              className={`focus-ring rounded-[1.25rem] border px-4 py-3 text-left transition ${
                variant.id === activeVariantId
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                  : 'border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-950'
              } ${!variant.inStock ? 'cursor-not-allowed opacity-45' : 'hover:-translate-y-0.5'}`}
            >
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: variant.colorHex }} />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{variant.color}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">Size {variant.size}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <button type="button" onClick={() => setQuantity((count) => Math.max(1, count - 1))} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-l-full" aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-50">{quantity}</span>
            <button type="button" onClick={() => setQuantity((count) => count + 1)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-r-full" aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button type="button" onClick={() => addItem({ productSlug: product.slug, variantId: activeVariant.id, quantity })} className="cta-primary min-h-12 px-8">Add to cart</button>
          <button type="button" className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" aria-label="Add to wishlist"><Heart className="h-5 w-5" /></button>
          <button type="button" className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" aria-label="Share product"><Share2 className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Free shipping</p>
              <p className="text-sm">Orders over $75 ship carbon-neutral.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Easy returns</p>
              <p className="text-sm">30-day returns with fit support included.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
