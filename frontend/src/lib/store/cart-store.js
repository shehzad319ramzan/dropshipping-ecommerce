'use client'

import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  clearCart,
  closeCart,
  completeCheckout,
  openCart,
  removeFromCart,
  updateCartQuantity,
} from '@/store/slices/cartSlice'

export function getCartSubtotal(items) {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
}

export function getCartShipping(items) {
  const subtotal = getCartSubtotal(items)
  if (!items.length || subtotal >= 120) {
    return 0
  }
  return 12
}

export function getCartTotal(items) {
  return getCartSubtotal(items) + getCartShipping(items)
}

export function useCartStore(selector = (state) => state) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const store = {
    items: cart.items,
    isCartOpen: cart.isCartOpen,
    lastOrder: cart.lastOrder,
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
    addItem: ({ productSlug, variantId, quantity }) =>
      dispatch(addToCart({ productSlug, variantId, quantity })),
    removeItem: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateCartQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    completeCheckout: (customer) => dispatch(completeCheckout(customer)),
  }

  return selector(store)
}
