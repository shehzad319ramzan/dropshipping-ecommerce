'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'

const allNavItems = [
    {
        section: 'Overview',
        items: [
            { label: 'Dashboard', path: '/admin/dashboard', icon: '▦', permission: null, adminOnly: false },
            { label: 'Analytics', path: '/admin/analytics', icon: '▲', permission: null, adminOnly: true },
        ],
    },
    {
        section: 'Catalog',
        items: [
            { label: 'Categories', path: '/admin/categories', icon: '📁', permission: 'categories.view' },
            { label: 'Add Category', path: '/admin/categories/create', icon: '+', permission: 'categories.create' },
            { label: 'Products', path: '/admin/products', icon: '◈', permission: 'products.view' },
            { label: 'Add Product', path: '/admin/products/create', icon: '+', permission: 'products.create' },
        ],
    },
    {
        section: 'Sales',
        items: [
            { label: 'Orders', path: '/admin/orders', icon: '◎', permission: 'orders.view' },
            { label: 'Manage Orders', path: '/admin/orders/manage', icon: '◉', permission: 'orders.manage' },
        ],
    },
    {
        section: 'People',
        items: [
            { label: 'Users', path: '/admin/users', icon: '◯', permission: 'users.view' },
            { label: 'Manage Users', path: '/admin/users/manage', icon: '●', permission: 'users.manage' },
        ],
    },
]

const userNavItems = [
    {
        section: 'My Account',
        items: [
            { label: 'Dashboard', path: '/dashboard', icon: '▦', permission: null },
            { label: 'My Orders', path: '/my-orders', icon: '◎', permission: 'orders.view' },
            { label: 'Browse Products', path: '/', icon: '◈', permission: 'products.view' },
        ],
    },
]

const Sidebar = ({ collapsed, setCollapsed }) => {
    const { role, can, user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const nav = role === 'admin' ? allNavItems : userNavItems

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <aside style={{
            ...styles.sidebar,
            width: collapsed ? 64 : 240,
            transition: 'width 0.25s ease',
        }}>
            {/* Logo */}
            <div style={styles.logo}>
                <div style={styles.logoIcon}>S</div>
                {!collapsed && <span style={styles.logoText}>ShopAdmin</span>}
            </div>

            {/* Toggle */}
            <button onClick={() => setCollapsed(!collapsed)} style={styles.toggleBtn}>
                {collapsed ? '→' : '←'}
            </button>

            {/* Nav */}
            <nav style={styles.nav}>
                {nav.map(section => {
                    const visibleItems = section.items.filter(item =>
                        item.permission === null ? true : can(item.permission)
                    )
                    if (visibleItems.length === 0) return null

                    return (
                        <div key={section.section} style={styles.section}>
                            {!collapsed && (
                                <div style={styles.sectionLabel}>{section.section}</div>
                            )}
                            {visibleItems.map(item => {
                                const isActive = pathname === item.path
                                return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    style={{
                                        ...styles.navItem,
                                        background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                                        color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                                        justifyContent: collapsed ? 'center' : 'flex-start',
                                    }}
                                >
                                    <span style={styles.icon}>{item.icon}</span>
                                    {!collapsed && <span style={styles.label}>{item.label}</span>}
                                </Link>
                            )})}
                        </div>
                    )
                })}
            </nav>

            {/* User footer */}
            <div style={{ ...styles.footer, justifyContent: collapsed ? 'center' : 'space-between' }}>
                {!collapsed && (
                    <div>
                        <div style={styles.userName}>{user?.name}</div>
                        <div style={styles.userRole}>{role}</div>
                    </div>
                )}
                <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">⏻</button>
            </div>
        </aside>
    )
}

const styles = {
    sidebar: { background: '#0f172a', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100, overflow: 'hidden' },
    logo: { display: 'flex', alignItems: 'center', gap: 10, padding: '20px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
    logoIcon: { width: 32, height: 32, background: '#6366f1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 16, flexShrink: 0 },
    logoText: { color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', whiteSpace: 'nowrap' },
    toggleBtn: { background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '6px', margin: '8px 10px', borderRadius: 6, fontSize: 12, alignSelf: 'flex-end' },
    nav: { flex: 1, overflowY: 'auto', padding: '4px 8px' },
    section: { marginBottom: 8 },
    sectionLabel: { fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', padding: '8px 8px 4px', textTransform: 'uppercase' },
    navItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'all 0.15s', marginBottom: 2 },
    icon: { fontSize: 14, width: 18, textAlign: 'center', flexShrink: 0 },
    label: { whiteSpace: 'nowrap' },
    footer: { display: 'flex', alignItems: 'center', padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.08)', gap: 8 },
    userName: { color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' },
    userRole: { color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'capitalize' },
    logoutBtn: { background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', borderRadius: 6, padding: '6px 8px', fontSize: 14, flexShrink: 0 },
}

export default Sidebar
