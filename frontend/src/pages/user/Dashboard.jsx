'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'

const myOrders = [
    { id: '#ORD-091', product: 'Wireless Headphones', date: 'Mar 28, 2024', amount: '$49.99', status: 'delivered' },
    { id: '#ORD-087', product: 'Running Shoes', date: 'Mar 15, 2024', amount: '$89.99', status: 'shipped' },
    { id: '#ORD-082', product: 'Backpack', date: 'Mar 02, 2024', amount: '$39.99', status: 'delivered' },
]

const statusColor = {
    delivered: { bg: '#d1fae5', color: '#065f46' },
    shipped: { bg: '#fef3c7', color: '#92400e' },
    pending: { bg: '#fee2e2', color: '#991b1b' },
}

const UserDashboard = () => {
    const router = useRouter()
    const { user, permissions, isAuthenticated, role } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
            return
        }
        if (role && role !== 'user') {
            router.replace('/unauthorized')
        }
    }, [isAuthenticated, role, router])

    if (!isAuthenticated || role !== 'user') {
        return null
    }

    return (
        <DashboardLayout>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <h1 style={styles.pageTitle}>My Dashboard</h1>
                <p style={styles.pageSubtitle}>Welcome back, {user?.name}!</p>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
                {[
                    { label: 'Total Orders', value: '12', color: '#6366f1' },
                    { label: 'Delivered', value: '9', color: '#10b981' },
                    { label: 'In Transit', value: '2', color: '#f59e0b' },
                    { label: 'Total Spent', value: '$642', color: '#3b82f6' },
                ].map(s => (
                    <div key={s.label} style={styles.statCard}>
                        <div style={{ ...styles.statAccent, background: s.color }} />
                        <div style={styles.statLabel}>{s.label}</div>
                        <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <div style={styles.cardTitle}>My Recent Orders</div>
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {['Order ID', 'Product', 'Date', 'Amount', 'Status'].map(h => (
                                <th key={h} style={styles.th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map(o => (
                            <tr key={o.id} style={styles.tr}>
                                <td style={styles.td}><span style={styles.orderId}>{o.id}</span></td>
                                <td style={styles.td}>{o.product}</td>
                                <td style={styles.td}>{o.date}</td>
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

            {/* Permissions */}
            <div style={{ ...styles.card, marginTop: 20 }}>
                <div style={styles.cardTitle}>Your account permissions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                    {permissions.map(p => (
                        <span key={p} style={styles.permBadge}>✓ {p}</span>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

const styles = {
    pageTitle: { fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 },
    pageSubtitle: { color: '#64748b', fontSize: 14, marginTop: 4 },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 16, marginBottom: 24 },
    statCard: { background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' },
    statAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '12px 12px 0 0' },
    statLabel: { fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 8, marginTop: 8 },
    statValue: { fontSize: 28, fontWeight: 700 },
    card: { background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #f1f5f9' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    cardTitle: { fontWeight: 600, fontSize: 15, color: '#0f172a' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { fontSize: 11, fontWeight: 600, color: '#94a3b8', textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #f1f5f9', textTransform: 'uppercase' },
    tr: { borderBottom: '1px solid #f8fafc' },
    td: { padding: '10px 8px', fontSize: 13, color: '#374151' },
    orderId: { color: '#6366f1', fontWeight: 600 },
    badge: { fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 20 },
    permBadge: { fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 20, background: '#d1fae5', color: '#065f46' },
}

export default UserDashboard
