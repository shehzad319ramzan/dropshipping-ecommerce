'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'
import { getProductsApi, deleteProductApi } from '../../api/productApi'
import { syncProductsApi } from '../../api/cjApi'

const ProductList = () => {
    const router = useRouter()
    const { can, isAuthenticated, role } = useAuth()
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(true)
    const [syncing, setSyncing] = useState(false)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [syncKeyword, setSyncKeyword] = useState('hoodie')

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
            return
        }
        if (role && role !== 'admin') {
            router.replace('/unauthorized')
        }
        fetchProducts()
    }, [isAuthenticated, role, router, page])

    const fetchProducts = async () => {
        try {
            const res = await getProductsApi(page, 20)
            setProducts(res.data.data.content)
            setPagination(res.data.data)
        } catch (err) {
            setError('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    const handleSync = async () => {
        if (!syncKeyword) {
            alert('Please enter a keyword to sync products')
            return
        }
        if (!confirm(`Sync products from CJ for keyword: "${syncKeyword}"?`)) return
        setSyncing(true)
        setError('')
        try {
            const res = await syncProductsApi({ keyWord: syncKeyword })
            alert(res.data.message)
            fetchProducts()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sync products')
        } finally {
            setSyncing(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return
        try {
            await deleteProductApi(id)
            fetchProducts()
        } catch (err) {
            alert('Failed to delete product')
        }
    }

    if (!isAuthenticated || role !== 'admin') {
        return null
    }

    if (loading) return <DashboardLayout><div className="p-6">Loading...</div></DashboardLayout>

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    <div className="flex gap-2 items-center">
                        {can('products.create') && (
                            <div className="flex gap-2 items-center mr-4 border-r pr-4 border-slate-200">
                                <input
                                    type="text"
                                    value={syncKeyword}
                                    onChange={(e) => setSyncKeyword(e.target.value)}
                                    placeholder="Sync keyword..."
                                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                                <button
                                    onClick={handleSync}
                                    disabled={syncing}
                                    className="bg-brand-secondary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 text-sm"
                                >
                                    {syncing ? 'Syncing...' : 'Sync from CJ'}
                                </button>
                            </div>
                        )}
                        {can('products.create') && (
                            <button
                                onClick={() => router.push('/admin/products/create')}
                                className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-dark"
                            >
                                Add Product
                            </button>
                        )}
                    </div>
                </div>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">CJ ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Listed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4">
                                            <img
                                                src={product.bigImage}
                                                alt={product.nameEn}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 max-w-xs truncate">
                                            {product.nameEn}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{product.sku}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-mono text-xs">
                                            {product.cjProductId ? product.cjProductId.substring(0, 8) + '...' : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">{product.sellPrice}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{product.warehouseInventoryNum}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{product.listedNum || 0}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {can('products.edit') && (
                                                <button
                                                    onClick={() => router.push(`/admin/products/${product.id}`)}
                                                    className="text-brand-primary hover:text-brand-primary-dark mr-2"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {can('products.delete') && (
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1">Page {page} of {pagination.totalPages}</span>
                            <button
                                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default ProductList