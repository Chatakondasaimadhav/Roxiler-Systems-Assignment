import api from './api';

export const addUser = (data) => api.post('/users/add', data);
export const getStats = () => api.get('/admin/stats');
