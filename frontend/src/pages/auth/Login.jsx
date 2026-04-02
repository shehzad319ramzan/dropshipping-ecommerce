'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { loginUser } from '../../store/slices/authSlice'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated, role, loading, error } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    if (isAuthenticated && role) {
      if (role === 'admin') {
        router.replace('/admin/dashboard')
      } else {
        router.replace('/dashboard')
      }
    }
  }, [isAuthenticated, role, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(loginUser(form))
  }

  return (
    <StorefrontShell>
      <main className="min-h-[calc(100vh-10rem)] bg-stone-50 dark:bg-slate-950">
        <div className="container grid min-h-[calc(100vh-10rem)] items-center gap-10 py-10 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-8 text-white shadow-lift lg:block">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Welcome back
            </div>
            <h1 className="mt-6 max-w-lg text-5xl font-black leading-[0.95] text-white">
              Sign in to manage orders, checkout faster, and track activity.
            </h1>
            <p className="mt-5 max-w-xl text-base text-emerald-50/90">
              Your account keeps shopping smooth across the storefront, cart, and dashboard experience.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                'Track your orders',
                'Save account details',
                'Return to checkout faster',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-white/10 px-4 py-4 text-sm font-medium text-white/90 backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="surface mx-auto w-full max-w-xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Account Login</p>
                <h2 className="mt-2 text-4xl font-semibold">Welcome back</h2>
                <p className="mt-2 text-sm sm:text-base">Sign in to continue shopping and access your dashboard.</p>
              </div>
              <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-soft sm:flex">
                <ShieldCheck className="h-7 w-7" />
              </div>
            </div>

            {error ? (
              <div className="mt-6 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-50">Email</span>
                <div className="flex items-center gap-3 rounded-[1rem] border border-stone-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    className="focus-ring h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-50"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-50">Password</span>
                <div className="flex items-center gap-3 rounded-[1rem] border border-stone-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
                  <LockKeyhole className="h-4 w-4 text-slate-400" />
                  <input
                    className="focus-ring h-12 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-50"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </label>

              <button type="submit" disabled={loading} className="cta-primary w-full justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? 'Signing in...' : 'Login'}
                {!loading ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-6 text-sm dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <p>Don&apos;t have an account yet?</p>
              <Link href="/register" className="font-semibold text-emerald-600 transition hover:text-emerald-500">
                Create account
              </Link>
            </div>
          </section>
        </div>
      </main>
    </StorefrontShell>
  )
}

export default Login
