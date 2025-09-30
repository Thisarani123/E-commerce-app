// src/store/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { products, categories } from '../data/sampleProducts';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: products,
    categories: categories,
    filteredList: products,
    recommended: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
});

export default productSlice.reducer;