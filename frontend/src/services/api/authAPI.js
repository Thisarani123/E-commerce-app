// src/services/api/authAPI.js
import axios from 'axios';
import { API_BASE_URL } from '../../../AppConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  // In real app, get token from AsyncStorage
  const token = null; // Replace with real token later
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resendOTP: (userId) => api.post('/auth/resend-otp', { userId }),
  socialLogin: (provider) => api.post(`/auth/${provider}`),
};