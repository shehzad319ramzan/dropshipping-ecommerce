'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'
import { getCategoriesApi } from '../../api/categoryApi'
import { createProductApi, getProductApi, updateProductApi } from '../../api/productApi'

const ProductForm = () => {
    const router = useRouter()
    const params = useParams()
    const { can, isAuthenticated, role } = useAuth()
    const [formData, setFormData] = useState({
        cjProductId: '',
        nameEn: '',
        sku: '',
        isCollect: 0,
        listedNum: 0,
        bigImage: '',
        sellPrice: '',
        nowPrice: '',
        authorityStatus: '1',
        addMarkStatus: 0,
        isVedio: 0,
        productType: '0',
        isAut: '0',
        cjCategoryId: '',
        warehouseInventoryNum: 0,
        discountPrice: '',
        currency: 'USD',
        deliveryCycle: '',
        supplierName: '',
        description: '',
        isVideo: 0,
        videoList: [],
        categoryId: ''
    })
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
            return
        }
        if (role && role !== 'admin') {
            router.replace('/unauthorized')
        }
        if (params.id) {
            setIsEdit(true)
            fetchProduct(params.id)
        }
        fetchCategories()
    }, [isAuthenticated, role, router, params.id])

    const fetchCategories = async () => {
        try {
            const res = await getCategoriesApi()
            setCategories(res.data.data)
        } catch (err) {
            console.error('Failed to load categories')
        }
    }

    const fetchProduct = async (id) => {
        try {
            const res = await getProductApi(id)
            setFormData({
                cjProductId: res.data.cjProductId || '',
                nameEn: res.data.nameEn || '',
                sku: res.data.sku || '',
                isCollect: res.data.isCollect || 0,
                listedNum: res.data.listedNum || 0,
                bigImage: res.data.bigImage || '',
                sellPrice: res.data.sellPrice || '',
                nowPrice: res.data.nowPrice || '',
                authorityStatus: res.data.authorityStatus || '1',
                addMarkStatus: res.data.addMarkStatus || 0,
                isVedio: res.data.isVedio || 0,
                productType: res.data.productType || '0',
                isAut: res.data.isAut || '0',
                cjCategoryId: res.data.cjCategoryId || '',
                warehouseInventoryNum: res.data.warehouseInventoryNum || 0,
                discountPrice: res.data.discountPrice || '',
                currency: res.data.currency || 'USD',
                deliveryCycle: res.data.deliveryCycle || '',
                supplierName: res.data.supplierName || '',
                description: res.data.description || '',
                isVideo: res.data.isVideo || 0,
                videoList: res.data.videoList || [],
                categoryId: res.data.categoryId?._id || ''
            })
        } catch (err) {
            alert('Failed to load product')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEdit) {
                await updateProductApi(params.id, formData)
            } else {
                await createProductApi(formData)
            }
            router.push('/admin/products')
        } catch (err) {
            alert('Failed to save product')
        } finally {
            setLoading(false)
        }
    }

    const getFlatCategories = () => {
        const flat = []
        categories.forEach(cat => {
            flat.push({ id: cat.categoryFirstId, name: cat.categoryFirstName, level: 1 })
            cat.categoryFirstList.forEach(second => {
                flat.push({ id: second.categorySecondId, name: second.categorySecondName, level: 2 })
                second.categorySecondList.forEach(third => {
                    flat.push({ id: third.categoryId, name: third.categoryName, level: 3 })
                })
            })
        })
        return flat
    }

    if (!isAuthenticated || role !== 'admin') {
        return null
    }

    if (!can(isEdit ? 'products.edit' : 'products.create')) {
        return <DashboardLayout><div className="p-6">Access denied</div></DashboardLayout>
    }

    return (
        <DashboardLayout>
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">
                    {isEdit ? 'Edit Product' : 'Create Product'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.nameEn}
                            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">SKU</label>
                        <input
                            type="text"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CJ Product ID</label>
                        <input
                            type="text"
                            value={formData.cjProductId}
                            onChange={(e) => setFormData({ ...formData, cjProductId: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            placeholder="Optional CJ Dropshipping product ID"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            value={formData.bigImage}
                            onChange={(e) => setFormData({ ...formData, bigImage: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                            <input
                                type="text"
                                value={formData.sellPrice}
                                onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                placeholder="e.g., 4.36 -- 6.14"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Discount Price</label>
                            <input
                                type="text"
                                value={formData.discountPrice}
                                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="CAD">CAD</option>
                                <option value="AUD">AUD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Stock</label>
                            <input
                                type="number"
                                value={formData.warehouseInventoryNum}
                                onChange={(e) => setFormData({ ...formData, warehouseInventoryNum: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Cycle</label>
                            <input
                                type="text"
                                value={formData.deliveryCycle}
                                onChange={(e) => setFormData({ ...formData, deliveryCycle: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                placeholder="e.g., 3-5 days"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Supplier</label>
                            <input
                                type="text"
                                value={formData.supplierName}
                                onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">CJ Category ID</label>
                            <input
                                type="text"
                                value={formData.cjCategoryId}
                                onChange={(e) => setFormData({ ...formData, cjCategoryId: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                placeholder="CJ category UUID"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Listed Count</label>
                            <input
                                type="number"
                                value={formData.listedNum}
                                onChange={(e) => setFormData({ ...formData, listedNum: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            placeholder="Product description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Has Video</label>
                            <select
                                value={formData.isVideo}
                                onChange={(e) => setFormData({ ...formData, isVideo: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            >
                                <option value={0}>No</option>
                                <option value={1}>Yes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Video URLs (one per line)</label>
                            <textarea
                                value={formData.videoList.join('\n')}
                                onChange={(e) => setFormData({ ...formData, videoList: e.target.value.split('\n').filter(url => url.trim()) })}
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                                placeholder="https://example.com/video1.mp4"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="">Select Category</option>
                            {getFlatCategories().map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {'  '.repeat(cat.level - 1)}{cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-dark disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/admin/products')}
                            className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}

export default ProductForm