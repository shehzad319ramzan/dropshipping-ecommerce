'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Heart, LogIn, Menu, Search, ShoppingBag, Sparkles, UserCircle2, X } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
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
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-soft transition group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Verdant Goods</p>
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
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeMenu === item.title ? (
                  <div className="absolute left-0 top-full pt-3">
                    <div className="surface grid w-[820px] grid-cols-[0.95fr_1.05fr] gap-6 p-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">{item.eyebrow}</p>
                        <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
                        <p className="mt-2 text-sm">{item.description}</p>
                        <div className="mt-5 rounded-[1.75rem] bg-gradient-to-br from-amber-200 via-amber-100 to-emerald-100 p-5">
                          <p className="text-sm font-semibold text-slate-900">{item.featuredTitle}</p>
                          <p className="mt-2 text-sm text-slate-700">{item.featuredDescription}</p>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <Link href="/shop" className="rounded-[1.25rem] bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white">Shop collection</Link>
                            <Link href="/checkout" className="rounded-[1.25rem] bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start checkout</Link>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {item.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{link.label}</p>
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">{link.badge}</span>
                            </div>
                            <p className="mt-1 text-sm">{link.description}</p>
                            <div className="mt-4 rounded-[1rem] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">Open page</div>
                          </Link>
                        ))}
                      </div>
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
            <button type="button" onClick={openCart} className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-amber-600/20 bg-amber-400 px-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 sm:px-4" aria-label="Open cart">
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
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Verdant Goods</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">Shop the cleaner essentials edit</p>
            </div>
            <button type="button" onClick={() => setMobileOpen(false)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="safe-bottom h-[calc(100dvh-5rem)] overflow-y-auto px-4 py-5">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/shop" onClick={() => setMobileOpen(false)} className="rounded-[1.25rem] bg-amber-400 px-4 py-4 text-sm font-semibold text-slate-900">Shop all</Link>
              <button type="button" onClick={handleOpenCart} className="rounded-[1.25rem] bg-slate-900 px-4 py-4 text-sm font-semibold text-white">Cart ({cartCount})</button>
            </div>

            <div className="mt-4 grid gap-3">
              {navigation.map((item) => (
                <section key={item.title} className="surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">{item.eyebrow}</p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">{item.title}</h2>
                  <p className="mt-1 text-sm">{item.description}</p>
                  <div className="mt-4 grid gap-2">
                    {item.links.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-[1.25rem] border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                        <div className="flex items-center justify-between gap-2">
                          <span>{link.label}</span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">{link.badge}</span>
                        </div>
                        <span className="mt-1 block text-xs text-slate-500 dark:text-slate-300">{link.description}</span>
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
