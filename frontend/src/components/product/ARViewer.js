// src/components/product/ARViewer.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ARViewer({ product, onClose }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20 }}>AR View for {product.name}</Text>
      <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#ff6600', padding: 15, borderRadius: 10, marginTop: 20 }}>
        <Text style={{ color: 'white' }}>Close AR</Text>
      </TouchableOpacity>
    </View>
  );
}