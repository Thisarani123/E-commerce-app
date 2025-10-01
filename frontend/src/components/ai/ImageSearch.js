// src/components/ai/ImageSearch.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageSearch({ onResult }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);

      // Simulate image recognition (replace with real AI service)
      setTimeout(() => {
        const categories = ['smartphones', 'laptops', 'headphones', 'cameras', 'accessories'];
        const match = categories[Math.floor(Math.random() * categories.length)];
        onResult(match);
      }, 1500);
    }
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: 'white' }}>📷 Upload Product Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 100, height: 100, borderRadius: 10, marginTop: 10 }}
        />
      )}
    </View>
  );
}