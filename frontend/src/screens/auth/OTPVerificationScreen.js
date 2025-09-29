// src/screens/auth/OTPVerificationScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function OTPVerificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24 }}>OTP Verification Screen</Text>
      <Text>Enter 6-digit code here (coming soon!)</Text>
    </View>
  );
}