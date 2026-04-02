import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { ShopCatalog } from '@/components/shop/ShopCatalog'
import { products } from '@/data/products'

const Shop = () => (
  <StorefrontShell>
    <main className="bg-stone-50 dark:bg-slate-950">
      <section className="container py-6 sm:py-8">
        <ShopCatalog products={products} />
      </section>
    </main>
  </StorefrontShell>
)

export default Shop
