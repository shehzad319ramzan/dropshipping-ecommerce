'use client'

import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { getCartShipping, getCartSubtotal, getCartTotal, useCartStore } from '@/lib/store/cart-store'

export function CartDrawer() {
  const { closeCart, isCartOpen, items, removeItem, updateQuantity } = useCartStore()
  const subtotal = getCartSubtotal(items)
  const shipping = getCartShipping(items)
  const total = getCartTotal(items)

  return (
    <>
      {isCartOpen ? (
        <button type="button" aria-label="Close cart drawer overlay" className="fixed inset-0 z-50 bg-slate-950/45" onClick={closeCart} />
      ) : null}
      <aside
        className={`fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-stone-200 bg-white shadow-lift transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-slate-900">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Cart</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{items.length} item{items.length === 1 ? '' : 's'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length ? (
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">{item.category}</p>
                      <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{item.color} · Size {item.size}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-stone-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-l-full" aria-label="Decrease quantity">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-50">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-r-full" aria-label="Increase quantity">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">${item.unitPrice * item.quantity}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-slate-50">Your cart is empty</h2>
              <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-300">Add a few pieces from the shop to start your checkout flow.</p>
              <Link href="/shop" onClick={closeCart} className="cta-primary mt-6">Continue shopping</Link>
            </div>
          )}
        </div>

        <div className="border-t border-stone-200 px-5 py-5 dark:border-slate-800">
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-slate-50">${subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900 dark:text-slate-50">{shipping ? `$${shipping}` : 'Free'}</span>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-slate-50">Total</span>
              <span className="font-semibold text-slate-900 dark:text-slate-50">${total}</span>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            <Link href="/cart" onClick={closeCart} className="cta-secondary justify-center">View cart</Link>
            <Link href="/checkout" onClick={closeCart} className="cta-primary justify-center">Checkout</Link>
          </div>
        </div>
      </aside>
    </>
  )
}
