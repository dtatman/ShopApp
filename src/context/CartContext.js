// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId =  auth().currentUser?.uid ;
  const cartRef = firestore().collection('users').doc(userId).collection('cart');

  // Lấy dữ liệu giỏ hàng từ Firestore khi app chạy
  useEffect(() => {
    const unsubscribe = cartRef.onSnapshot(snapshot => {
      const items = [];
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [cartRef]);

  // Thêm sản phẩm vào giỏ hàng Firestore
const addToCart = async (product, quantity) => {
  const itemRef = cartRef.doc(product.id);
  const docSnap = await itemRef.get();

  if (docSnap.exists && docSnap.data()) {
    const data = docSnap.data();
    const existingQuantity = typeof data.quantity === 'number' ? data.quantity : 0;
    await itemRef.update({ quantity: existingQuantity + quantity });
  } else {
    await itemRef.set({ ...product, quantity });
  }
};

  // Xoá sản phẩm khỏi giỏ hàng
  const removeFromCart = async (productId) => {
    await cartRef.doc(productId).delete();
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = async (productId, quantity) => {
    await cartRef.doc(productId).update({ quantity });
  };

  // Tính tổng tiền
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.toString().replace(/\D/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng context
export const useCart = () => useContext(CartContext);