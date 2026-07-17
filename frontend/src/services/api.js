import axios from 'axios';

const API = axios.create({
  baseURL: 'https://epic-wear-backend.onrender.com/api'
});

export const getProducts = (edition) => 
  API.get('/products', { params: edition ? { edition } : {} });
export const getProduct = (id) => API.get(`/products/${id}`);
export const getCategories = () => API.get('/categories');
export const getCart = (userId) => API.get(`/cart/${userId}`);
export const addToCart = (data) => API.post('/cart', data);
export const createOrder = (data) => API.post('/orders', data);
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);