// src/components/ai/VoiceSearch.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import * as Audio from 'expo-av';

export default function VoiceSearch({ onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access microphone is required!');
        return;
      }

      setIsListening(true);

      // Simulate voice-to-text (replace with real STT service like Google Cloud or Azure)
      setTimeout(() => {
        const sampleQueries = ['smartphone', 'laptop', 'wireless headphones', 'smart watch', 'camera'];
        const result = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
        setTranscript(result);
        onResult(result);
        setIsListening(false);
        Speech.speak(`Searching for ${result}`);
      }, 2000);
    } catch (error) {
      console.error('Voice search error:', error);
      setIsListening(false);
      alert('Voice search failed. Please try again.');
    }
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <TouchableOpacity
        onPress={startListening}
        disabled={isListening}
        style={{
          backgroundColor: isListening ? '#ff4444' : '#ff6600',
          padding: 15,
          borderRadius: 50,
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 24 }}>🎤</Text>
      </TouchableOpacity>
      {transcript ? <Text style={{ marginTop: 10, color: '#ff6600' }}>Searching: {transcript}</Text> : null}
    </View>
  );
}