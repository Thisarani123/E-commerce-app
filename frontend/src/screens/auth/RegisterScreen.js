// src/screens/auth/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/authSlice';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const result = await dispatch(register(form)).unwrap();

      // ✅ Safety check: ensure result and user exist
      if (!result || !result.user) {
        throw new Error('Registration failed: No user data returned');
      }

      // ✅ Navigate to OTP screen
      navigation.navigate('OTPVerification', {
        userId: result.id,   // ✅ result is now the user object
        email: result.email,
      });

    } catch (error) {
      // ✅ Show user-friendly error
      Alert.alert(
        'Registration Failed',
        error.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 30, textAlign: 'center' }}>
        Register
      </Text>

      {['name', 'email', 'password', 'phone'].map(field => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChangeText={text => setForm({ ...form, [field]: text })}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
          }}
          secureTextEntry={field === 'password'}
          autoCapitalize="none"
          keyboardType={
            field === 'email'
              ? 'email-address'
              : field === 'phone'
                ? 'phone-pad'
                : 'default'
          }
        />
      ))}

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: '#ff6600',
          padding: 15,
          borderRadius: 5,
          marginBottom: 15,
          opacity: loading ? 0.7 : 1,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {loading ? 'Registering...' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ textAlign: 'center', color: '#ff6600' }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}