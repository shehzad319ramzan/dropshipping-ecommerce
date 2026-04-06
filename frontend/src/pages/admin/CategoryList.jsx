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

    if (loading) return <DashboardLayout><div className="p-6">Loading...</div></DashboardLayout>

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
                                className={`bg-brand-secondary text-white px-4 py-2 rounded-lg hover:bg-brand-secondary-dark disabled:opacity-50 flex items-center`}
                            >
                                {syncing ? 'Syncing...' : 'Sync from CJ'}
                            </button>
                        )}
                        {can('categories.create') && (
                            <button
                                onClick={() => router.push('/admin/categories/create')}
                                className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-dark"
                            >
                                Add Category
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Parent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {categories.flatMap(cat =>
                                    [
                                        <tr key={cat.categoryFirstId} className="bg-slate-50">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{cat.categoryFirstName}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">1</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">-</td>
                                            <td className="px-6 py-4 text-sm">
                                                {can('categories.edit') && (
                                                    <button
                                                        onClick={() => router.push(`/admin/categories/${cat.categoryFirstId}`)}
                                                        className="text-brand-primary hover:text-brand-primary-dark mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {can('categories.delete') && (
                                                    <button
                                                        onClick={() => handleDelete(cat.categoryFirstId)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>,
                                        ...cat.categoryFirstList.flatMap(second => [
                                            <tr key={second.categorySecondId} className="bg-white">
                                                <td className="px-6 py-4 text-sm text-slate-700 pl-12">{second.categorySecondName}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">2</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{cat.categoryFirstName}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {can('categories.edit') && (
                                                        <button
                                                            onClick={() => router.push(`/admin/categories/${second.categorySecondId}`)}
                                                            className="text-brand-primary hover:text-brand-primary-dark mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                    {can('categories.delete') && (
                                                        <button
                                                            onClick={() => handleDelete(second.categorySecondId)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>,
                                            ...second.categorySecondList.map(third => (
                                                <tr key={third.categoryId} className="bg-slate-50">
                                                    <td className="px-6 py-4 text-sm text-slate-700 pl-20">{third.categoryName}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">3</td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{second.categorySecondName}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {can('categories.edit') && (
                                                            <button
                                                                onClick={() => router.push(`/admin/categories/${third.categoryId}`)}
                                                                className="text-brand-primary hover:text-brand-primary-dark mr-2"
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                        {can('categories.delete') && (
                                                            <button
                                                                onClick={() => handleDelete(third.categoryId)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
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