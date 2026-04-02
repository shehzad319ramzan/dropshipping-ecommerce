'use client'

import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { CartSummary } from '@/components/cart/CartSummary'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { useCartStore } from '@/lib/store/cart-store'

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCartStore()

  return (
    <StorefrontShell>
      <main className="bg-stone-50 dark:bg-slate-950">
        <section className="container py-8 sm:py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Your cart</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-slate-50">Review everything before checkout.</h1>
          </div>

          {items.length ? (
            <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <article key={item.id} className="grid gap-4 rounded-[2rem] border border-stone-200 bg-white p-4 shadow-soft sm:grid-cols-[140px_1fr] dark:border-slate-800 dark:bg-slate-900">
                    <div className="relative min-h-[180px] overflow-hidden rounded-[1.5rem] bg-stone-100 dark:bg-slate-950">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between gap-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">{item.category}</p>
                          <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{item.name}</h2>
                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{item.color} · Size {item.size}</p>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300" aria-label={`Remove ${item.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-center rounded-full border border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-l-full" aria-label="Decrease quantity">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-50">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-r-full" aria-label="Increase quantity">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">${item.unitPrice * item.quantity}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <CartSummary items={items} ctaHref="/checkout" ctaLabel="Proceed to checkout" />
            </div>
          ) : (
            <div className="surface flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-slate-50">Your cart is empty</h2>
              <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-300">Add a few pieces to your cart to continue into checkout.</p>
              <Link href="/shop" className="cta-primary mt-6">Browse the shop</Link>
            </div>
          )}
        </section>
      </main>
    </StorefrontShell>
  )
}

export default Cart
