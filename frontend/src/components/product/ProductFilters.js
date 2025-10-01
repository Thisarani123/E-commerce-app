// src/components/product/ProductFilters.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../store/productSlice';
import { categories } from '../../data/sampleProducts';

export default function ProductFilters({ onClose }) {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.products);
  const [localFilters, setLocalFilters] = useState(filters);

  const brands = ['Apple', 'Samsung', 'Sony', 'Google', 'Dell', 'HP', 'Lenovo', 'Bose'];
  const priceRanges = [
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: 'Over $1000', min: 1000, max: 5000 }
  ];

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    onClose();
  };

  const resetFilters = () => {
    const reset = {
      category: null,
      priceRange: { min: 0, max: 5000 },
      brand: [],
      rating: 0,
      inStock: false
    };
    setLocalFilters(reset);
    dispatch(clearFilters());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setLocalFilters({ ...localFilters, category: cat.id })}
                style={[
                  styles.categoryButton,
                  localFilters.category === cat.id && styles.categoryButtonActive
                ]}
              >
                <Text style={localFilters.category === cat.id ? styles.categoryTextActive : styles.categoryText}>
                  {cat.icon} {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          {priceRanges.map((range, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setLocalFilters({ ...localFilters, priceRange: range })}
              style={[
                styles.filterOption,
                localFilters.priceRange.min === range.min && styles.filterOptionActive
              ]}
            >
              <Text style={localFilters.priceRange.min === range.min ? styles.filterTextActive : styles.filterText}>
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brand */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          <View style={styles.brandContainer}>
            {brands.map(brand => (
              <TouchableOpacity
                key={brand}
                onPress={() => {
                  const updated = localFilters.brand.includes(brand)
                    ? localFilters.brand.filter(b => b !== brand)
                    : [...localFilters.brand, brand];
                  setLocalFilters({ ...localFilters, brand: updated });
                }}
                style={[
                  styles.brandButton,
                  localFilters.brand.includes(brand) && styles.brandButtonActive
                ]}
              >
                <Text style={localFilters.brand.includes(brand) ? styles.brandTextActive : styles.brandText}>
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minimum Rating: {localFilters.rating}+</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(rating => (
              <TouchableOpacity
                key={rating}
                onPress={() => setLocalFilters({ ...localFilters, rating })}
                style={styles.starButton}
              >
                <Text style={{ fontSize: 24, color: rating <= localFilters.rating ? '#ff6600' : '#ccc' }}>
                  ⭐
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* In Stock */}
        <View style={styles.inStockContainer}>
          <TouchableOpacity
            onPress={() => setLocalFilters({ ...localFilters, inStock: !localFilters.inStock })}
            style={styles.checkbox}
          >
            <View style={[styles.checkboxInner, localFilters.inStock && styles.checkboxChecked]} />
          </TouchableOpacity>
          <Text>In Stock Only</Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
          <Text style={{ color: 'white' }}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 10 },
  categoryButton: { padding: 10, marginRight: 10, backgroundColor: '#f0f0f0', borderRadius: 20 },
  categoryButtonActive: { backgroundColor: '#ff6600' },
  categoryText: { color: 'black' },
  categoryTextActive: { color: 'white' },
  filterOption: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5, marginBottom: 5 },
  filterOptionActive: { backgroundColor: '#ff6600' },
  filterText: { color: 'black' },
  filterTextActive: { color: 'white' },
  brandContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  brandButton: { padding: 10, margin: 5, backgroundColor: '#f0f0f0', borderRadius: 20 },
  brandButtonActive: { backgroundColor: '#ff6600' },
  brandText: { color: 'black' },
  brandTextActive: { color: 'white' },
  ratingContainer: { flexDirection: 'row' },
  starButton: { marginRight: 10 },
  inStockContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#ff6600', marginRight: 10 },
  checkboxInner: { width: '100%', height: '100%', backgroundColor: 'transparent' },
  checkboxChecked: { backgroundColor: '#ff6600' },
  actions: { flexDirection: 'row', marginTop: 20 },
  resetButton: { flex: 1, padding: 15, backgroundColor: '#ccc', borderRadius: 10, marginRight: 10, alignItems: 'center' },
  applyButton: { flex: 1, padding: 15, backgroundColor: '#ff6600', borderRadius: 10, alignItems: 'center' },
});