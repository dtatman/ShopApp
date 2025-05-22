import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { COLORS } from './src/utils/colors';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { uploadProductsToFirestore } from './src/data/uploadToFirestore';
// Bỏ qua một số cảnh báo không cần thiết
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);
LogBox.ignoreAllLogs();

const App = () => {
  // useEffect(() => {
  //   uploadProductsToFirestore("WBkD9KI1AWZVI53lpdopw2vYGdu1");
  // }, []);

  // return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
};
export default App;























// import React, { useEffect } from 'react';
// import { SafeAreaView, ScrollView, Text } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   useEffect(() => {
//     const exportFirestoreData = async () => {
//       try {
//         const collectionsToExport = ['categories', 'products', 'users'];
//         const exportedData: Record<string, any> = {};

//         // 1. Export top-level collections (categories, products)
//         for (const collectionName of collectionsToExport) {
//           // Special handling for users
//           if (collectionName === 'users') continue;

//           const snapshot = await firestore().collection(collectionName).get();
//           const docs = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));
//           exportedData[collectionName] = docs;
//         }

//         // 2. Export users + subcollections
//         const userSnapshot = await firestore().collection('users').get();
//         const usersWithSubcollections = [];

//         for (const userDoc of userSnapshot.docs) {
//           const userId = userDoc.id;
//           const userData = userDoc.data();

//           // Subcollections to fetch
//           const subcollections = ['cart', 'orders', 'wishlist'];
//           const userSubData: Record<string, any[]> = {};

//           for (const sub of subcollections) {
//             const subSnap = await firestore()
//               .collection(`users/${userId}/${sub}`)
//               .get();

//             userSubData[sub] = subSnap.docs.map(subDoc => ({
//               id: subDoc.id,
//               ...subDoc.data()
//             }));
//           }

//           usersWithSubcollections.push({
//             id: userId,
//             ...userData,
//             ...userSubData // Merged: cart, orders, wishlist
//           });
//         }

//         exportedData['users'] = usersWithSubcollections;

//         // ✅ In ra console toàn bộ JSON
//         console.log('📦 Firestore Data Exported:\n', JSON.stringify(exportedData, null, 2));
//       } catch (err) {
//         console.error('❌ Export failed:', err);
//       }
//     };

//     exportFirestoreData();
//   }, []);

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 40 }}>
//           🔄 Đang xuất dữ liệu Firestore...
//         </Text>
//         <Text style={{ padding: 20 }}>
//           Mở console (Metro hoặc Logcat) để xem dữ liệu JSON từ Firestore.
//         </Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default App;

