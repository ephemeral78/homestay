import React, { useState } from 'react';
import type { Homestay, Booking } from '../types';

interface BookingFormProps {
    homestay: Homestay;
    bookings: Booking[];
    onBook: (booking: Booking) => void;
    setBookingMessage: (message: { type: 'success' | 'error', text: string } | null) => void;
}

const toYyyyMmDd = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const BookingForm: React.FC<BookingFormProps> = ({ homestay, bookings, onBook, setBookingMessage }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [checkIn, setCheckIn] = useState(toYyyyMmDd(today));
    const [checkOut, setCheckOut] = useState(toYyyyMmDd(tomorrow));
    const [guests, setGuests] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setBookingMessage(null);
        setError(null);

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            setError("Check-out date must be after check-in date.");
            return;
        }

        const isConflict = bookings.some(booking => {
            const existingCheckIn = new Date(booking.checkIn);
            const existingCheckOut = new Date(booking.checkOut);
            return checkInDate < existingCheckOut && checkOutDate > existingCheckIn;
        });

        if (isConflict) {
            setError("Sorry, these dates are not available. Please check the calendar.");
            return;
        }

        const newBooking: Booking = {
            homestayId: homestay.id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests
        };
        onBook(newBooking);
    };
    
    const getMinCheckoutDate = () => {
        // Create a new Date object from the checkIn string.
        // Appending T00:00:00 ensures the date string is parsed in the user's local timezone, avoiding off-by-one errors.
        const checkInDate = new Date(`${checkIn || toYyyyMmDd(today)}T00:00:00`);
        // Set the date to the next day.
        checkInDate.setDate(checkInDate.getDate() + 1);
        return toYyyyMmDd(checkInDate);
    };

    return (
        <form onSubmit={handleBooking}>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">Check-in</label>
                    <input 
                        type="date" 
                        id="checkin" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
                        value={checkIn}
                        min={toYyyyMmDd(today)}
                        onChange={e => setCheckIn(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">Check-out</label>
                    <input 
                        type="date" 
                        id="checkout" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
                        value={checkOut}
                        min={getMinCheckoutDate()}
                        onChange={e => setCheckOut(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                    <input 
                        type="number" 
                        id="guests" 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" 
                        value={guests}
                        min="1"
                        max="6"
                        onChange={e => setGuests(parseInt(e.target.value, 10))}
                        required
                    />
                </div>
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors duration-300">
                Book Now
            </button>
        </form>
    );
};