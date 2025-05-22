import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigators';
import { CartProvider } from '../context/CartContext';
import { OrderProvider } from '../context/OrderContext';
import { WishlistProvider } from '../context/WishlistContext';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <OrderProvider>
          <WishlistProvider>
            <StackNavigator />
          </WishlistProvider>
        </OrderProvider>
      </CartProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
