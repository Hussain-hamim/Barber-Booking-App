export interface Appointment {
  id: string;
  barberId: number;
  barberName: string;
  serviceId: number;
  serviceName: string;
  price: string;
  duration: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}