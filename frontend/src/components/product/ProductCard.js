// src/components/product/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress, compact = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, compact && styles.compactCard]}>
      <Image
        source={{ uri: product.images[0] }}
        style={[styles.image, compact && styles.compactImage]}
        resizeMode="cover"
      />
      <Text style={[styles.name, compact && styles.compactName]} numberOfLines={compact ? 1 : 2}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
      {!compact && (
        <View style={styles.rating}>
          <Text>⭐ {product.rating}</Text>
          <Text style={styles.stock}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactCard: {
    width: 130,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  compactImage: {
    height: 90,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  compactName: {
    fontSize: 12,
  },
  price: {
    color: '#ff6600',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  stock: {
    color: '#4CAF50',
    fontSize: 12,
  },
});