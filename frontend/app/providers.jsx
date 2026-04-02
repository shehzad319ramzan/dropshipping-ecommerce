'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { hydrateAuth } from '@/store/slices/authSlice'
import store from '@/store/index'

export function Providers({ children }) {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      store.dispatch(hydrateAuth({ token }))
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
