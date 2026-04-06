'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { getCurrentUser } from '@/store/slices/authSlice'
import store from '@/store/index'

export function Providers({ children }) {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Only dispatch if we have a token, don't logout on error
      store.dispatch(getCurrentUser()).catch(() => {
        // If getCurrentUser fails, just continue without logging out
        // The token was valid when stored, so keep it for retry
      })
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
