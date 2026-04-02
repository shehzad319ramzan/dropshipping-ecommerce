'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'

const stats = [
    { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, color: '#6366f1' },
    { label: 'Total Orders', value: '1,284', change: '+8.2%', up: true, color: '#10b981' },
    { label: 'Total Users', value: '3,921', change: '+5.1%', up: true, color: '#f59e0b' },
    { label: 'Pending Orders', value: '43', change: '-2.3%', up: false, color: '#ef4444' },
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
    delivered: { bg: '#d1fae5', color: '#065f46' },
    processing: { bg: '#dbeafe', color: '#1e40af' },
    shipped: { bg: '#fef3c7', color: '#92400e' },
    pending: { bg: '#fee2e2', color: '#991b1b' },
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
            <div style={{ marginBottom: 28 }}>
                <h1 style={styles.pageTitle}>Dashboard</h1>
                <p style={styles.pageSubtitle}>Welcome back, {user?.name}. Here's what's happening today.</p>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
                {stats.map(s => (
                    <div key={s.label} style={styles.statCard}>
                        <div style={{ ...styles.statAccent, background: s.color }} />
                        <div style={styles.statLabel}>{s.label}</div>
                        <div style={styles.statValue}>{s.value}</div>
                        <div style={{ ...styles.statChange, color: s.up ? '#10b981' : '#ef4444' }}>
                            {s.up ? '↑' : '↓'} {s.change} vs last month
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.twoCol}>
                {/* Recent Orders */}
                {can('orders.view') && (
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardTitle}>Recent Orders</div>
                            <span style={styles.viewAll}>View all</span>
                        </div>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(o => (
                                    <tr key={o.id} style={styles.tr}>
                                        <td style={styles.td}><span style={styles.orderId}>{o.id}</span></td>
                                        <td style={styles.td}>{o.customer}</td>
                                        <td style={styles.td}>{o.product}</td>
                                        <td style={styles.td}><strong>{o.amount}</strong></td>
                                        <td style={styles.td}>
                                            <span style={{ ...styles.badge, ...statusColor[o.status] }}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Top Products */}
                {can('products.view') && (
                    <div style={{ ...styles.card, minWidth: 0 }}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardTitle}>Top Products</div>
                            <span style={styles.viewAll}>View all</span>
                        </div>
                        {topProducts.map((p, i) => (
                            <div key={p.name} style={styles.productRow}>
                                <div style={styles.productRank}>{i + 1}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={styles.productName}>{p.name}</div>
                                    <div style={styles.productMeta}>{p.sales} sales · {p.stock} in stock</div>
                                    <div style={styles.barTrack}>
                                        <div style={{ ...styles.barFill, width: `${(p.sales / 350) * 100}%` }} />
                                    </div>
                                </div>
                                <div style={styles.productRevenue}>{p.revenue}</div>
                            </div>
                        ))}

                        {/* Quick permission indicators */}
                        <div style={styles.permBox}>
                            <div style={styles.permTitle}>Your access</div>
                            <div style={styles.permList}>
                                {['products.view', 'products.create', 'products.edit', 'products.delete',
                                    'orders.view', 'orders.manage', 'users.view', 'users.manage'].map(p => (
                                        <span key={p} style={{
                                            ...styles.permBadge,
                                            background: can(p) ? '#d1fae5' : '#f3f4f6',
                                            color: can(p) ? '#065f46' : '#9ca3af',
                                        }}>
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

const styles = {
    pageTitle: { fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 },
    pageSubtitle: { color: '#64748b', fontSize: 14, marginTop: 4 },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
    statCard: { background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' },
    statAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '12px 12px 0 0' },
    statLabel: { fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 8, marginTop: 8 },
    statValue: { fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 4 },
    statChange: { fontSize: 12 },
    twoCol: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 },
    card: { background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #f1f5f9' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    cardTitle: { fontWeight: 600, fontSize: 15, color: '#0f172a' },
    viewAll: { fontSize: 12, color: '#6366f1', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { fontSize: 11, fontWeight: 600, color: '#94a3b8', textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #f1f5f9', textTransform: 'uppercase' },
    tr: { borderBottom: '1px solid #f8fafc' },
    td: { padding: '10px 8px', fontSize: 13, color: '#374151' },
    orderId: { color: '#6366f1', fontWeight: 600 },
    badge: { fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 20 },
    productRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
    productRank: { width: 24, height: 24, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748b', flexShrink: 0 },
    productName: { fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 },
    productMeta: { fontSize: 11, color: '#94a3b8', marginBottom: 4 },
    barTrack: { height: 4, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' },
    barFill: { height: '100%', background: '#6366f1', borderRadius: 4 },
    productRevenue: { fontSize: 13, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' },
    permBox: { marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' },
    permTitle: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase' },
    permList: { display: 'flex', flexWrap: 'wrap', gap: 6 },
    permBadge: { fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500 },
}

export default AdminDashboard
