// src/screens/products/WishlistScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product/ProductCard';

export default function WishlistScreen({ navigation }) {
  const wishlistItems = useSelector(state => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your wishlist is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlistItems}
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
    />
  );
}