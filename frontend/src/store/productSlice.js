// src/store/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  products,
  categories,
  getRelatedProducts,
  getSimilarProducts
} from '../data/sampleProducts';
import { productAPI } from '../services/api/productAPI';

// Async thunks (for real backend integration)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}) => {
    // In real app, this would call API
    // const response = await productAPI.getProducts(filters);
    // return response.data;
    return products; // Using sample data for now
  }
);

export const fetchRecommendedProducts = createAsyncThunk(
  'products/fetchRecommended',
  async (userId) => {
    // const response = await productAPI.getRecommendations(userId);
    // return response.data;
    return products.slice(0, 8); // Mock data
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query) => {
    // const response = await productAPI.search(query);
    // return response.data;
    return products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: products,
    categories: categories,
    filteredList: products,
    recommended: [],
    searchResults: [],
    filters: {
      category: null,
      priceRange: { min: 0, max: 5000 },
      brand: [],
      rating: 0,
      inStock: false
    },
    searchQuery: '',
    status: 'idle',
    error: null
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredList = applyFilters(state.list, state.filters);
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: { min: 0, max: 5000 },
        brand: [],
        rating: 0,
        inStock: false
      };
      state.filteredList = state.list;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload) {
        state.searchResults = searchProductsOptimized(state.list, action.payload);
      } else {
        state.searchResults = [];
      }
    },
    syncCartOnLogin: (state, action) => {
      console.log('Syncing cart for user:', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.filteredList = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
        state.recommended = action.payload;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  }
});

// Optimized search function
const searchProductsOptimized = (products, query) => {
  const searchTerms = query.toLowerCase().split(' ');
  return products.filter(product => {
    const searchableText = `${product.name} ${product.description} ${product.brand} ${product.tags.join(' ')} ${product.category}`.toLowerCase();
    return searchTerms.every(term => term.length > 0 && searchableText.includes(term));
  });
};

// Advanced filter application
const applyFilters = (products, filters) => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) return false;

    // Price range filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;

    // Brand filter
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;

    // Rating filter
    if (product.rating < filters.rating) return false;

    // Stock filter
    if (filters.inStock && product.stock === 0) return false;

    return true;
  });
};

export const { setFilters, clearFilters, setSearchQuery, syncCartOnLogin } = productSlice.actions;

export default productSlice.reducer;

// Selectors
export const selectFilteredProducts = (state) => state.products.filteredList;
export const selectProductsByCategory = (categoryId) => (state) =>
  state.products.list.filter(p => p.category === categoryId);
export const selectRelatedProducts = (product) => (state) => getRelatedProducts(product);
export const selectSimilarProducts = (product) => (state) => getSimilarProducts(product);