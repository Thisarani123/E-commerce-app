// src/screens/profile/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => dispatch(logout()) },
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>My Profile</Text>

      {user ? (
        <>
          <Text><Text style={{ fontWeight: 'bold' }}>Name:</Text> {user.name}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {user.email}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Phone:</Text> {user.phone}</Text>
        </>
      ) : (
        <Text>No user data</Text>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('Wishlist')}
        style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee' }}
      >
        <Text>❤️ My Wishlist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee' }}
      >
        <Text>🛒 My Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={{ marginTop: 40, padding: 15, backgroundColor: '#ff4444', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}