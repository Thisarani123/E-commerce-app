// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../services/api/authAPI';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await authAPI.login(credentials);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await authAPI.register(userData);
    return response.data;
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data) => {
    const response = await authAPI.verifyOTP(data);
    return response.data;
  }
);

export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (userId) => {
    const response = await authAPI.resendOTP(userId);
    return response.data;
  }
);

export const socialLogin = createAsyncThunk(
  'auth/socialLogin',
  async (provider) => {
    const response = await authAPI.socialLogin(provider);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;