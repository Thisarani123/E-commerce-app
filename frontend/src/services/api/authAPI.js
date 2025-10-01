// src/services/api/authAPI.js
import axios from 'axios';
import { API_BASE_URL } from '../../../AppConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token interceptor (optional for now)
api.interceptors.request.use((config) => {
  // In real app, you'd get token from AsyncStorage
  // For now, skip — login/register don’t need token
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  socialLogin: (provider) => api.post(`/auth/${provider}`),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resendOTP: (data) => api.post('/auth/resend-otp', data),
};