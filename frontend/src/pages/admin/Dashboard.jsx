'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'
import { getDashboardStatsApi } from '../../api/adminApi'

const AdminDashboard = () => {
    const router = useRouter()
    const { user, can, isAuthenticated, role } = useAuth()
    const [stats, setStats] = useState([])
    const [recentProducts, setRecentProducts] = useState([])
    const [recentUsers, setRecentUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
            return
        }
        if (role && role !== 'admin') {
            router.replace('/unauthorized')
        }
        fetchDashboardStats()
    }, [isAuthenticated, role, router])

    const fetchDashboardStats = async () => {
        try {
            const res = await getDashboardStatsApi()
            setStats(res.data.data.stats)
            setRecentProducts(res.data.data.recentProducts)
            setRecentUsers(res.data.data.recentUsers)
        } catch (err) {
            console.error('Failed to load dashboard stats')
        } finally {
            setLoading(false)
        }
    }

    if (!isAuthenticated || role !== 'admin') {
        return null
    }

    if (loading) return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        </DashboardLayout>
    )

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-7">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 text-sm mt-1">Welcome back, {user?.name}. Here's what's happening today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map(s => (
                    <div key={s.label} className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden shadow-soft">
                        <div className={`absolute top-0 left-0 right-0 h-1 ${s.color}`} />
                        <div className="text-xs font-medium text-slate-500 mb-2 mt-2 uppercase tracking-wider">{s.label}</div>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{s.value}</div>
                        <div className={`text-xs ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                            {s.up ? '↑' : '↓'} {s.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Products */}
                <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-soft">
                    <div className="flex justify-between items-center mb-6">
                        <div className="font-bold text-slate-900">Recently Added Products</div>
                        <button 
                            onClick={() => router.push('/admin/products')}
                            className="text-xs font-bold text-brand-primary hover:text-brand-primary-dark transition-colors uppercase tracking-wider"
                        >
                            View all
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-[10px] font-bold text-slate-400 text-left py-3 px-2 uppercase tracking-widest">Product</th>
                                    <th className="text-[10px] font-bold text-slate-400 text-left py-3 px-2 uppercase tracking-widest">SKU</th>
                                    <th className="text-[10px] font-bold text-slate-400 text-left py-3 px-2 uppercase tracking-widest">Price</th>
                                    <th className="text-[10px] font-bold text-slate-400 text-left py-3 px-2 uppercase tracking-widest">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentProducts.map(p => (
                                    <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-slate-100 overflow-hidden border border-slate-200">
                                                    <img src={p.bigImage} alt="" className="h-full w-full object-cover" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{p.nameEn}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-sm text-slate-500 font-mono">{p.sku}</td>
                                        <td className="py-3 px-2 text-sm font-bold text-slate-900">{p.sellPrice}</td>
                                        <td className="py-3 px-2">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                                p.warehouseInventoryNum > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {p.warehouseInventoryNum} IN STOCK
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-soft">
                    <div className="flex justify-between items-center mb-6">
                        <div className="font-bold text-slate-900">Recent Users</div>
                        <button 
                            onClick={() => router.push('/admin/users')}
                            className="text-xs font-bold text-brand-primary hover:text-brand-primary-dark transition-colors uppercase tracking-wider"
                        >
                            View all
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentUsers.map((u) => (
                            <div key={u._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200">
                                    {u.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-900 truncate">{u.name}</div>
                                    <div className="text-xs text-slate-500 truncate">{u.email}</div>
                                </div>
                                <div className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded uppercase">
                                    {u.role?.name || 'User'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <div className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Quick Access</div>
                        <div className="flex flex-wrap gap-2">
                            {['products.view', 'users.view', 'orders.view'].map(p => (
                                <span key={p} className={`text-[10px] px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                                    can(p) ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                                }`}>
                                    {can(p) ? '✓' : '✗'} {p.split('.')[0].toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminDashboard
