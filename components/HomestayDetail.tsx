
import React, { useState } from 'react';
import type { Homestay, Booking } from '../types';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { BookingForm } from './BookingForm';

interface HomestayDetailProps {
    homestay: Homestay;
    bookings: Booking[];
    onAddBooking: (booking: Booking) => void;
    onBack: () => void;
}

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-brand-primary">
            {children}
        </div>
    </div>
);


export const HomestayDetail: React.FC<HomestayDetailProps> = ({ homestay, bookings, onAddBooking, onBack }) => {
    const [bookingMessage, setBookingMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleBookingSuccess = (newBooking: Booking) => {
        onAddBooking(newBooking);
        setBookingMessage({ type: 'success', text: 'Your booking was successful! Check your email for confirmation.' });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <button onClick={onBack} className="mb-8 flex items-center text-brand-dark font-semibold hover:text-brand-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to all homestays
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                <div className="lg:col-span-3">
                    <img src={homestay.image} alt={homestay.name} className="w-full h-auto object-cover rounded-lg shadow-xl mb-6" />
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-2">{homestay.name}</h1>
                    <p className="text-lg text-gray-500 mb-6">{homestay.location}</p>
                    <p className="text-gray-700 leading-relaxed">{homestay.description}</p>
                    
                    <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        {homestay.features.map(feature => (
                             <div key={feature} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="sticky top-24 bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-6 text-center">
                            <span className="text-3xl font-bold text-brand-dark">${homestay.pricePerNight}</span>
                            <span className="text-gray-600"> / night</span>
                        </div>
                        {bookingMessage && (
                            <div className={`p-4 mb-4 rounded-md text-sm ${
                                bookingMessage.type === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                                {bookingMessage.text}
                            </div>
                        )}
                        <BookingForm homestay={homestay} bookings={bookings} onBook={handleBookingSuccess} setBookingMessage={setBookingMessage} />
                        <hr className="my-6" />
                        <h3 className="font-serif text-xl font-bold text-brand-dark mb-4 text-center">Availability</h3>
                        <AvailabilityCalendar bookings={bookings} />
                    </div>
                </div>
            </div>
        </div>
    );
};
