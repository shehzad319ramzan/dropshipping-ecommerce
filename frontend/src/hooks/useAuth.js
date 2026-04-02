'use client'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const useAuth = () => {
    const dispatch = useDispatch()
    const { user, token, role, permissions, loading, error } = useSelector(s => s.auth)

    return {
        user,
        token,
        role,
        permissions,
        loading,
        error,
        isAuthenticated: !!token,
        isAdmin: role === 'admin',
        isUser: role === 'user',
        can: (permission) => permissions.includes(permission),
        logout: () => dispatch(logout()),
    }
}

export default useAuth
