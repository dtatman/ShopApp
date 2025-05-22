import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import { useOrders } from '../context/OrderContext';


const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const OrdersScreen = ({ navigation }) => {
  const { orders } = useOrders(); // ✅ Dùng context
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  const renderEmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <Icon name="receipt-long" size={72} color={COLORS.lightGrey} />
      <Text style={styles.emptyText}>Không có đơn hàng nào</Text>
      <Text style={styles.emptySubtext}>
        Bạn chưa thực hiện đơn hàng nào
      </Text>
    </View>
  );
  
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity
        style={styles.orderHeader}
        onPress={() => toggleOrderDetails(item.id)}
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.orderNumber}>
            {item.orderNumber}
          </Text>
          <Text style={styles.orderDate}>
            {item.date}
          </Text>
        </View>
        
        <View style={styles.orderHeaderRight}>
          <Text style={[styles.orderStatus, { color: item.statusColor }]}>
            {item.status}
          </Text>
          <Icon
            name={expandedOrder === item.id ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={COLORS.grey}
          />
        </View>
      </TouchableOpacity>
      
      {expandedOrder === item.id && (
        <View style={styles.orderDetails}>
          <Text style={styles.detailsTitle}>Chi tiết đơn hàng</Text>
          
          {item.items.map(product => (
            <View key={product.id} style={styles.productItem}>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productQuantity}>
                x{product.quantity}
              </Text>
              <Text style={styles.productPrice}>
                {formatPrice(product.price)} đ
              </Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng tiền:</Text>
            <Text style={styles.totalAmount}>
              {formatPrice(item.amount)} đ
            </Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="visibility" size={16} color={COLORS.primary} />
              <Text style={styles.actionText}>Chi tiết</Text>
            </TouchableOpacity>
            
            {item.status === 'Đang giao hàng' && (
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="cancel" size={16} color={COLORS.danger} />
                <Text style={[styles.actionText, { color: COLORS.danger }]}>
                  Hủy đơn
                </Text>
              </TouchableOpacity>
            )}
            
            {item.status === 'Đã giao hàng' && (
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="replay" size={16} color={COLORS.primary} />
                <Text style={styles.actionText}>Mua lại</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
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
        <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
      </View>
      
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyOrders()
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: COLORS.grey,
  },
  orderHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatus: {
    fontWeight: '600',
    marginRight: 8,
  },
  orderDetails: {
    padding: 16,
    backgroundColor: COLORS.lightGrey,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    flex: 1,
    fontSize: 14,
  },
  productQuantity: {
    width: 40,
    fontSize: 14,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    width: 100,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginVertical: 12,
    opacity: 0.2,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default OrdersScreen;