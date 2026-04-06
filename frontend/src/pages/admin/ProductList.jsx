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

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const handleView = (product) => {
        setSelectedProduct(product)
        setIsViewModalOpen(true)
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

    if (loading) return <DashboardLayout><div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
        <p className="mt-4 text-slate-600">Loading products...</p>
    </div></DashboardLayout>

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
                                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary w-48"
                                />
                                <button
                                    onClick={handleSync}
                                    disabled={syncing}
                                    className="bg-brand-secondary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 text-sm font-medium transition-colors"
                                >
                                    {syncing ? (
                                        <span className="flex items-center gap-2">
                                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                            Syncing...
                                        </span>
                                    ) : 'Sync from CJ'}
                                </button>
                            </div>
                        )}
                        {can('products.create') && (
                            <button
                                onClick={() => router.push('/admin/products/create')}
                                className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-dark font-medium transition-colors shadow-sm"
                            >
                                Add Product
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                        <span className="text-lg">⚠️</span>
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">CJ ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {products.map(product => (
                                    <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-12 w-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100">
                                                <img
                                                    src={product.bigImage}
                                                    alt={product.nameEn}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-900 max-w-xs truncate" title={product.nameEn}>
                                                {product.nameEn}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                Category: {product.categoryId?.name || 'Uncategorized'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{product.sku}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                                            {product.cjProductId ? product.cjProductId.substring(0, 8) + '...' : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-semibold">{product.sellPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                product.warehouseInventoryNum > 10 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                            }`}>
                                                {product.warehouseInventoryNum} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleView(product)}
                                                    className="text-slate-600 hover:text-brand-primary transition-colors"
                                                >
                                                    View
                                                </button>
                                                {can('products.edit') && (
                                                    <button
                                                        onClick={() => router.push(`/admin/products/${product._id}`)}
                                                        className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {can('products.delete') && (
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <nav className="flex items-center gap-1">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                            >
                                ←
                            </button>
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                        page === i + 1 
                                        ? 'bg-brand-primary text-white shadow-sm' 
                                        : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                                disabled={page === pagination.totalPages}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                            >
                                →
                            </button>
                        </nav>
                    </div>
                )}
            </div>

            {/* Product View Modal */}
            {isViewModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-lift w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-bold text-slate-900">Product Details</h2>
                            <button 
                                onClick={() => setIsViewModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto">
                            <div className="flex gap-8 mb-8">
                                <div className="w-48 h-48 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0">
                                    <img 
                                        src={selectedProduct.bigImage} 
                                        alt={selectedProduct.nameEn} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-2">
                                        {selectedProduct.categoryId?.name || 'Uncategorized'}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{selectedProduct.nameEn}</h3>
                                    <div className="flex gap-4 mb-4">
                                        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600">
                                            SKU: {selectedProduct.sku}
                                        </div>
                                        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600">
                                            CJ ID: {selectedProduct.cjProductId || 'Manual'}
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black text-brand-primary">
                                        {selectedProduct.sellPrice}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Stock Level</div>
                                    <div className="text-lg font-bold text-slate-900">{selectedProduct.warehouseInventoryNum} Units</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Listed Count</div>
                                    <div className="text-lg font-bold text-slate-900">{selectedProduct.listedNum || 0} Times</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Product Type</div>
                                    <div className="text-lg font-bold text-slate-900">{selectedProduct.productType || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Created At</div>
                                    <div className="text-lg font-bold text-slate-900">
                                        {new Date(selectedProduct.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {selectedProduct.description && (
                                <div className="mt-8">
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Description</h4>
                                    <div className="text-sm text-slate-600 leading-relaxed max-h-40 overflow-y-auto pr-4 custom-scrollbar">
                                        {selectedProduct.description}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                            <button 
                                onClick={() => setIsViewModalOpen(false)}
                                className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}

export default ProductList