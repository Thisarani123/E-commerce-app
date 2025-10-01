// src/components/common/SearchBar.js
import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { products } from '../../data/sampleProducts';

export default function SearchBar({ value, onChangeText, onFilterPress }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();

  const handleTextChange = (text) => {
    onChangeText(text);
    if (text.length > 2) {
      const uniqueSuggestions = new Set();
      products.forEach(p => {
        if (p.name.toLowerCase().includes(text.toLowerCase())) uniqueSuggestions.add(p.name);
        if (p.brand.toLowerCase().includes(text.toLowerCase())) uniqueSuggestions.add(p.brand);
      });
      setSuggestions(Array.from(uniqueSuggestions).slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    onChangeText(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleTextChange}
          placeholder="Search products, brands, categories..."
          style={styles.input}
          onFocus={() => value.length > 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  input: { flex: 1, paddingVertical: 12 },
  filterButton: { padding: 5 },
  suggestionsContainer: {
    position: 'absolute',
    top: 70,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    zIndex: 1000,
    elevation: 5,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});