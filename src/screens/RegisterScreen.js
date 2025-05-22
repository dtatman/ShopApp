import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Button from '../components/Button';
import { COLORS } from '../utils/colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      // 1. Đăng ký Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // 2. Lưu thông tin user vào Firestore
      await firestore().collection('users').doc(userId).set({
        name,
        email,
        phone,
        address: {
          fullName: '',
          phone,
          detail: '',
          city: '',
        }
      });

      Alert.alert('✅ Thành công', 'Tài khoản đã được tạo.');
      navigation.replace('Login');
    } catch (error) {
      console.error('❌ Error đăng ký:', error);
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tạo tài khoản mới</Text>

        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nguyễn Văn A"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="email@example.com"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="0987654321"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          secureTextEntry
        />

        <Text style={styles.label}>Nhập lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />

        <Button title="Đăng ký" onPress={handleRegister} style={{ marginTop: 24 }} />

        <Text style={styles.loginText}>
          Đã có tài khoản?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Đăng nhập
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: COLORS.grey,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
