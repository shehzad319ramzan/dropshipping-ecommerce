import axiosInstance from './axiosInstance';

export const syncCategoriesApi = () => {
    return axiosInstance.post('/cj/sync/categories');
};

export const syncProductsApi = (params = {}) => {
    return axiosInstance.post('/cj/sync/products', {}, { params });
};