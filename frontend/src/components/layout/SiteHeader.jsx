'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Heart, LogIn, Menu, Search, ShoppingBag, Sparkles, UserCircle2, X } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { TopBanner } from '@/components/layout/TopBanner'
import { navigation } from '@/lib/config/navigation'
import { useCartStore } from '@/lib/store/cart-store'
import useAuth from '@/hooks/useAuth'

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const { isAuthenticated, user } = useAuth()
  const accountHref = user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleOpenCart = () => {
    setMobileOpen(false)
    openCart()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <TopBanner />
      <div className="container">
        <div className="flex min-h-20 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-900 lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="group inline-flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-slate-900 shadow-soft transition group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">Verdant Goods</p>
              <p className="hidden truncate text-sm text-slate-500 dark:text-slate-300 sm:block">Modern essentials for lighter living</p>
            </div>
          </Link>

          <nav className="ml-8 hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  type="button"
                  className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-900"
                  aria-expanded={activeMenu === item.title}
                >
                  {item.title}
                  <ChevronDown className={`h-4 w-4 transition ${activeMenu === item.title ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === item.title ? (
                  <div className="absolute left-0 top-full mt-2 min-w-[240px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950">
                    <div className="py-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block px-5 py-3 text-sm text-slate-700 transition hover:bg-stone-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                        >
                          <div className="font-medium">{link.label}</div>
                          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{link.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/shop" className="focus-ring inline-flex items-center rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">New</Link>
              <Link href="/shop" className="focus-ring inline-flex items-center rounded-full px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">Collections</Link>
            </div>
            <button type="button" className="focus-ring hidden h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:text-slate-950 md:inline-flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50" aria-label="Search products">
              <Search className="h-5 w-5" />
            </button>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link
              href={isAuthenticated ? accountHref : '/login'}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-stone-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:text-slate-950 md:px-4 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
            >
              {isAuthenticated ? <UserCircle2 className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              <span>{isAuthenticated ? 'Account' : 'Login'}</span>
            </Link>
            <button type="button" className="focus-ring hidden h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:text-slate-950 md:inline-flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
            <button type="button" onClick={openCart} className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary px-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-brand-primary-light sm:px-4" aria-label="Open cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Cart ({cartCount})</span>
              <span className="sm:hidden">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[90] bg-stone-50 dark:bg-slate-950 lg:hidden">
          <div className="flex min-h-20 items-center justify-between border-b border-stone-200 px-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-green">Verdant Goods</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">Shop the cleaner essentials edit</p>
            </div>
            <button type="button" onClick={() => setMobileOpen(false)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="safe-bottom h-[calc(100dvh-5rem)] overflow-y-auto px-4 py-5">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="rounded-[1.25rem] bg-brand-primary px-4 py-4 text-sm font-semibold text-slate-900">Shop all</Link>
              <button type="button" onClick={handleOpenCart} className="rounded-[1.25rem] bg-brand-secondary px-4 py-4 text-sm font-semibold text-white">Cart ({cartCount})</button>
            </div>

            <div className="mt-4 grid gap-3">
              {navigation.map((item) => (
                <section key={item.title} className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">{item.title}</h2>
                  <div className="mt-3 grid gap-2">
                    {item.links.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-brand-green hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-brand-green">
                        <div>{link.label}</div>
                        <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{link.description}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="surface p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Quick access</p>
                <div className="mt-3 space-y-2">
                  <Link href={isAuthenticated ? accountHref : '/login'} onClick={() => setMobileOpen(false)} className="block rounded-[1rem] bg-stone-100 px-4 py-3 text-sm font-medium text-slate-800 dark:bg-slate-900 dark:text-slate-100">
                    {isAuthenticated ? 'Account' : 'Login'}
                  </Link>
                  <Link href="/checkout" onClick={() => setMobileOpen(false)} className="block rounded-[1rem] bg-stone-100 px-4 py-3 text-sm font-medium text-slate-800 dark:bg-slate-900 dark:text-slate-100">Checkout</Link>
                  <Link href="/cart" onClick={() => setMobileOpen(false)} className="block rounded-[1rem] bg-stone-100 px-4 py-3 text-sm font-medium text-slate-800 dark:bg-slate-900 dark:text-slate-100">Cart page</Link>
                </div>
              </div>
              <div className="surface p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Appearance</p>
                <div className="mt-3">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
