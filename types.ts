
export interface Homestay {
  id: number;
  name: string;
  location: string;
  image: string;
  pricePerNight: number;
  description: string;
  features: string[];
}

export interface Booking {
  homestayId: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}
