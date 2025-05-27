export interface Service {
  id: number;
  barberId: number;
  name: string;
  price: string;
  duration: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 1,
    barberId: 1,
    name: "Classic Haircut",
    price: "$25",
    duration: "30 minutes",
    description: "A traditional haircut including a consultation, shampoo, and style."
  },
  {
    id: 2,
    barberId: 1,
    name: "Beard Trim",
    price: "$15",
    duration: "15 minutes",
    description: "Professional beard shaping and trimming for a clean, defined look."
  },
  {
    id: 3,
    barberId: 1,
    name: "Haircut & Beard Combo",
    price: "$35",
    duration: "45 minutes",
    description: "Complete package including haircut and beard trim for a refreshed look."
  },
  {
    id: 4,
    barberId: 2,
    name: "Premium Haircut",
    price: "$30",
    duration: "35 minutes",
    description: "Precision cut with extra attention to detail and styling."
  },
  {
    id: 5,
    barberId: 2,
    name: "Beard Styling",
    price: "$18",
    duration: "20 minutes",
    description: "Expert beard shaping with hot towel treatment."
  },
  {
    id: 6,
    barberId: 3,
    name: "Signature Fade",
    price: "$28",
    duration: "30 minutes",
    description: "Specialized fade haircut with precise blending and styling."
  },
  {
    id: 7,
    barberId: 3,
    name: "Hot Towel Shave",
    price: "$22",
    duration: "25 minutes",
    description: "Traditional straight razor shave with hot towel preparation."
  },
  {
    id: 8,
    barberId: 4,
    name: "Express Haircut",
    price: "$20",
    duration: "20 minutes",
    description: "Quick and efficient haircut for those on a tight schedule."
  },
  {
    id: 9,
    barberId: 4,
    name: "Hair & Scalp Treatment",
    price: "$35",
    duration: "40 minutes",
    description: "Revitalizing treatment to nourish hair and scalp."
  }
];

export const getServicesByBarberId = (barberId: number): Service[] => {
  return services.filter(service => service.barberId === barberId);
};