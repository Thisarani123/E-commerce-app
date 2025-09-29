import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products, categories, getRelatedProducts, getSimilarProducts } from '../data/sampleProducts';
import { productAPI } from '../services/api/productAPI';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}) => {
    const response = await productAPI.getProducts(filters);
    return response.data;
  }
);

export const fetchRecommendedProducts = createAsyncThunk(
  'products/fetchRecommended',
  async (userId) => {
    const response = await productAPI.getRecommendations(userId);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query) => {
    const response = await productAPI.search(query);
    return response.data;
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
      }
    },
    // Cart persistence triggers
    syncCartOnLogin: (state, action) => {
      // This would sync local cart with user's saved cart
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
    const searchableText = `
      ${product.name} ${product.description} ${product.brand}
      ${product.tags.join(' ')} ${product.category}
    `.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
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
export const selectRelatedProducts = (product) => (state) =>
  getRelatedProducts(product);
export const selectSimilarProducts = (product) => (state) =>
  getSimilarProducts(product);