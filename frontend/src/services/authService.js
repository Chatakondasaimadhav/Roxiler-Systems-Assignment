import api from './api';

export const login = (data) => api.post('/users/login', data);
export const signup = (data) => api.post('/users/register', data);
export const updatePassword = (data) => api.put('/users/update-password', data);
