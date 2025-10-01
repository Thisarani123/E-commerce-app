// src/screens/cart/CartScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, qty) => {
    dispatch(updateQuantity({ id, qty }));
  };

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your cart is empty</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Products')}
          style={{ marginTop: 20, padding: 10, backgroundColor: '#ff6600', borderRadius: 5 }}
        >
          <Text style={{ color: 'white' }}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>${item.price} × {item.qty}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.id, item.qty - 1)}
                disabled={item.qty <= 1}
                style={{ padding: 5 }}
              >
                <Text>➖</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>{item.qty}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.id, item.qty + 1)}
                style={{ padding: 5 }}
              >
                <Text>➕</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleRemove(item.id)}
                style={{ marginLeft: 'auto', padding: 5 }}
              >
                <Text style={{ color: 'red' }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={{ padding: 20, borderTopWidth: 1, borderColor: '#eee' }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
          style={{ backgroundColor: '#ff6600', padding: 15, borderRadius: 5 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}