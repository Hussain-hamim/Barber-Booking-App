import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  minimumDate,
  maximumDate
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(value));
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    // Check if previous month is before minimum date
    if (minimumDate && previousMonth < new Date(minimumDate.getFullYear(), minimumDate.getMonth(), 1)) {
      return;
    }
    
    setCurrentMonth(previousMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    // Check if next month is after maximum date
    if (maximumDate && nextMonth > new Date(maximumDate.getFullYear(), maximumDate.getMonth(), 1)) {
      return;
    }
    
    setCurrentMonth(nextMonth);
  };
  
  const isDateDisabled = (date: Date) => {
    if (minimumDate && date < minimumDate) {
      return true;
    }
    if (maximumDate && date > maximumDate) {
      return true;
    }
    return false;
  };
  
  const isDateSelected = (date: Date) => {
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    );
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const days = [];
    let dayIndex = 0;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
      dayIndex++;
    }
    
    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      
      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          style={[
            styles.day,
            disabled && styles.disabledDay,
            selected && styles.selectedDay
          ]}
          onPress={() => {
            if (!disabled) {
              onChange(date);
            }
          }}
          disabled={disabled}
        >
          <Text style={[
            styles.dayText,
            disabled && styles.disabledDayText,
            selected && styles.selectedDayText
          ]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
      
      dayIndex++;
    }
    
    return (
      <View>
        <View style={styles.weekDaysContainer}>
          {dayNames.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {days}
        </View>
      </View>
    );
  };
  
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
          <ChevronLeft size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
          <ChevronRight size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      {renderCalendar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.md,
    paddingHorizontal: SIZES.spacing.sm,
  },
  arrowButton: {
    padding: SIZES.spacing.sm,
  },
  monthText: {
    ...FONTS.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.text,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.spacing.sm,
  },
  weekDay: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    width: 40,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  dayText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 1,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.md,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: COLORS.textLight,
  },
});