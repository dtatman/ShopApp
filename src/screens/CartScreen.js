import React,{ useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import { useCart } from '../context/CartContext'; 
import { useOrders } from '../context/OrderContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart(); 
  const { placeOrder } = useOrders();
  const [userAddress, setUserAddress] = useState(null);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const user = auth().currentUser;
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          const address = doc.data()?.address;
          setUserAddress(address);
        }
      } catch (error) {
        console.error('Lỗi khi lấy địa chỉ người dùng:', error);
      }
    };

    fetchAddress();
  }, []);
  const isAddressValid = (address) => {
    return (
      address &&
      typeof address === 'object' &&
      address.fullName?.trim() &&
      address.phone?.trim() &&
      address.detail?.trim() &&
      address.city?.trim()
    );
  };
  const handleRemoveItem = (itemId) => {
    Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => removeFromCart(itemId),
        style: "destructive",
      },
    ]);
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;

    Alert.alert("Xóa giỏ hàng", "Bạn có chắc muốn xóa toàn bộ giỏ hàng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          cartItems.forEach(item => removeFromCart(item.id));
        },
        style: "destructive",
      },
    ]);
  };
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
        Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống.");
        return;
      }
      if (!isAddressValid(userAddress)) {
      Alert.alert(
        "Thiếu địa chỉ giao hàng",
        "Vui lòng cập nhật địa chỉ trước khi thanh toán.",
        [
          { text: "Cập nhật", onPress: () => navigation.navigate('EditAddress') },
          { text: "Hủy", style: "cancel" },
        ]
      );
      return;
    }
    const shippingFee = 30000;
    const totalAmount = getTotalPrice() + shippingFee;

    const orderData = {
      orderNumber: `#${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Đang giao hàng',
      statusColor: COLORS.primary || '#ff9800', // fallback nếu COLORS.primary bị undefined
      amount: totalAmount,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name || 'Sản phẩm',
        quantity: item.quantity || 1,
        price: item.price || 0,
      })),
    };

    try {
      await placeOrder(orderData); // gọi hàm context đã định nghĩa
      cartItems.forEach(item => removeFromCart(item.id)); // xóa từng item khỏi giỏ hàng
      Alert.alert("Thành công", "Đặt hàng thành công!", [
        { text: "Xem đơn hàng", onPress: () => navigation.navigate('Orders') },
      ]);
    } catch (error) {
      console.error('❌ Checkout error:', error);
      Alert.alert("Lỗi", "Không thể đặt hàng. Vui lòng thử lại sau.");
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  
  
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Icon name="shopping-cart" size={72} color={COLORS.lightGrey} />
      <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
      <Text style={styles.emptyCartSubtext}>
        Hãy thêm sản phẩm vào giỏ hàng của bạn
      </Text>
      <Button
        title="Tiếp tục mua sắm"
        onPress={() => navigation.navigate('Home')}
        style={styles.continueButton}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearCart}
          >
            <Icon name="delete-outline" size={24} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>
      
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.footer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tổng sản phẩm:</Text>
                <Text style={styles.summaryValue}>{getTotalItems()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tạm tính:</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(getTotalPrice())} đ
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
                <Text style={styles.summaryValue}>30.000 đ</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                <Text style={styles.totalValue}>
                  {formatPrice(getTotalPrice() + 30000)} đ
                </Text>
              </View>
            </View>
            
            <Button
              title="Tiến hành thanh toán"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  continueButton: {
    width: '80%',
  },
  footer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    padding: 16,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.grey,
  },
  summaryValue: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    marginTop: 8,
  },
});

export default CartScreen;