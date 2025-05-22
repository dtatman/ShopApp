import React, { useState,useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
// import { CATEGORIES } from '../data/categories';
// import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import {useCart} from "../context/CartContext";
import { getCategories, getProducts } from '../data/firebase';

const CategoriesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [CATEGORIES, setCategories] = useState([]);
  const [PRODUCTS, setProducts] = useState([]);
  const [error, setError] = useState(null);
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
  
  const filteredCategories = searchQuery
    ? CATEGORIES.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : CATEGORIES;
  
  const filteredProducts = selectedCategory
    ? PRODUCTS.filter(product => product.categoryId === selectedCategory.id)
    : [];
  
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  
  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
  };
  
  const handleAddToCart = (product) => {
    addToCart(product,1);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory?.id === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Icon
        name={item.icon}
        size={24}
        color={selectedCategory?.id === item.id ? COLORS.white : COLORS.primary}
      />
      <Text
        style={[
          styles.categoryTitle,
          selectedCategory?.id === item.id && styles.selectedCategoryTitle,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Danh mục</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.grey} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm danh mục..."
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
      
      <View style={styles.content}>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={filteredCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        
        <View style={styles.productsContainer}>
          {selectedCategory ? (
            <>
              <Text style={styles.productsTitle}>{selectedCategory.title}</Text>
              
              {filteredProducts.length > 0 ? (
                <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                  <ProductCard
                    product={item}
                    onPress={() => handleProductPress(item)}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.noProductsText}>
                Không có sản phẩm nào trong danh mục này.
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.selectCategoryText}>
            Chọn một danh mục để xem sản phẩm.
          </Text>
        )}
      </View>
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
  fontSize: 18,
  fontWeight: 'bold',
},
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.lightGrey,
  borderRadius: 8,
  marginHorizontal: 16,
  marginVertical: 12,
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
content: {
  flex: 1,
  flexDirection: 'row',
},
categoriesContainer: {
  width: '35%',
  backgroundColor: COLORS.white,
  paddingTop: 10,
},
categoryItem: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.lightGrey,
},
selectedCategoryItem: {
  backgroundColor: COLORS.primary,
},
categoryTitle: {
  marginLeft: 16,
  fontSize: 14,
  fontWeight: '500',
},
selectedCategoryTitle: {
  color: COLORS.white,
},
productsContainer: {
  flex: 1,
  padding: 10,
},
productsTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 12,
},
productRow: {
  justifyContent: 'space-between',
},
noProductsText: {
  marginTop: 20,
  fontSize: 14,
  color: COLORS.grey,
  textAlign: 'center',
},
selectCategoryText: {
  marginTop: 20,
  fontSize: 14,
  color: COLORS.grey,
  textAlign: 'center',
},
});

export default CategoriesScreen;