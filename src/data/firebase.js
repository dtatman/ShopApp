import firestore from '@react-native-firebase/firestore';

//////////////////////////////
// LẤY DANH MỤC SẢN PHẨM
export const getCategories = async () => {
  try {
    const snapshot = await firestore().collection('categories').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    return [];
  }
};

//////////////////////////////
// LẤY TOÀN BỘ SẢN PHẨM
export const getProducts = async () => {
  try {
    const snapshot = await firestore().collection('products').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    return [];
  }
};

//////////////////////////////
// LẤY SẢN PHẨM THEO DANH MỤC
export const getProductsByCategory = async (categoryId) => {
  try {
    const snapshot = await firestore()
      .collection('products')
      .where('categoryId', '==', categoryId)
      .get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Lỗi khi lọc sản phẩm:', error);
    return [];
  }
};

//////////////////////////////
// LẤY CHI TIẾT 1 SẢN PHẨM
export const getProductById = async (productId) => {
  try {
    const docSnap = await firestore().collection('products').doc(productId).get();
    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn('Không tìm thấy sản phẩm với ID:', productId);
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    return null;
  }
};

//////////////////////////////
// THÊM VÀO GIỎ HÀNG
export const addToCart = async (userId, product, quantity) => {
  try {
    const cartRef = firestore().collection('carts');
    const snapshot = await cartRef
      .where('userId', '==', userId)
      .where('productId', '==', product.id)
      .get();

    if (snapshot.empty) {
      // Nếu chưa có thì thêm mới
      await cartRef.add({
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '',
        quantity,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
    } else {
      // Nếu đã có thì cập nhật số lượng
      const cartItem = snapshot.docs[0];
      const newQuantity = cartItem.data().quantity + quantity;
      await cartRef.doc(cartItem.id).update({ quantity: newQuantity });
    }

    return true;
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    return false;
  }
};

//////////////////////////////
// LẤY GIỎ HÀNG THEO USER ID
export const getCartItems = async (userId) => {
  try {
    const snapshot = await firestore()
      .collection('carts')
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Lỗi khi lấy giỏ hàng:', error);
    return [];
  }
};
// Ghi đè hoặc tạo mới sản phẩm với ID chỉ định
export const setProduct = async (productId, productData) => {
  try {
    await firestore().collection('products').doc(productId).set(productData);
    console.log(`Sản phẩm ${productId} đã được tạo/cập nhật thành công`);
    return true;
  } catch (error) {
    console.error(`Lỗi khi tạo/cập nhật sản phẩm ${productId}:`, error);
    return false;
  }
};
// Ghi đè hoặc tạo mới danh mục với ID chỉ định
export const setCategory = async (categoryId, categoryData) => {
  try {
    await firestore().collection('categories').doc(categoryId).set(categoryData);
    console.log(`Danh mục ${categoryId} đã được tạo/cập nhật thành công`);
    return true;
  } catch (error) {
    console.error(`Lỗi khi tạo/cập nhật danh mục ${categoryId}:`, error);
    return false;
  }
};