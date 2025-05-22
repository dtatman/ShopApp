import React, { useState,useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { getCategories, getProducts } from '../data/firebase';
import {useCart} from "../context/CartContext";
const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [CATEGORIES, setCategories] = useState([]);
  const [PRODUCTS, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Thay vì sử dụng dữ liệu tĩnh, chúng ta gọi async functions
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        const productsData = await getProducts();
        setProducts(productsData);

      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
      }
    };
    
    fetchData();
  }, []);


  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  // Lọc sản phẩm theo danh mục đã chọn
  const filteredProducts = selectedCategory 
    ? PRODUCTS.filter(product => product.categoryId === selectedCategory) 
    : PRODUCTS;
  
  // Lọc sản phẩm theo từ khóa tìm kiếm
  const searchedProducts = searchQuery 
    ? filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : filteredProducts;
  
  const handleCategoryPress = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };
  
  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
  };
  
  const handleAddToCart = async (product) => {
    const quantity=parseInt(1);
    try {
      await addToCart(product, quantity);
      alert(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (err) {
      console.error('❌ Lỗi khi thêm sản phẩm vào giỏ hàng:', err);
      alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
    }
  };
  
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="menu" size={24} color={COLORS.black} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={COLORS.grey} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Icon name="close" size={18} color={COLORS.grey} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="shopping-cart" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      {renderHeader()}
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Khuyến mãi tháng 4</Text>
          <Text style={styles.bannerSubtitle}>Giảm đến 50%</Text>
        </View>
        
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Danh mục</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.viewAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CATEGORIES.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
                isSelected={selectedCategory === category.id}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory 
                ? CATEGORIES.find(cat => cat.id === selectedCategory)?.title 
                : 'Tất cả sản phẩm'}
            </Text>
            {selectedCategory && (
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.viewAll}>Xóa bộ lọc</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.productsContainer}>
            {searchedProducts.length > 0 ? (
              searchedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => handleProductPress(product)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))
            ) : (
              <Text style={styles.noProductsText}>
                Không tìm thấy sản phẩm nào.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
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
  menuButton: {
    marginRight: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
  cartButton: {
    marginLeft: 16,
  },
  banner: {
    height: 150,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    margin: 16,
    padding: 16,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: COLORS.white,
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  noProductsText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.grey,
  },
});

export default HomeScreen;