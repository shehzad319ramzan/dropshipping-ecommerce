import { products } from '@/data/products'

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(slug, category) {
  return products
    .filter((product) => product.slug !== slug && product.category === category)
    .slice(0, 3)
}
