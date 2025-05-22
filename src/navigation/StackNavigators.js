import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Màn hình
import ProductScreen from '../screens/ProductScreen';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EditAddress" component={EditAddressScreen} options={{ title: 'Chỉnh sửa địa chỉ' }}
  />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;