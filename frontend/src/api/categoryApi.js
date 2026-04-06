import axiosInstance from './axiosInstance'

export const getCategoriesApi = () =>
    axiosInstance.get('/categories')

export const getCategoryApi = (id) =>
    axiosInstance.get(`/categories/${id}`)

export const createCategoryApi = (data) =>
    axiosInstance.post('/categories', data)

export const updateCategoryApi = (id, data) =>
    axiosInstance.put(`/categories/${id}`, data)

export const deleteCategoryApi = (id) =>
    axiosInstance.delete(`/categories/${id}`)