// src/screens/search/SearchScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24 }}>🔍 Search Products</Text>
      <Text>Voice & image search coming soon!</Text>
    </View>
  );
}