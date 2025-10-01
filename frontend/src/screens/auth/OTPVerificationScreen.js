// src/screens/auth/OTPVerificationScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../../store/authSlice';
import { useNavigation } from '@react-navigation/native';

export default function OTPVerificationScreen({ route }) {
  const { email, userId } = route.params || {};
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds cooldown
  const [canResend, setCanResend] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector(state => state.auth);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit code.');
      return;
    }

    try {
      const result = await dispatch(verifyOTP({ userId, otp })).unwrap();
      if (result?.user) {
        Alert.alert('Success', 'Email verified! Redirecting to app...');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (err) {
      Alert.alert('Verification Failed', err.message || 'Invalid or expired OTP.');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      await dispatch(resendOTP({ userId })).unwrap();
      Alert.alert('Success', 'OTP resent to your email.');
      setTimer(60);
      setCanResend(false);
      setOtp('');
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to resend OTP.');
    }
  };

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={styles.otpBox}>
              <Text style={styles.otpText}>
                {otp[i] || ''}
              </Text>
            </View>
          ))}
        </View>

        <TextInput
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.hiddenInput}
          autoFocus
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          onPress={handleVerify}
          disabled={loading || otp.length !== 6}
          style={[
            styles.verifyButton,
            { opacity: loading || otp.length !== 6 ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.verifyButtonText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text>Didn’t receive the code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text
              style={[
                styles.resendText,
                { color: canResend ? '#ff6600' : '#ccc' },
              ]}
            >
              {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  email: {
    fontWeight: 'bold',
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  otpBox: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontWeight: 'bold',
  },
});