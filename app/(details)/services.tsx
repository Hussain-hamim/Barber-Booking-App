import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Clock, Scissors } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';
import { getServicesByBarberId, Service } from '@/data/services';
import { barbers, Barber } from '@/data/barbers';

export default function ServicesScreen() {
  const { barberId } = useLocalSearchParams<{ barberId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [barber, setBarber] = useState<Barber | null>(null);

  useEffect(() => {
    if (barberId) {
      const id = parseInt(barberId);
      const barberServices = getServicesByBarberId(id);
      setServices(barberServices);
      
      const selectedBarber = barbers.find(b => b.id === id);
      if (selectedBarber) {
        setBarber(selectedBarber);
      }
    }
  }, [barberId]);

  const handleServicePress = (service: Service) => {
    if (barber) {
      router.push({
        pathname: '/(details)/booking',
        params: { 
          barberId: barber.id, 
          serviceId: service.id,
          barberName: barber.name,
          serviceName: service.name,
          price: service.price,
          duration: service.duration
        }
      });
    }
  };

  const goBack = () => {
    router.back();
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity 
      style={styles.serviceCard} 
      onPress={() => handleServicePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.serviceInfo}>
        <View style={styles.serviceNameContainer}>
          <Scissors size={16} color={COLORS.primary} style={styles.serviceIcon} />
          <Text style={styles.serviceName}>{item.name}</Text>
        </View>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceDetails}>
          <View style={styles.serviceDetail}>
            <Clock size={14} color={COLORS.textSecondary} />
            <Text style={styles.serviceDetailText}>{item.duration}</Text>
          </View>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!barber) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Services</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.barberProfileCard}>
        <Image source={{ uri: barber.image }} style={styles.barberImage} />
        <View style={styles.barberDetails}>
          <Text style={styles.barberName}>{barber.name}</Text>
          <Text style={styles.barberExperience}>{barber.experience} experience</Text>
        </View>
      </View>
      
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Available Services</Text>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.servicesList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...FONTS.medium,
    fontSize: SIZES.lg,
    color: COLORS.textSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.spacing.md,
    paddingTop: SIZES.spacing.xl,
  },
  backButton: {
    padding: SIZES.spacing.xs,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.h2,
    color: COLORS.text,
  },
  barberProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: SIZES.spacing.md,
    padding: SIZES.spacing.md,
    borderRadius: SIZES.radius.lg,
    ...SHADOWS.small,
  },
  barberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.spacing.md,
  },
  barberDetails: {
    flex: 1,
  },
  barberName: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginBottom: 4,
  },
  barberExperience: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  servicesContainer: {
    flex: 1,
    padding: SIZES.spacing.md,
  },
  sectionTitle: {
    ...FONTS.semiBold,
    fontSize: SIZES.xl,
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  servicesList: {
    paddingBottom: SIZES.spacing.xl,
  },
  serviceCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    marginBottom: SIZES.spacing.md,
    padding: SIZES.spacing.md,
    ...SHADOWS.small,
  },
  serviceInfo: {},
  serviceNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.xs,
  },
  serviceIcon: {
    marginRight: SIZES.spacing.xs,
  },
  serviceName: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
  },
  serviceDescription: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SIZES.spacing.md,
    lineHeight: 20,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetailText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginLeft: SIZES.spacing.xs,
  },
  servicePrice: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.primary,
  },
});