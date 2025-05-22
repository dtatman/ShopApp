import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/colors';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  loading = false, 
  disabled = false,
  style = {} 
}) => {
  const buttonStyle = [
    styles.button,
    type === 'primary' && styles.primary,
    type === 'secondary' && styles.secondary,
    type === 'outline' && styles.outline,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    type === 'outline' && styles.outlineText,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress} 
      disabled={loading || disabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  outlineText: {
    color: COLORS.primary,
  },
});

export default Button;