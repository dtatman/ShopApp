import React, { createContext, useState, useEffect,useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Tạo context wishlist
const WishlistContext = createContext();

// Component provider của WishlistContext
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = auth().currentUser?.uid ;

  // Lấy dữ liệu wishlist từ Firestore
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistRef = firestore()
          .collection('users')
          .doc(userId)
          .collection('wishlist');
        
        const snapshot = await wishlistRef.get();
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWishlistItems(items);
      } catch (error) {
        console.error('Lỗi khi tải wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  // Hàm xóa item khỏi wishlist
  const removeItemFromWishlist = async (itemId) => {
    try {
      const itemRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('wishlist')
        .doc(itemId);
      await itemRef.delete();
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  // Hàm thêm item vào wishlist
  const addItemToWishlist = async (newItem) => {
    try {
      const itemRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('wishlist')
        .doc(newItem.id);
      await itemRef.set(newItem);
      setWishlistItems([...wishlistItems, newItem]);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  };
  const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        removeItemFromWishlist,
        addItemToWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);