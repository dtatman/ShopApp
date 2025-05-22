import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Button from '../components/Button';
import { COLORS } from '../utils/colors';

const EditAddressScreen = ({ navigation }) => {
    const user = auth().currentUser;
    const userRef = firestore().collection('users').doc(user.uid);
    const userId = user?.uid;
    
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [detail, setDetail] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
    const fetchProfile = async () => {
        try {
        const doc = await firestore().collection('users').doc(userId).get();
        if (doc.exists) {
            const profile = doc.data();
            const addr = profile.address || {};
            setFullName(addr.fullName || '');
            setPhone(addr.phone || '');
            setDetail(addr.detail || '');
            setCity(addr.city || '');
        }
        } catch (error) {
        console.error('❌ Lỗi lấy thông tin địa chỉ:', error);
        Alert.alert('Lỗi', 'Không thể lấy dữ liệu địa chỉ.');
        }
    };

    if (userId) fetchProfile();
    }, [userId]);

  const handleSave = async () => {
    if (!fullName || !phone || !detail || !city) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
        await userRef.set({
            address: {
            fullName,
            phone,
            detail,
            city,
            },
            phone,
        }, { merge: true });

        Alert.alert('✅ Thành công', 'Địa chỉ đã được cập nhật.');
        navigation.goBack();
        } catch (error) {
        console.error('❌ Lỗi cập nhật địa chỉ:', error);
        Alert.alert('Lỗi', 'Không thể cập nhật địa chỉ.');
        }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
            <Text style={styles.backText} onPress={() => navigation.goBack()}>
                ◀ Quay lại
            </Text>
        </View>
      <Text style={styles.title}>Chỉnh sửa địa chỉ giao hàng</Text>

      <Text style={styles.label}>Họ tên</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nguyễn Văn A"
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="0987654321"
      />

      <Text style={styles.label}>Địa chỉ chi tiết</Text>
      <TextInput
        style={styles.input}
        value={detail}
        onChangeText={setDetail}
        placeholder="123 Đường ABC, Phường XYZ"
      />

      <Text style={styles.label}>Thành phố</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="TP. Hồ Chí Minh"
      />

      <Button title="Lưu địa chỉ" onPress={handleSave} style={{ marginTop: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLORS.white,
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
        color: COLORS.primary,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: COLORS.grey,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        borderRadius: 6,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    header: {
        marginBottom: 16,
    },  
    backText: {
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 8,
    },
});

export default EditAddressScreen;
