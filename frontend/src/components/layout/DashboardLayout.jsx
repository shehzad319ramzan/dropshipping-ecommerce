'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`flex-1 transition-all duration-300 ease-in-out ${collapsed ? 'ml-20' : 'ml-64'} min-h-screen`}>
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
