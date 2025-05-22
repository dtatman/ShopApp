import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { COLORS } from '../utils/colors';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Main'); // Điều hướng vào app chính sau khi đăng nhập
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi đăng nhập', 'Email hoặc mật khẩu không chính xác');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <Text style={styles.title}>Chào mừng bạn trở lại</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.grey}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mật khẩu"
        placeholderTextColor={COLORS.grey}
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Đăng nhập" onPress={handleLogin} />

      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.signupText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    color: COLORS.text,
  },
  signupContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});

export default LoginScreen;
