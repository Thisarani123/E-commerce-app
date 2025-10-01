// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../services/api/authAPI';

// ✅ Async Thunks (these are the functions you dispatch)
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      // ✅ Extract user and token from data
      if (!response.data || !response.data.user || !response.data.token) {
        throw new Error('Invalid login response');
      }
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      // ✅ Extract user from data
      if (!response.data || !response.data.user) {
        throw new Error('No user data returned from server');
      }
      return response.data.user; // ✅ Now returns just the user object
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const socialLogin = createAsyncThunk(
  'auth/socialLogin',
  async (provider, { rejectWithValue }) => {
    try {
      const response = await authAPI.socialLogin(provider);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Social login failed');
    }
  }
);

// ✅ Slice
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
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
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
        state.error = action.payload || 'Login failed';
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Note: user may not be fully verified yet
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })

      // Social Login
      .addCase(socialLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Social login failed';
      });
  },
});

// ✅ Export actions & reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;