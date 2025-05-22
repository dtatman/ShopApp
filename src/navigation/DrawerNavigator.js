import React ,{useState,useCallback} from 'react';
import { View, Text, StyleSheet, Image ,Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
// Màn hình
import TabNavigator from './TabNavigator';
import WishlistScreen from '../screens/WishlistScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const user = auth().currentUser;
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          if (user?.uid) {
            const doc = await firestore().collection('users').doc(user.uid).get();
            if (doc.exists) {
              setUserData(doc.data());
            }
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin user:', error);
        }
      };

      fetchUserData();
    }, [user?.uid])
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      
      <DrawerItemList {...props} />
      
      <View style={styles.divider} />
      
      <DrawerItem
        label="Đăng xuất"
        icon={({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.black,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeTab"
        component={TabNavigator}
        options={{
          title: 'Trang chủ',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'Sản phẩm yêu thích',
          drawerIcon: ({ color, size }) => (
            <Icon name="favorite" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Đơn hàng của tôi',
          drawerIcon: ({ color, size }) => (
            <Icon name="receipt" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.grey,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});

export default DrawerNavigator;