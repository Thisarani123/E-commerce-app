// src/screens/auth/RegisterScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#ff6600' }}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}