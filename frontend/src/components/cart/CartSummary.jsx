import Link from 'next/link'
import { getCartShipping, getCartSubtotal, getCartTotal } from '@/lib/store/cart-store'

export function CartSummary({ items, ctaHref, ctaLabel }) {
  const subtotal = getCartSubtotal(items)
  const shipping = getCartShipping(items)
  const total = getCartTotal(items)

  return (
    <aside className="surface p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Order summary</p>
      <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
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
      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className="cta-primary mt-6 w-full justify-center">
          {ctaLabel}
        </Link>
      ) : null}
    </aside>
  )
}
