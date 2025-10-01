// src/components/navigation/MainNavigator.js
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Auth Screens (for unauthenticated users)
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import OTPVerificationScreen from '../../screens/auth/OTPVerificationScreen';

// Main App Screens (for authenticated users)
import HomeScreen from '../../screens/home/HomeScreen';
import ProductsScreen from '../../screens/products/ProductsScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import CartScreen from '../../screens/cart/CartScreen';
import WishlistScreen from '../../screens/products/WishlistScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🔐 Auth Flow (no tabs)
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
}

// 🛒 Main App Flow (with tabs)
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Products: 'grid',
            Search: 'search',
            Cart: 'cart',
            Wishlist: 'heart',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 🚀 Main Navigator: Switch based on auth state
export default function MainNavigator() {
  const { user } = useSelector(state => state.auth);

  return user ? <AppTabs /> : <AuthNavigator />;
}