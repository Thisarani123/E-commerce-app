// src/services/api/authAPI.js
import axios from 'axios';
import { API_BASE_URL } from '../../../AppConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  socialLogin: (provider) => api.post(`/auth/${provider}`),
};

// Add interceptors for auth token
api.interceptors.request.use((config) => {
  // In React Native, use AsyncStorage instead of localStorage
  const token = localStorage.getItem('token'); // ← We'll fix this later
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});