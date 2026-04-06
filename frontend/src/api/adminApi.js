import axiosInstance from './axiosInstance';

export const getUsersApi = () => {
    return axiosInstance.get('/admin/users');
};

export const getDashboardStatsApi = () => {
    return axiosInstance.get('/admin/dashboard-stats');
};