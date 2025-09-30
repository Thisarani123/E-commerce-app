// src/components/product/ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <View style={styles.card} onTouchEnd={onPress}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: 150, margin: 8, backgroundColor: 'white', borderRadius: 8, padding: 8 },
  image: { width: '100%', height: 120, resizeMode: 'contain' },
  name: { fontWeight: 'bold', marginTop: 4 },
  price: { color: '#ff6600', fontWeight: 'bold' }
});