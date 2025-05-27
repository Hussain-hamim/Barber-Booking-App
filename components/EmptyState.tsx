import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, ShoppingBag, Heart } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

interface EmptyStateProps {
  icon: 'calendar' | 'shopping' | 'favorite';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction
}) => {
  const renderIcon = () => {
    const size = 60;
    const color = COLORS.textLight;
    
    switch (icon) {
      case 'calendar':
        return <Calendar size={size} color={color} />;
      case 'shopping':
        return <ShoppingBag size={size} color={color} />;
      case 'favorite':
        return <Heart size={size} color={color} />;
      default:
        return <Calendar size={size} color={color} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.spacing.xl,
  },
  iconContainer: {
    marginBottom: SIZES.spacing.lg,
    opacity: 0.5,
  },
  title: {
    ...FONTS.semiBold,
    fontSize: SIZES.xl,
    color: COLORS.text,
    marginBottom: SIZES.spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.spacing.sm,
    paddingHorizontal: SIZES.spacing.lg,
    borderRadius: SIZES.radius.md,
  },
  actionButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});