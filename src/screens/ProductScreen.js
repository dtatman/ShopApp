import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import Button from '../components/Button';
import { useCart } from '../context/CartContext'; 
import { useWishlist } from '../context/WishlistContext';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ProductScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { addItemToWishlist, removeItemFromWishlist, isInWishlist } = useWishlist();
  useEffect(() => {
    setIsFavorite(isInWishlist(product.id));
  }, [product.id,isInWishlist]);
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Xem sản phẩm ${product.name} tại ShopApp với giá ${formatPrice(product.price)} đ!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleQuantityChange = (value) => {
    if (quantity + value >= 1) {
      setQuantity(quantity + value);
    }
  };
  
  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
      alert(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (err) {
      console.error('❌ Lỗi khi thêm sản phẩm vào giỏ hàng:', err);
      alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
    }
  };
  const toggleFavorite = async () => {
  if (isFavorite) {
    await removeItemFromWishlist(product.id);
  } else {
    await addItemToWishlist(product);
  }
  setIsFavorite(!isFavorite);
};
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
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleShare}
          >
            <Icon name="share" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleFavorite}
          >
            <Icon
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? COLORS.danger : COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)} đ</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={20} color={COLORS.accent} />
              <Text style={styles.ratingValue}>{product.rating}</Text>
            </View>
            <Text style={styles.reviews}>{product.reviews} đánh giá</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Số lượng</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Icon
                name="remove"
                size={20}
                color={quantity <= 1 ? COLORS.grey : COLORS.black}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(1)}
            >
              <Icon name="add" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalPrice}>
            {formatPrice(product.price * quantity)} đ
          </Text>
        </View>
        <Button
          title="Thêm vào giỏ hàng"
          onPress={handleAddToCart}
          style={styles.addButton}
        />
      </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingValue: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviews: {
    marginLeft: 12,
    color: COLORS.grey,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.grey,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: COLORS.grey,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addButton: {
    flex: 1,
    marginLeft: 16,
  },
});

export default ProductScreen;