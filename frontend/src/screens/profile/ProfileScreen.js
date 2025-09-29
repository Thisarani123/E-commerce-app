// src/screens/profile/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>👤 My Profile</Text>
      <TouchableOpacity onPress={handleLogout} style={{ padding: 10 }}>
        <Text style={{ color: '#ff6600' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}