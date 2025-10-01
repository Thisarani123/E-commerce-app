// src/screens/home/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import ProductCard from '../../components/product/ProductCard';
import { products } from '../../data/sampleProducts'; // ✅ Import mock data

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, status } = useSelector(state => state.products);

  useEffect(() => {
    // ✅ Only dispatch if using real API (optional)
    // For now, we'll rely on initial mock data in productSlice
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // ✅ Fallback to mock data if list is empty
  const productList = list.length > 0 ? list : products;

  const sections = [
    { title: '🔥 Flash Deals', data: productList.slice(0, 4) },
    { title: '⭐ Recommended for You', data: productList.slice(4, 8) },
    { title: '🆕 New Arrivals', data: productList.slice(-4) },
  ];

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.productGrid}>
            {section.data.map(item => (
              <View key={item.id} style={styles.productItem}>
                <ProductCard
                  product={item}
                  onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  section: { padding: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productItem: { width: '48%', marginBottom: 10 },
});