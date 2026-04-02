'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { CartSummary } from '@/components/cart/CartSummary'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { useCartStore } from '@/lib/store/cart-store'

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  shippingMethod: z.enum(['standard', 'express']),
})

const Checkout = () => {
  const items = useCartStore((state) => state.items)
  const completeCheckout = useCartStore((state) => state.completeCheckout)
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      shippingMethod: 'standard',
    },
  })

  if (!items.length) {
    router.replace('/cart')
    return null
  }

  const handleSubmit = (values) => {
    completeCheckout(values)
    router.push('/checkout/success')
  }

  return (
    <StorefrontShell>
      <main className="bg-stone-50 dark:bg-slate-950">
        <section className="container py-8 sm:py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Checkout</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-slate-50">Complete your order details.</h1>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="surface p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                  First name
                  <input {...form.register('firstName')} className="focus-ring h-12 w-full rounded-[1rem] border border-stone-200 bg-white px-4 text-sm dark:border-slate-800 dark:bg-slate-950" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                  Last name
                  <input {...form.register('lastName')} className="focus-ring h-12 w-full rounded-[1rem] border border-stone-200 bg-white px-4 text-sm dark:border-slate-800 dark:bg-slate-950" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-50 sm:col-span-2">
                  Email
                  <input {...form.register('email')} className="focus-ring h-12 w-full rounded-[1rem] border border-stone-200 bg-white px-4 text-sm dark:border-slate-800 dark:bg-slate-950" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-50 sm:col-span-2">
                  Address
                  <input {...form.register('address')} className="focus-ring h-12 w-full rounded-[1rem] border border-stone-200 bg-white px-4 text-sm dark:border-slate-800 dark:bg-slate-950" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                  City
                  <input {...form.register('city')} className="focus-ring h-12 w-full rounded-[1rem] border border-stone-200 bg-white px-4 text-sm dark:border-slate-800 dark:bg-slate-950" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-900 dark:text-slate-50">
                  Postal code
                  <input {...form.register('postalCode')} className="focus-ring h-12 w-full rounded-[1rem] border border-stone-200 bg-white px-4 text-sm dark:border-slate-800 dark:bg-slate-950" />
                </label>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Shipping method</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'standard', label: 'Standard', meta: 'Free over $120' },
                    { value: 'express', label: 'Express', meta: '$18 priority' },
                  ].map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-[1rem] border border-stone-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <input type="radio" value={option.value} {...form.register('shippingMethod')} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{option.label}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-300">{option.meta}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {Object.keys(form.formState.errors).length ? (
                <div className="mt-6 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                  Please complete all required checkout fields with valid details.
                </div>
              ) : null}

              <button type="submit" className="cta-primary mt-8 w-full justify-center">Place order</button>
            </form>

            <CartSummary items={items} />
          </div>
        </section>
      </main>
    </StorefrontShell>
  )
}

export default Checkout
