import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { Bell, Moon, CreditCard, Shield, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState(true);
  
  const SettingToggle = ({ icon, title, description, value, onValueChange }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        trackColor={{ false: COLORS.borderColor, true: COLORS.primaryLight }}
        thumbColor={value ? COLORS.primary : COLORS.white}
        ios_backgroundColor={COLORS.borderColor}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
  
  const SettingLink = ({ icon, title, description, onPress }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <SettingToggle
          icon={<Bell size={22} color={COLORS.primary} />}
          title="Notifications"
          description="Receive appointment reminders"
          value={notifications}
          onValueChange={setNotifications}
        />
        
        <SettingToggle
          icon={<Moon size={22} color={COLORS.primary} />}
          title="Dark Mode"
          description="Switch to dark theme"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        
        <SettingToggle
          icon={<Bell size={22} color={COLORS.primary} />}
          title="Email Reminders"
          description="Get appointment reminders via email"
          value={reminders}
          onValueChange={setReminders}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <SettingLink
          icon={<CreditCard size={22} color={COLORS.primary} />}
          title="Payment Methods"
          description="Manage your payment options"
          onPress={() => {}}
        />
        
        <SettingLink
          icon={<Shield size={22} color={COLORS.primary} />}
          title="Privacy & Security"
          description="Control your data and privacy settings"
          onPress={() => {}}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingLink
          icon={<HelpCircle size={22} color={COLORS.primary} />}
          title="Help & Support"
          description="Get help with app issues"
          onPress={() => {}}
        />
        
        <SettingLink
          icon={<Info size={22} color={COLORS.primary} />}
          title="About"
          description="App version and information"
          onPress={() => {}}
        />
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
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
  section: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    padding: SIZES.spacing.md,
    margin: SIZES.spacing.md,
    marginBottom: SIZES.spacing.sm,
    ...SHADOWS.small,
  },
  sectionTitle: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: SIZES.spacing.sm,
  },
  settingTitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  settingDescription: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  versionContainer: {
    alignItems: 'center',
    padding: SIZES.spacing.md,
  },
  versionText: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textLight,
  },
});