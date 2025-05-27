import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, Clock, Scissors } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';
import { Appointment } from '@/types/appointment';
import { EmptyState } from '@/components/EmptyState';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const storedAppointments = await AsyncStorage.getItem('appointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const renderAppointmentCard = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.barberName}>{item.barberName}</Text>
        <View style={[styles.statusBadge, 
          { backgroundColor: item.status === 'upcoming' ? COLORS.primary : 
            item.status === 'completed' ? COLORS.success : COLORS.textLight }]}>
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{formatTime(item.time)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Scissors size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{item.serviceName}</Text>
        </View>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      
      {item.status === 'upcoming' && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
      </View>
      
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item, index) => `appointment-${index}`}
          renderItem={renderAppointmentCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState 
          icon="calendar"
          title="No appointments yet"
          message="Book your first appointment to see it here."
          actionLabel="Book Now"
          onAction={() => {}}
        />
      )}
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
  listContainer: {
    padding: SIZES.spacing.md,
    paddingBottom: SIZES.spacing.xl,
  },
  appointmentCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    padding: SIZES.spacing.md,
    marginBottom: SIZES.spacing.md,
    ...SHADOWS.small,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.md,
  },
  barberName: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: 4,
    borderRadius: SIZES.radius.md,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  appointmentDetails: {
    marginBottom: SIZES.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.sm,
  },
  detailText: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginLeft: SIZES.spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SIZES.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    marginBottom: SIZES.spacing.md,
  },
  priceLabel: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  price: {
    ...FONTS.semiBold,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: SIZES.spacing.sm,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButton: {
    backgroundColor: COLORS.divider,
    marginRight: SIZES.spacing.sm,
  },
  rescheduleButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  cancelButton: {
    backgroundColor: COLORS.error,
    marginLeft: SIZES.spacing.sm,
  },
  cancelButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});