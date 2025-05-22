import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const userId =  auth().currentUser?.uid ;
  const ordersRef = firestore().collection('users').doc(userId).collection('orders');

  // Lấy đơn hàng từ Firestore
  useEffect(() => {
    const unsubscribe = ordersRef.orderBy('date', 'desc').onSnapshot(snapshot => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(list);
    });

    return () => unsubscribe();
  }, [ordersRef]);

  // Tạo đơn hàng mới
  const placeOrder = async (order) => {
    const newOrderRef = ordersRef.doc(); // Auto-generated ID
    await newOrderRef.set({
      ...order,
      id: newOrderRef.id,
      date: new Date().toLocaleDateString('vi-VN'),
    });
  };
  

  // (Tuỳ chọn) Hủy đơn hàng
  const cancelOrder = async (orderId) => {
    await ordersRef.doc(orderId).update({
      status: 'Đã hủy',
      statusColor: 'red',
    });
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook sử dụng
export const useOrders = () => useContext(OrderContext);
