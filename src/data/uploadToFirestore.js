import firestore from '@react-native-firebase/firestore';
import CartItem from '../components/CartItem';
import { COLORS } from '../utils/colors';
export const sampleCartItems = [
    {
        id: '1',
        name: 'Smartphone ABC Pro',
        price: 10990000,
        image: 'https://via.placeholder.com/200',
        quantity: 1,
    },
    {
        id: '3',
        name: 'Tai nghe Bluetooth',
        price: 1590000,
        image: 'https://via.placeholder.com/200',
        quantity: 2,
    },
];
const sampleOrders = [
  {
    id: '1',
    orderNumber: 'DH123456',
    date: '22/04/2025',
    status: 'Đang giao hàng',
    statusColor: COLORS.primary,
    amount: 12580000,
    items: [
      {
        id: '1',
        name: 'Smartphone ABC Pro',
        quantity: 1,
        price: 10990000,
      },
      {
        id: '3',
        name: 'Tai nghe Bluetooth',
        quantity: 1,
        price: 1590000,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'DH123455',
    date: '15/04/2025',
    status: 'Đã giao hàng',
    statusColor: COLORS.secondary,
    amount: 299000,
    items: [
      {
        id: '4',
        name: 'Áo phông nam',
        quantity: 1,
        price: 299000,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'DH123454',
    date: '05/04/2025',
    status: 'Đã hủy',
    statusColor: COLORS.danger,
    amount: 1890000,
    items: [
      {
        id: '5',
        name: 'Nồi cơm điện thông minh',
        quantity: 1,
        price: 1890000,
      },
    ],
  },
];
export const PRODUCTS = [
    {
        id: '1',
        name: 'Smartphone ABC Pro',
        price: 10990000,
        image: 'C:\ShoppingApp\src\assets\images\IPhone16Pro.jpg',
        description: 'Màn hình Super AMOLED 6.5", Chip Snapdragon 888, RAM 8GB, Bộ nhớ 128GB, Camera 108MP, Pin 5000mAh',
        categoryId: '1',
        rating: 4.8,
        reviews: 124,
    },
    {
        id: '2',
        name: 'Laptop XYZ Gaming',
        price: 23990000,
        image: 'https://via.placeholder.com/200',
        description: 'Màn hình 15.6" FHD 144Hz, CPU i7 11800H, RAM 16GB, SSD 512GB, VGA RTX 3060 6GB, Windows 10',
        categoryId: '2',
        rating: 4.7,
        reviews: 89,
    },
    {
        id: '3',
        name: 'Tai nghe Bluetooth',
        price: 1590000,
        image: 'https://via.placeholder.com/200',
        description: 'Âm thanh Hi-Fi, Chống ồn chủ động, Pin 30 giờ, Chống nước IPX4, Kết nối Bluetooth 5.0',
        categoryId: '3',
        rating: 4.5,
        reviews: 231,
    },
    {
        id: '4',
        name: 'Áo phông nam',
        price: 299000,
        image: 'https://via.placeholder.com/200',
        description: 'Chất liệu cotton 100%, form regular fit, màu trắng cơ bản, size S-XL',
        categoryId: '4',
        rating: 4.2,
        reviews: 78,
    },
    {
        id: '5',
        name: 'Nồi cơm điện thông minh',
        price: 1890000,
        image: 'https://via.placeholder.com/200',
        description: 'Dung tích 1.8L, công nghệ IH, 10 chế độ nấu, giữ ấm 24h, hẹn giờ, lòng nồi chống dính',
        categoryId: '5',
        rating: 4.6,
        reviews: 156,
    },
    {
        id: '6',
        name: 'Sách - Đắc Nhân Tâm',
        price: 88000,
        image: 'https://via.placeholder.com/200',
        description: 'Tác giả: Dale Carnegie, NXB Tổng hợp TP.HCM, 320 trang, bìa mềm',
        categoryId: '6',
        rating: 4.9,
        reviews: 352,
    },
    {
        id: '7',
        name: 'Điện thoại DEF Note',
        price: 8990000,
        image: 'https://via.placeholder.com/200',
        description: 'Màn hình IPS 6.7", Chip Mediatek 1000, RAM 6GB, Bộ nhớ 64GB, Camera 64MP, Pin 4500mAh',
        categoryId: '1',
        rating: 4.4,
        reviews: 98,
    },
    {
        id: '8',
        name: 'Máy tính bảng UltraTab',
        price: 7590000,
        image: 'https://via.placeholder.com/200',
        description: 'Màn hình 10.1" 2K, Chip Snapdragon 750G, RAM 4GB, Bộ nhớ 64GB, Camera 13MP, Pin 7000mAh',
        categoryId: '2',
        rating: 4.3,
        reviews: 67,
    },
];
export const CATEGORIES = [
    {
        id: '1',
        title: 'Điện thoại',
        icon: 'smartphone',
    },
    {
        id: '2',
        title: 'Máy tính',
        icon: 'computer',
    },
    {
        id: '3',
        title: 'Phụ kiện',
        icon: 'headset',
    },
    {
        id: '4',
        title: 'Thời trang',
        icon: 'checkroom',
    },
    {
        id: '5',
        title: 'Đồ gia dụng',
        icon: 'home',
    },
    {
        id: '6',
        title: 'Sách',
        icon: 'book',
    },
];
const sampleWishlistItems = [
  {
    id: '2',
    name: 'Laptop XYZ Gaming',
    price: 23990000,
    image: 'https://via.placeholder.com/200',
    description: 'Màn hình 15.6" FHD 144Hz, CPU i7 11800H, RAM 16GB, SSD 512GB, VGA RTX 3060 6GB, Windows 10',
    categoryId: '2',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '5',
    name: 'Nồi cơm điện thông minh',
    price: 1890000,
    image: 'https://via.placeholder.com/200',
    description: 'Dung tích 1.8L, công nghệ IH, 10 chế độ nấu, giữ ấm 24h, hẹn giờ, lòng nồi chống dính',
    categoryId: '5',
    rating: 4.6,
    reviews: 156,
  },
];
export const uploadProductsToFirestore = async (userId) => {
  try {
    const batch = firestore().batch();
    // const productsRef = firestore().collection('products');
    // const categoriesRef = firestore().collection('categories');
    // const cartitemRef= firestore()
    //     .collection('users')
    //     .doc(userId)
    //     .collection('cart');
    // const ordersRef = firestore()
    //     .collection('users')
    //     .doc(userId)
    //     .collection('orders');
    const wishlistRef = firestore().collection('users').doc(userId).collection('wishlist');
    // PRODUCTS.forEach(item => {
    //   const docRef = productsRef.doc(item.id); // sử dụng ID tùy chỉnh
    //   batch.set(docRef, item);
    // });
    // CATEGORIES.forEach(item =>{
    //     const docRef =categoriesRef.doc(item.id);
    //     batch.set(docRef,item);
    // });
    // sampleCartItems.forEach(item =>{
    //     const docRef=cartitemRef.doc(item.id);
    //     batch.set(docRef,item);
    // });
    // sampleOrders.forEach(order => {
    //   const docRef = ordersRef.doc(order.id);
    //   batch.set(docRef, order);
    // });
    sampleWishlistItems.forEach(item => {
        const docRef = wishlistRef.doc(item.id);
        batch.set(docRef, item);
    });
    
    await batch.commit();
    console.log('✅ Uploaded all products to Firestore!');
  } catch (error) {
    console.error('❌ Error uploading products:', error);
  }
};