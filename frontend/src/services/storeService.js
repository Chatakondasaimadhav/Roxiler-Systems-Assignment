import api from './api';

export const getStores = () => api.get('/stores');
export const submitRating = (storeId, rating) =>
  api.post('/stores/rate', { store_id: storeId, rating });
