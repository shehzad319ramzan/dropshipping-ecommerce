'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../../components/layout/DashboardLayout'
import useAuth from '../../hooks/useAuth'
import { getCategoriesApi, deleteCategoryApi } from '../../api/categoryApi'
import { syncCategoriesApi } from '../../api/cjApi'

const CategoryList = () => {
    const router = useRouter()
    const { can, isAuthenticated, role } = useAuth()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [syncing, setSyncing] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
            return
        }
        if (role && role !== 'admin') {
            router.replace('/unauthorized')
        }
        fetchCategories()
    }, [isAuthenticated, role, router])

    const fetchCategories = async () => {
        try {
            const res = await getCategoriesApi()
            setCategories(res.data.data)
        } catch (err) {
            setError('Failed to load categories')
        } finally {
            setLoading(false)
        }
    }

    const handleSync = async () => {
        if (!confirm('Sync categories from CJ Dropshipping? This might take a while.')) return
        setSyncing(true)
        setError('')
        try {
            const res = await syncCategoriesApi()
            alert(res.data.message)
            fetchCategories()
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sync categories')
        } finally {
            setSyncing(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return
        try {
            await deleteCategoryApi(id)
            fetchCategories()
        } catch (err) {
            alert('Failed to delete category')
        }
    }

    if (!isAuthenticated || role !== 'admin') {
        return null
    }

    if (loading) return <DashboardLayout><div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
        <p className="mt-4 text-slate-600">Loading categories...</p>
    </div></DashboardLayout>

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
                    <div className="flex gap-2">
                        {can('categories.create') && (
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                className="bg-brand-secondary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 flex items-center gap-2 font-medium transition-colors shadow-sm"
                            >
                                {syncing ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        Syncing...
                                    </>
                                ) : 'Sync from CJ'}
                            </button>
                        )}
                        {can('categories.create') && (
                            <button
                                onClick={() => router.push('/admin/categories/create')}
                                className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-dark font-medium transition-colors shadow-sm"
                            >
                                Add Category
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
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Parent</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {categories.flatMap(cat =>
                                    [
                                        <tr key={cat.categoryFirstId} className="bg-slate-50/50 hover:bg-slate-100 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{cat.categoryFirstName}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">L1</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">—</td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <div className="flex gap-3">
                                                    {can('categories.edit') && (
                                                        <button
                                                            onClick={() => router.push(`/admin/categories/${cat.categoryFirstId}`)}
                                                            className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                    {can('categories.delete') && (
                                                        <button
                                                            onClick={() => handleDelete(cat.categoryFirstId)}
                                                            className="text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>,
                                        ...cat.categoryFirstList.flatMap(second => [
                                            <tr key={second.categorySecondId} className="bg-white hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-slate-700 pl-12">
                                                    <span className="text-slate-300 mr-2">└</span>
                                                    {second.categorySecondName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">L2</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{cat.categoryFirstName}</td>
                                                <td className="px-6 py-4 text-sm font-medium">
                                                    <div className="flex gap-3">
                                                        {can('categories.edit') && (
                                                            <button
                                                                onClick={() => router.push(`/admin/categories/${second.categorySecondId}`)}
                                                                className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                        {can('categories.delete') && (
                                                            <button
                                                                onClick={() => handleDelete(second.categorySecondId)}
                                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>,
                                            ...second.categorySecondList.map(third => (
                                                <tr key={third.categoryId} className="bg-slate-50/30 hover:bg-slate-100 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-600 pl-20">
                                                        <span className="text-slate-200 mr-2">└</span>
                                                        {third.categoryName}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">L3</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{second.categorySecondName}</td>
                                                    <td className="px-6 py-4 text-sm font-medium">
                                                        <div className="flex gap-3">
                                                            {can('categories.edit') && (
                                                                <button
                                                                    onClick={() => router.push(`/admin/categories/${third.categoryId}`)}
                                                                    className="text-brand-primary hover:text-brand-primary-dark transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                            {can('categories.delete') && (
                                                                <button
                                                                    onClick={() => handleDelete(third.categoryId)}
                                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ])
                                    ]
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default CategoryList