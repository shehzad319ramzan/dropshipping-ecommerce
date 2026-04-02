import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi } from '../../api/authApi'

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = await loginApi(data)
        localStorage.setItem('token', res.data.token)
        return res.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
})

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const res = await registerApi(data)
        localStorage.setItem('token', res.data.token)
        return res.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Registration failed')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        role: null,
        permissions: [],
        loading: false,
        error: null,
    },
    reducers: {
        hydrateAuth(state, action) {
            state.token = action.payload?.token || null
        },
        logout(state) {
            state.user = null
            state.token = null
            state.role = null
            state.permissions = []
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
            }
        },
        clearError(state) { state.error = null },
    },
    extraReducers: (builder) => {
        const pending = (state) => { state.loading = true; state.error = null }
        const rejected = (state, action) => { state.loading = false; state.error = action.payload }
        const fulfilled = (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.role = action.payload.user.role
            state.permissions = action.payload.user.permissions || []
        }
        builder
            .addCase(loginUser.pending, pending)
            .addCase(loginUser.rejected, rejected)
            .addCase(loginUser.fulfilled, fulfilled)
            .addCase(registerUser.pending, pending)
            .addCase(registerUser.rejected, rejected)
            .addCase(registerUser.fulfilled, fulfilled)
    },
})

export const { hydrateAuth, logout, clearError } = authSlice.actions
export default authSlice.reducer
