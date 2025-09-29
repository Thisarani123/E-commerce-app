// src/screens/products/WishlistScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function WishlistScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24 }}>❤️ Wishlist</Text>
      <Text>No items saved yet!</Text>
    </View>
  );
}