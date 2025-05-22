import React, { useState,useContext } from 'react';
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
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';


const WishlistScreen = ({ navigation }) => {
  const { wishlistItems, loading, removeItemFromWishlist } = useWishlist();
  
  const handleRemoveItem = (itemId) => {
    Alert.alert(
      'Xóa sản phẩm',
      'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => removeItemFromWishlist(itemId),
          style: 'destructive',
        },
      ]
    );
  };
  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
  };
  
  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={72} color={COLORS.lightGrey} />
      <Text style={styles.emptyText}>Danh sách yêu thích trống</Text>
      <Text style={styles.emptySubtext}>
        Hãy thêm sản phẩm yêu thích để xem sau
      </Text>
    </View>
  );
  
  const renderWishlistItem = ({ item }) => (
    <View style={styles.productContainer}>
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item)}
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Icon name="delete" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>Sản phẩm yêu thích</Text>
      </View>

      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyWishlist()
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
  row: {
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '50%',
    marginBottom: 2,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.danger,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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

export default WishlistScreen;