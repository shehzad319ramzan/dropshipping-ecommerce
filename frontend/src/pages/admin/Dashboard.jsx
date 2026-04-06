'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'

const stats = [
    { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, color: 'bg-brand-primary' },
    { label: 'Total Orders', value: '1,284', change: '+8.2%', up: true, color: 'bg-brand-green' },
    { label: 'Total Users', value: '3,921', change: '+5.1%', up: true, color: 'bg-amber-400' },
    { label: 'Pending Orders', value: '43', change: '-2.3%', up: false, color: 'bg-red-500' },
]

const recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Wireless Headphones', amount: '$49.99', status: 'delivered' },
    { id: '#ORD-002', customer: 'Mike Chen', product: 'Smart Watch', amount: '$129.99', status: 'processing' },
    { id: '#ORD-003', customer: 'Emma Davis', product: 'Running Shoes', amount: '$89.99', status: 'shipped' },
    { id: '#ORD-004', customer: 'James Wilson', product: 'Backpack', amount: '$39.99', status: 'pending' },
    { id: '#ORD-005', customer: 'Olivia Brown', product: 'Sunglasses', amount: '$24.99', status: 'delivered' },
]

const topProducts = [
    { name: 'Wireless Headphones', sales: 284, revenue: '$14,200', stock: 42 },
    { name: 'Smart Watch', sales: 196, revenue: '$25,480', stock: 18 },
    { name: 'Running Shoes', sales: 312, revenue: '$28,070', stock: 65 },
    { name: 'Backpack', sales: 145, revenue: '$5,795', stock: 91 },
]

const statusColor = {
    delivered: 'bg-green-100 text-green-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-red-100 text-red-800',
}

const AdminDashboard = () => {
    const router = useRouter()
    const { user, can, isAuthenticated, role } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
            return
        }
        if (role && role !== 'admin') {
            router.replace('/unauthorized')
        }
    }, [isAuthenticated, role, router])

    if (!isAuthenticated || role !== 'admin') {
        return null
    }

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
                    <div key={s.label} className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 right-0 h-1 ${s.color}`} />
                        <div className="text-xs font-medium text-slate-500 mb-2 mt-2">{s.label}</div>
                        <div className="text-2xl font-bold text-slate-900 mb-1">{s.value}</div>
                        <div className={`text-xs ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                            {s.up ? '↑' : '↓'} {s.change} vs last month
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                {can('orders.view') && (
                    <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-semibold text-slate-900">Recent Orders</div>
                            <span className="text-xs text-brand-primary cursor-pointer">View all</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                                            <th key={h} className="text-xs font-semibold text-slate-400 text-left py-2 px-2 uppercase">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map(o => (
                                        <tr key={o.id} className="border-b border-slate-100">
                                            <td className="py-3 px-2 text-sm text-slate-700"><span className="text-brand-primary font-semibold">{o.id}</span></td>
                                            <td className="py-3 px-2 text-sm text-slate-700">{o.customer}</td>
                                            <td className="py-3 px-2 text-sm text-slate-700">{o.product}</td>
                                            <td className="py-3 px-2 text-sm text-slate-700 font-bold">{o.amount}</td>
                                            <td className="py-3 px-2 text-sm">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[o.status]}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Top Products */}
                {can('products.view') && (
                    <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-semibold text-slate-900">Top Products</div>
                            <span className="text-xs text-brand-primary cursor-pointer">View all</span>
                        </div>
                        {topProducts.map((p, i) => (
                            <div key={p.name} className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-slate-900 mb-1">{p.name}</div>
                                    <div className="text-xs text-slate-400 mb-1">{p.sales} sales · {p.stock} in stock</div>
                                    <div className="h-1 bg-slate-100 rounded overflow-hidden">
                                        <div className="h-full bg-brand-primary rounded" style={{ width: `${(p.sales / 350) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-slate-900 whitespace-nowrap">{p.revenue}</div>
                            </div>
                        ))}

                        {/* Quick permission indicators */}
                        <div className="mt-5 pt-4 border-t border-slate-200">
                            <div className="text-xs font-semibold text-slate-400 mb-2 uppercase">Your access</div>
                            <div className="flex flex-wrap gap-1">
                                {['products.view', 'products.create', 'products.edit', 'products.delete',
                                    'orders.view', 'orders.manage', 'users.view', 'users.manage'].map(p => (
                                        <span key={p} className={`text-xs px-2 py-1 rounded-full font-medium ${
                                            can(p) ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {can(p) ? '✓' : '✗'} {p}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AdminDashboard
