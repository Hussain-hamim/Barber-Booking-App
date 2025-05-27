export interface Barber {
  id: number;
  name: string;
  experience: string;
  image: string;
  bio: string;
  rating: number;
  isFavorite?: boolean;
}

export const barbers: Barber[] = [
  {
    id: 1,
    name: "Raj Singh",
    experience: "5 years",
    image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Specializes in modern cuts and styling techniques. Known for precision and attention to detail.",
    rating: 4.8,
    isFavorite: false
  },
  {
    id: 2,
    name: "Amit Verma",
    experience: "3 years",
    image: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Expert in traditional barbering methods combined with contemporary styles.",
    rating: 4.6,
    isFavorite: false
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    experience: "7 years",
    image: "https://images.pexels.com/photos/1878687/pexels-photo-1878687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Award-winning barber specializing in fades, designs, and beard sculpting.",
    rating: 4.9,
    isFavorite: false
  },
  {
    id: 4,
    name: "David Thompson",
    experience: "4 years",
    image: "https://images.pexels.com/photos/2531550/pexels-photo-2531550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Innovative stylist who stays current with the latest trends and techniques.",
    rating: 4.5,
    isFavorite: false
  }
];