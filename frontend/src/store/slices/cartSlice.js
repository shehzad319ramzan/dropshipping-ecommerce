import { createSlice } from '@reduxjs/toolkit'
import { products } from '../../data/products'

const initialState = {
  items: [],
  isCartOpen: false,
  lastOrder: null,
}

const getProductBySlug = (slug) => products.find((product) => product.slug === slug)
const getCartSubtotal = (items) => items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)

export const getCartShipping = (items) => {
  const subtotal = getCartSubtotal(items)
  if (!items.length || subtotal >= 120) return 0
  return 12
}

export const getCartTotal = (items) => getCartSubtotal(items) + getCartShipping(items)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productSlug, variantId, quantity = 1 } = action.payload
      const product = getProductBySlug(productSlug)
      const variant = product?.variants.find((entry) => entry.id === variantId) || product?.variants[0]
      if (!product || !variant) return

      const id = `${product.id}-${variant.id}`
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
        state.isCartOpen = true
        return
      }

      state.items.push({
        id,
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        image: product.image,
        category: product.category,
        color: variant.color,
        size: variant.size,
        quantity,
        unitPrice: variant.price,
      })
      state.isCartOpen = true
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id)
        return
      }
      const item = state.items.find((entry) => entry.id === id)
      if (item) item.quantity = quantity
    },
    clearCart(state) {
      state.items = []
      state.isCartOpen = false
    },
    completeCheckout(state, action) {
      state.lastOrder = {
        id: `VG-${Date.now()}`,
        items: [...state.items],
        subtotal: getCartSubtotal(state.items),
        shipping: getCartShipping(state.items),
        total: getCartTotal(state.items),
        customer: action.payload,
      }
      state.items = []
      state.isCartOpen = false
    },
    openCart(state) {
      state.isCartOpen = true
    },
    closeCart(state) {
      state.isCartOpen = false
    },
  },
})

export const { addToCart, removeFromCart, updateCartQuantity, clearCart, completeCheckout, openCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
