import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  
  const toggleDarkMode = () => {
    Alert.alert(
      "Chế độ tối",
      "Tính năng chế độ tối sẽ được cập nhật trong phiên bản tiếp theo.",
      [{ text: "OK" }]
    );
    setDarkMode(previousState => !previousState);
  };
  
  const renderSetting = (title, value, onValueChange, description = null) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.lightGrey, true: COLORS.primary }}
        thumbColor={value ? COLORS.white : COLORS.white}
      />
    </View>
  );
  
  const renderSection = (title, children) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
  
  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          onPress: () => {
            alert("Bạn đã đăng xuất thành công!");
          },
        }
      ]
    );
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa tài khoản",
          onPress: () => {
            alert("Tính năng xóa tài khoản sẽ được cập nhật trong phiên bản tiếp theo.");
          },
          style: "destructive"
        }
      ]
    );
  };
  
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
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection("Giao diện", (
          <>
            {renderSetting(
              "Chế độ tối",
              darkMode,
              toggleDarkMode,
              "Thay đổi giao diện sang tông màu tối"
            )}
          </>
        ))}
        
        {renderSection("Thông báo", (
          <>
            {renderSetting(
              "Thông báo đẩy",
              notifications,
              setNotifications,
              "Nhận thông báo về đơn hàng, khuyến mãi và cập nhật"
            )}
            {renderSetting(
              "Cập nhật qua email",
              emailUpdates,
              setEmailUpdates,
              "Nhận thông tin khuyến mãi và bản tin qua email"
            )}
          </>
        ))}
        
        {renderSection("Quyền riêng tư", (
          <>
            {renderSetting(
              "Theo dõi vị trí",
              locationTracking,
              setLocationTracking,
              "Cho phép ứng dụng theo dõi vị trí của bạn để cung cấp dịch vụ tốt hơn"
            )}
          </>
        ))}
        
        {renderSection("Ứng dụng", (
          <>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="help-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Trợ giúp & Hỗ trợ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="info-outline" size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Về ứng dụng</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={handleLogout}
            >
              <Icon name="logout" size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Đăng xuất</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={handleDeleteAccount}
            >
              <Icon name="delete-forever" size={24} color={COLORS.danger} />
              <Text style={[styles.actionTitle, { color: COLORS.danger }]}>
                Xóa tài khoản
              </Text>
            </TouchableOpacity>
          </>
        ))}
        
        <Text style={styles.version}>Phiên bản 1.0.0</Text>
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
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.grey,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 16,
  },
  version: {
    textAlign: 'center',
    color: COLORS.grey,
    padding: 24,
  },
});

export default SettingsScreen;