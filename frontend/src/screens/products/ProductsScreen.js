// src/screens/products/ProductsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchQuery, setFilters, clearFilters } from '../../store/productSlice';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import SearchBar from '../../components/common/SearchBar';
import { categories } from '../../data/sampleProducts';

export default function ProductsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { filteredList, filters, searchQuery } = useSelector(state => state.products);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleCategorySelect = (categoryId) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    dispatch(setFilters({ ...filters, category: newCategory }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onFilterPress={() => setShowFilters(true)}
      />

      {/* Categories */}
      <View style={{ padding: 16 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategorySelect(item.id)}
              style={{
                padding: 10,
                marginRight: 10,
                backgroundColor: selectedCategory === item.id ? '#ff6600' : '#fff',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#ddd',
              }}
            >
              <Text style={{ color: selectedCategory === item.id ? 'white' : 'black' }}>
                {item.icon} {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, padding: 4 }}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 16 }}>
            No products found. Try adjusting your filters.
          </Text>
        }
      />

      {/* Filters Modal */}
      <Modal visible={showFilters} animationType="slide" presentationStyle="pageSheet">
        <ProductFilters onClose={() => setShowFilters(false)} />
      </Modal>
    </View>
  );
}