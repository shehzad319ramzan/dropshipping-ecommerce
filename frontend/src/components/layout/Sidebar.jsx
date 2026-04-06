'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'
import { 
    LayoutDashboard, 
    BarChart3, 
    FolderTree, 
    PackagePlus, 
    Package, 
    PlusCircle, 
    ShoppingBag, 
    Users, 
    Settings, 
    LogOut,
    ChevronLeft,
    ChevronRight,
    Store
} from 'lucide-react'

const allNavItems = [
    {
        section: 'Overview',
        items: [
            { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, permission: null, adminOnly: false },
        ],
    },
    {
        section: 'Catalog',
        items: [
            { label: 'Categories', path: '/admin/categories', icon: FolderTree, permission: 'categories.view' },
            { label: 'Products', path: '/admin/products', icon: Package, permission: 'products.view' },
        ],
    },
    {
        section: 'People',
        items: [
            { label: 'Users', path: '/admin/users', icon: Users, permission: 'users.view' },
        ],
    },
]

const userNavItems = [
    {
        section: 'My Account',
        items: [
            { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, permission: null },
            { label: 'My Orders', path: '/my-orders', icon: ShoppingBag, permission: 'orders.view' },
            { label: 'Browse Store', path: '/', icon: Store, permission: null },
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
        <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-800 bg-slate-900 text-slate-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo */}
            <div className="flex items-center h-20 px-6 border-b border-slate-800/50 overflow-hidden">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand-primary text-slate-900 font-black text-xl flex-shrink-0 shadow-lg shadow-brand-primary/20">
                    S
                </div>
                {!collapsed && (
                    <span className="ml-3 text-lg font-bold text-white tracking-tight">
                        Shop<span className="text-brand-primary">Admin</span>
                    </span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex flex-col h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden p-4 custom-scrollbar">
                {nav.map(section => {
                    const visibleItems = section.items.filter(item =>
                        item.permission === null ? true : can(item.permission)
                    )
                    if (visibleItems.length === 0) return null

                    return (
                        <div key={section.section} className="mb-6">
                            {!collapsed && (
                                <div className="px-4 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                                    {section.section}
                                </div>
                            )}
                            <div className="space-y-1">
                                {visibleItems.map(item => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.path
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                                isActive 
                                                ? 'bg-brand-primary/10 text-brand-primary' 
                                                : 'hover:bg-slate-800/50 hover:text-white'
                                            }`}
                                        >
                                            <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-brand-primary' : 'text-slate-400 group-hover:text-white transition-colors'}`} />
                                            {!collapsed && (
                                                <span className={`ml-3 text-sm font-medium whitespace-nowrap`}>
                                                    {item.label}
                                                </span>
                                            )}
                                            {isActive && !collapsed && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(255,178,0,0.6)]"></div>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="absolute bottom-0 left-0 w-full border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm p-4">
                {!collapsed ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-2">
                            <div className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold uppercase">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">{role || 'Customer'}</p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                title="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={handleLogout}
                        className="w-full flex justify-center py-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                )}
            </div>

            {/* Toggle Button */}
            <button 
                onClick={() => setCollapsed(!collapsed)} 
                className="absolute -right-3 top-24 h-6 w-6 rounded-full border border-slate-800 bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center shadow-xl z-50 transition-colors"
            >
                {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>
        </aside>
    )
}

export default Sidebar
