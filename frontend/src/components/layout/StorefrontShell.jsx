import { CartDrawer } from '@/components/cart/CartDrawer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export function StorefrontShell({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
