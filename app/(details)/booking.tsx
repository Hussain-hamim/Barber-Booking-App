import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Scissors, User, CircleCheck as CheckCircle } from 'lucide-react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePicker } from '@/components/DateTimePicker';
import { Appointment } from '@/types/appointment';

export default function BookingScreen() {
  const params = useLocalSearchParams<{
    barberId: string;
    serviceId: string;
    barberName: string;
    serviceName: string;
    price: string;
    duration: string;
  }>();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [showSuccess, setShowSuccess] = useState(false);

  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
  ];

  const goBack = () => {
    router.back();
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = async () => {
    try {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        barberName: params.barberName || '',
        barberId: parseInt(params.barberId || '0'),
        serviceName: params.serviceName || '',
        serviceId: parseInt(params.serviceId || '0'),
        price: params.price || '',
        duration: params.duration || '',
        date: selectedDate.toISOString(),
        time: selectedTime,
        status: 'upcoming'
      };

      // Get existing appointments
      const existingAppointments = await AsyncStorage.getItem('appointments');
      let appointments: Appointment[] = [];
      
      if (existingAppointments) {
        appointments = JSON.parse(existingAppointments);
      }
      
      // Add new appointment
      appointments.push(newAppointment);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
      
      // Show success state
      setShowSuccess(true);
      
      // Reset success state and navigate after delay
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/appointments');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving appointment:', error);
      Alert.alert('Error', 'Unable to save your appointment. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (showSuccess) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <CheckCircle size={80} color={COLORS.success} />
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successMessage}>
          Your appointment has been successfully booked.
        </Text>
        <Text style={styles.successDetails}>
          {params.barberName} • {formatDate(selectedDate)} • {selectedTime}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Book Appointment</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appointment Details</Text>
          
          <View style={styles.detailRow}>
            <User size={18} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Barber:</Text>
            <Text style={styles.detailValue}>{params.barberName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Scissors size={18} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Service:</Text>
            <Text style={styles.detailValue}>{params.serviceName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={18} color={COLORS.primary} />
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{params.duration}</Text>
          </View>
          
          <View style={styles.priceSummary}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.priceValue}>{params.price}</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.datePickerHeader}>
            <Calendar size={20} color={COLORS.primary} />
            <Text style={styles.datePickerTitle}>Select Date</Text>
          </View>
          
          <DateTimePicker 
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minimumDate={new Date()}
          />
        </View>
        
        <View style={styles.card}>
          <View style={styles.timePickerHeader}>
            <Clock size={20} color={COLORS.primary} />
            <Text style={styles.timePickerTitle}>Select Time</Text>
          </View>
          
          <View style={styles.timeSlotsContainer}>
            {availableTimes.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  content: {
    flex: 1,
    padding: SIZES.spacing.md,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.lg,
    padding: SIZES.spacing.md,
    marginBottom: SIZES.spacing.md,
    ...SHADOWS.small,
  },
  cardTitle: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.sm,
  },
  detailLabel: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginLeft: SIZES.spacing.sm,
    marginRight: SIZES.spacing.sm,
    width: 70,
  },
  detailValue: {
    ...FONTS.semiBold,
    fontSize: SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.spacing.md,
    paddingTop: SIZES.spacing.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  priceLabel: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
  },
  priceValue: {
    ...FONTS.bold,
    fontSize: SIZES.xl,
    color: COLORS.primary,
  },
  datePickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.md,
  },
  datePickerTitle: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginLeft: SIZES.spacing.sm,
  },
  timePickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.md,
  },
  timePickerTitle: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginLeft: SIZES.spacing.sm,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    paddingVertical: SIZES.spacing.sm,
    paddingHorizontal: SIZES.spacing.md,
    borderRadius: SIZES.radius.md,
    backgroundColor: COLORS.divider,
    marginRight: SIZES.spacing.sm,
    marginBottom: SIZES.spacing.sm,
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
  },
  timeSlotText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  selectedTimeSlotText: {
    color: COLORS.white,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.spacing.md,
    borderRadius: SIZES.radius.lg,
    alignItems: 'center',
    marginVertical: SIZES.spacing.md,
    ...SHADOWS.medium,
  },
  bookButtonText: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.white,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.spacing.xl,
  },
  successTitle: {
    ...FONTS.bold,
    fontSize: SIZES.h1,
    color: COLORS.text,
    marginTop: SIZES.spacing.lg,
    marginBottom: SIZES.spacing.sm,
  },
  successMessage: {
    ...FONTS.medium,
    fontSize: SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.spacing.md,
  },
  successDetails: {
    ...FONTS.semiBold,
    fontSize: SIZES.md,
    color: COLORS.primary,
    textAlign: 'center',
  },
});