import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Danh mục',
          tabBarIcon: ({ color, size }) => (
            <Icon name="category" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;