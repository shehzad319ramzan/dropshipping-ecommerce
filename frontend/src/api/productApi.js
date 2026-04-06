import axiosInstance from './axiosInstance'

export const getProductsApi = (page = 1, limit = 20) =>
    axiosInstance.get(`/products?page=${page}&limit=${limit}`)

export const getProductApi = (id) =>
    axiosInstance.get(`/products/${id}`)

export const createProductApi = (data) =>
    axiosInstance.post('/products', data)

export const updateProductApi = (id, data) =>
    axiosInstance.put(`/products/${id}`, data)

export const deleteProductApi = (id) =>
    axiosInstance.delete(`/products/${id}`)

export const getProductsByCategoryApi = (categoryId, page = 1, limit = 20) =>
    axiosInstance.get(`/products/category/${categoryId}?page=${page}&limit=${limit}`)