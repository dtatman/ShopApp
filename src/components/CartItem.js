import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';

const formatPrice = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)} đ</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Icon 
              name="remove" 
              size={16} 
              color={item.quantity <= 1 ? COLORS.grey : COLORS.black} 
            />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            <Icon name="add" size={16} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Icon name="delete-outline" size={24} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  removeButton: {
    alignSelf: 'center',
    padding: 4,
  },
});

export default CartItem;