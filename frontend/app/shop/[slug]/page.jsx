import ProductDetailPage from '@/pages/shop/ProductDetail'

export default function Page({ params }) {
  return <ProductDetailPage slug={params.slug} />
}
