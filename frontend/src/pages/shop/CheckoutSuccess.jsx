'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, PackageCheck } from 'lucide-react'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { useCartStore } from '@/lib/store/cart-store'

const CheckoutSuccess = () => {
  const router = useRouter()
  const order = useCartStore((state) => state.lastOrder)

  if (!order) {
    router.replace('/shop')
    return null
  }

  return (
    <StorefrontShell>
      <main className="bg-stone-50 dark:bg-slate-950">
        <section className="container py-10 sm:py-14">
          <div className="surface mx-auto max-w-3xl p-8 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Order confirmed</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-slate-50">Thanks for shopping with Verdant Goods.</h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">Your order {order.id} is now queued for fulfillment.</p>

            <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-stone-50 p-6 text-left dark:bg-slate-950 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Items</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{order.items.length}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Total</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">${order.total}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Shipping</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{order.customer.shippingMethod === 'express' ? 'Express' : 'Standard'}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/shop" className="cta-primary justify-center">Continue shopping</Link>
              <Link href="/cart" className="cta-secondary justify-center">View cart</Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-300">
              <PackageCheck className="h-4 w-4 text-emerald-600" />
              Tracking details will appear here in a future backend integration.
            </div>
          </div>
        </section>
      </main>
    </StorefrontShell>
  )
}

export default CheckoutSuccess
