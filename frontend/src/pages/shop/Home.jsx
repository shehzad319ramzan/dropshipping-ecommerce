import { CategoryShortcuts } from '@/components/home/CategoryShortcuts'
import { FeaturedShelf } from '@/components/home/FeaturedShelf'
import { FlashDeals } from '@/components/home/FlashDeals'
import { HeroSlider } from '@/components/home/HeroSlider'
import { RecentPurchaseToast } from '@/components/home/RecentPurchaseToast'
import { ServiceStrip } from '@/components/home/ServiceStrip'
import { ShopPulseBar } from '@/components/home/ShopPulseBar'
import { StorefrontShell } from '@/components/layout/StorefrontShell'

const Home = () => (
  <StorefrontShell>
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">
      <ShopPulseBar />
      <HeroSlider />
      <ServiceStrip />
      <CategoryShortcuts />
      <FeaturedShelf />
      <FlashDeals />
      <RecentPurchaseToast />
    </main>
  </StorefrontShell>
)

export default Home
