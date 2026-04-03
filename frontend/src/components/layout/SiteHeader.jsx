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
                  <ChevronDown className={`h-4 w-4 transition ${activeMenu === item.title ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === item.title ? (
                  <div className="absolute left-0 top-full pt-4">
                    <div className="w-[880px] overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
                      <div className="h-1.5 bg-gradient-to-r from-amber-300 via-emerald-400 to-emerald-600" />
                      <div className="grid grid-cols-[1.05fr_1.15fr] gap-0">
                        <div className="border-r border-stone-200/80 bg-gradient-to-br from-stone-50 via-white to-amber-50/60 p-7 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/20">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">{item.eyebrow}</p>
                          <h2 className="mt-3 text-[2rem] font-semibold leading-none">{item.title}</h2>
                          <p className="mt-3 max-w-sm text-sm leading-6">{item.description}</p>

                          <div className="mt-6 rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-5 text-white shadow-soft dark:border-white/10">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/90">Featured</p>
                                <p className="mt-2 text-xl font-semibold text-white">{item.featuredTitle}</p>
                              </div>
                              <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                                Fresh pick
                              </div>
                            </div>
                            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">{item.featuredDescription}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">Thoughtful edits</span>
                              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">Fast discovery</span>
                              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">Clean layout</span>
                            </div>
                            <div className="mt-6 flex gap-3">
                              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-100">
                                Shop collection
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                              <Link href="/checkout" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                                Start checkout
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="bg-stone-50/80 p-4 dark:bg-slate-900/40">
                          <div className="grid gap-3 sm:grid-cols-2">
                            {item.links.map((link, index) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className={`group rounded-[1.5rem] border p-4 transition duration-200 hover:-translate-y-0.5 ${
                                  index === 0
                                    ? 'border-amber-200 bg-gradient-to-br from-amber-100 via-white to-white hover:border-amber-300 dark:border-amber-900/50 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900'
                                    : 'border-stone-200/80 bg-white hover:border-emerald-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-700'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                                    {link.badge}
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                                </div>
                                <p className="mt-6 text-base font-semibold text-slate-900 dark:text-slate-50">{link.label}</p>
                                <p className="mt-2 text-sm leading-6">{link.description}</p>
                                <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                  Explore section
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
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
