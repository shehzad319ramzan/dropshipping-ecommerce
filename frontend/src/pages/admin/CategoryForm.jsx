'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'
import { getCategoriesApi, createCategoryApi, getCategoryApi, updateCategoryApi } from '../../api/categoryApi'

const CategoryForm = () => {
    const router = useRouter()
    const params = useParams()
    const { can, isAuthenticated, role } = useAuth()
    const [formData, setFormData] = useState({ name: '', code: '', parent: '' })
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
            fetchCategory(params.id)
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

    const fetchCategory = async (id) => {
        try {
            const res = await getCategoryApi(id)
            setFormData({
                name: res.data.name,
                code: res.data.code,
                parent: res.data.parent?._id || ''
            })
        } catch (err) {
            alert('Failed to load category')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEdit) {
                await updateCategoryApi(params.id, formData)
            } else {
                await createCategoryApi(formData)
            }
            router.push('/admin/categories')
        } catch (err) {
            alert('Failed to save category')
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

    if (!can(isEdit ? 'categories.edit' : 'categories.create')) {
        return <DashboardLayout><div className="p-6">Access denied</div></DashboardLayout>
    }

    return (
        <DashboardLayout>
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">
                    {isEdit ? 'Edit Category' : 'Create Category'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Code</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Parent Category</label>
                        <select
                            value={formData.parent}
                            onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        >
                            <option value="">None (Root Category)</option>
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
                            onClick={() => router.push('/admin/categories')}
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

export default CategoryForm