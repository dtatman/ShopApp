import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ProductCard = ({ product, onPress, onAddToCart }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* <Image source={{ uri: product.image }} style={styles.image} /> */}
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)} đ</Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color={COLORS.accent} />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviews}>({product.reviews})</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddToCart}
      >
        <Icon name="add-shopping-cart" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    width: '48%',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 12,
  },
  reviews: {
    fontSize: 12,
    color: COLORS.grey,
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;