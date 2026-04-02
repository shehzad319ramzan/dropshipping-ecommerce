'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main style={{
                marginLeft: collapsed ? 64 : 240,
                transition: 'margin-left 0.25s ease',
                flex: 1,
                padding: '32px',
                minHeight: '100vh',
            }}>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
