// src/screens/cart/CartScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function CartScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>🛒 Your Cart</Text>
      <Text>Your cart is empty (for now!)</Text>
      <Text onPress={() => navigation.navigate('Products')} style={{ color: '#ff6600', marginTop: 20 }}>
        Browse Products
      </Text>
    </View>
  );
}