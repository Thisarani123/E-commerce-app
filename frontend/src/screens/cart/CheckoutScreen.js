// src/screens/cart/CheckoutScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function CheckoutScreen() {
  const { total } = useSelector(state => state.cart);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Shipping Address</Text>
      <TextInput placeholder="Street" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="City" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="State" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="ZIP Code" style={{ borderWidth: 1, padding: 10, marginBottom: 20 }} />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Total: ${total.toFixed(2)}</Text>

      <TouchableOpacity
        style={{ backgroundColor: '#ff6600', padding: 15, borderRadius: 5 }}
        onPress={() => alert('Order placed! (Backend integration needed)')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}