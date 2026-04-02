'use client'

import { useEffect, useState } from 'react'
import { Monitor, MoonStar, SunMedium } from 'lucide-react'

const options = [
  { label: 'Light', value: 'light', icon: SunMedium },
  { label: 'Dark', value: 'dark', icon: MoonStar },
  { label: 'System', value: 'system', icon: Monitor },
]

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export function ThemeToggle() {
  const [theme, setTheme] = useState('system')
  const [resolvedTheme, setResolvedTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const syncTheme = (nextTheme) => {
      const computedTheme = nextTheme === 'system' ? getSystemTheme() : nextTheme
      document.documentElement.classList.toggle('dark', computedTheme === 'dark')
      setResolvedTheme(computedTheme)
    }

    const handleMediaChange = () => {
      if ((localStorage.getItem('theme') || 'system') === 'system') {
        syncTheme('system')
      }
    }

    setTheme(savedTheme)
    syncTheme(savedTheme)
    setMounted(true)

    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  const applyTheme = (nextTheme) => {
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
    const computedTheme = nextTheme === 'system' ? getSystemTheme() : nextTheme
    document.documentElement.classList.toggle('dark', computedTheme === 'dark')
    setResolvedTheme(computedTheme)
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-stone-200 bg-white/90 p-1 shadow-soft dark:border-slate-800 dark:bg-slate-900/90"
      aria-label="Theme switcher"
      role="group"
    >
      {options.map((option) => {
        const Icon = option.icon
        const active = mounted
          ? option.value === theme || (theme === 'system' && option.value === resolvedTheme)
          : option.value === 'system'

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => applyTheme(option.value)}
            className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
              active
                ? 'bg-amber-400 text-slate-900'
                : 'text-slate-500 hover:bg-stone-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
            aria-pressed={active}
            aria-label={`Switch to ${option.label.toLowerCase()} theme`}
            title={option.label}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}
