// src/screens/search/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import VoiceSearch from '../../components/ai/VoiceSearch';
import ImageSearch from '../../components/ai/ImageSearch';
import ProductCard from '../../components/product/ProductCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('text');
  const products = useSelector(state => state.products.list);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Search Type Selector */}
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        {['text', 'voice', 'image'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setSearchType(type)}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: searchType === type ? '#ff6600' : '#ddd',
              marginHorizontal: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: 'center', color: searchType === type ? 'white' : 'black' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Input */}
      {searchType === 'text' && (
        <TextInput
          placeholder="Search products..."
          value={query}
          onChangeText={setQuery}
          style={{ borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 15 }}
        />
      )}

      {searchType === 'voice' && <VoiceSearch onResult={setQuery} />}
      {searchType === 'image' && <ImageSearch onResult={setQuery} />}

      {/* Results */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}