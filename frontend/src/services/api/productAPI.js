// src/services/api/productAPI.js
import axios from 'axios';
import { API_BASE_URL } from '../../../AppConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productAPI = {
  getProducts: (filters = {}) => {
    // For now, use mock data from sampleProducts
    // In real app, this would be: return api.get('/products', { params: filters });
    return Promise.resolve({
      data: {
        products: [], // You can return sample data if needed
        pagination: { current: 1, pages: 1, total: 0 }
      }
    });
  },
  getRecommendations: (userId) => {
    // Mock recommendation
    return Promise.resolve({ data: [] });
  },
  search: (query) => {
    return Promise.resolve({ data: [] });
  }
};