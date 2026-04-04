import { notFound } from 'next/navigation'
import { StorefrontShell } from '@/components/layout/StorefrontShell'
import { StaticPage } from '@/components/pages/StaticPage'
import { staticPageData } from '@/data/staticPages'

export default function Page({ params: { slug } }) {
  const pageData = staticPageData[slug]

  if (!pageData) {
    notFound()
  }

  return (
    <StorefrontShell>
      <StaticPage {...pageData} />
    </StorefrontShell>
  )
}
