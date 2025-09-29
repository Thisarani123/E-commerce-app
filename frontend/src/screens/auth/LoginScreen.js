// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, socialLogin } from '../../store/authSlice';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 30, textAlign: 'center' }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{ backgroundColor: '#ff6600', padding: 15, borderRadius: 5, marginBottom: 15 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ textAlign: 'center', color: '#ff6600' }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 30 }}>
        <Text style={{ textAlign: 'center', marginBottom: 15 }}>Or login with</Text>

        <TouchableOpacity
          onPress={() => dispatch(socialLogin('google'))}
          style={{ backgroundColor: '#db4437', padding: 15, borderRadius: 5, marginBottom: 10 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(socialLogin('facebook'))}
          style={{ backgroundColor: '#4267B2', padding: 15, borderRadius: 5 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}