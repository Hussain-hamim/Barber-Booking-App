import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Heart, Star } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';
import { barbers, Barber } from '@/data/barbers';
import { SearchBar } from '@/components/SearchBar';

export default function HomeScreen() {
  const [barbersData, setBarbersData] = useState<Barber[]>(barbers);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: number) => {
    setBarbersData(currentBarbers => 
      currentBarbers.map(barber => 
        barber.id === id ? { ...barber, isFavorite: !barber.isFavorite } : barber
      )
    );
  };

  const handleBarberPress = (barber: Barber) => {
    router.push({
      pathname: '/(details)/services',
      params: { barberId: barber.id }
    });
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setBarbersData(barbers);
    } else {
      const filtered = barbers.filter(barber => 
        barber.name.toLowerCase().includes(text.toLowerCase())
      );
      setBarbersData(filtered);
    }
  };

  const renderBarberCard = ({ item }: { item: Barber }) => (
    <TouchableOpacity 
      style={styles.barberCard} 
      onPress={() => handleBarberPress(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.barberImage} />
      <View style={styles.favoriteButton}>
        <TouchableOpacity 
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Heart 
            size={22} 
            color={item.isFavorite ? COLORS.error : COLORS.white} 
            fill={item.isFavorite ? COLORS.error : 'transparent'} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.barberInfo}>
        <View style={styles.nameRatingContainer}>
          <Text style={styles.barberName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.experience}>{item.experience} experience</Text>
        <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>
        <TouchableOpacity style={styles.bookButton} onPress={() => handleBarberPress(item)}>
          <Text style={styles.bookButtonText}>View Services</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Barber Shop</Text>
        <Text style={styles.subtitle}>Find your perfect barber</Text>
      </View>
      
      <SearchBar 
        placeholder="Search barbers..." 
        value={searchQuery} 
        onChangeText={handleSearch} 
      />
      
      <FlatList
        data={barbersData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBarberCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    fontSize: SIZES.h1,
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SIZES.spacing.md,
  },
  listContainer: {
    padding: SIZES.spacing.md,
    paddingBottom: SIZES.spacing.xl,
  },
  barberCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    marginBottom: SIZES.spacing.md,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  barberImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: SIZES.spacing.md,
    right: SIZES.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: SIZES.radius.round,
    padding: SIZES.spacing.sm,
  },
  barberInfo: {
    padding: SIZES.spacing.md,
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  barberName: {
    ...FONTS.semiBold,
    fontSize: SIZES.xl,
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.divider,
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: 4,
    borderRadius: SIZES.radius.md,
  },
  ratingText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.text,
    marginLeft: 4,
  },
  experience: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.primary,
    marginBottom: SIZES.spacing.sm,
  },
  bio: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SIZES.spacing.md,
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.spacing.sm,
    paddingHorizontal: SIZES.spacing.md,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
  },
  bookButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});