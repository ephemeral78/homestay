
import type { Homestay } from './types';

export const HOMESTAYS: Homestay[] = [
  {
    id: 1,
    name: 'Pine Ridge Cottage',
    location: 'Near Shillong, Meghalaya',
    image: 'assets/pine-ridge.jpg',
    pricePerNight: 150,
    description: '',
    features: ['Mountain View', 'Free Wi-Fi', 'Kitchenette', 'Bonfire Area'],
  },
  {
    id: 2,
    name: 'Orchid Villa',
    location: 'Cherrapunji Hills, Meghalaya',
    image: 'assets/regular-house.jpg',
    pricePerNight: 200,
    description: '',
    features: ['Lush Garden', 'Organic Meals', 'Guided Treks', 'Rainfall Sounds'],
  },
  {
    id: 3,
    name: 'Cloud Haven Retreat',
    location: 'Mawlynnong, Meghalaya',
    image: 'assets/cloud-house.jpg',
    pricePerNight: 180,
    description: '',
    features: ['Panoramic Views', 'Eco-friendly', 'Library', 'Private Balcony'],
  },
];
