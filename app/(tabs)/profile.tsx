import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Camera,
  CreditCard as Edit2,
  MapPin,
  Mail,
  Phone,
  LogOut,
} from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'Hussain Hamim',
    email: ' mohammadhussainafghan83@gmail.com',
    phone: '+93 780338261',
    location: 'Kabul, Afg',
    avatar:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  };

  const ProfileMenuItem = ({ icon, title, subtitle, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>{icon}</View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Camera size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit2 size={16} color={COLORS.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>Personal Information</Text>

        <ProfileMenuItem
          icon={<MapPin size={20} color={COLORS.primary} />}
          title="Location"
          subtitle={user.location}
          onPress={() => {}}
        />

        <ProfileMenuItem
          icon={<Mail size={20} color={COLORS.primary} />}
          title="Email"
          subtitle={user.email}
          onPress={() => {}}
        />

        <ProfileMenuItem
          icon={<Phone size={20} color={COLORS.primary} />}
          title="Phone"
          subtitle={user.phone}
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.spacing.md,
    paddingTop: SIZES.spacing.xxl,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.h2,
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    padding: SIZES.spacing.md,
    margin: SIZES.spacing.md,
    ...SHADOWS.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SIZES.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...FONTS.semiBold,
    fontSize: SIZES.xl,
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.primary,
    marginLeft: SIZES.spacing.xs,
  },
  menuSection: {
    margin: SIZES.spacing.md,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    padding: SIZES.spacing.md,
    ...SHADOWS.small,
  },
  menuSectionTitle: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: SIZES.spacing.sm,
  },
  menuTitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  menuSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    padding: SIZES.spacing.md,
    margin: SIZES.spacing.md,
    ...SHADOWS.small,
  },
  logoutText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.error,
    marginLeft: SIZES.spacing.sm,
  },
});
