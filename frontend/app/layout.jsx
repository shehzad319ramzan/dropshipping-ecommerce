import '@/assets/styles/index.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Dropshipping Ecommerce',
  description: 'Next.js migration of the storefront frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
