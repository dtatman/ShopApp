import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';

const CategoryCard = ({ category, onPress, isSelected = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.selectedCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon 
        name={category.icon} 
        size={28} 
        color={isSelected ? COLORS.white : COLORS.primary} 
      />
      <Text 
        style={[styles.title, isSelected && styles.selectedTitle]}
        numberOfLines={1}
      >
        {category.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  selectedCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 8,
    textAlign: 'center',
  },
  selectedTitle: {
    color: COLORS.white,
  },
});

export default CategoryCard;