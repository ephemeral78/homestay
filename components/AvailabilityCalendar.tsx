
import React, { useState } from 'react';
import type { Booking } from '../types';

interface AvailabilityCalendarProps {
    bookings: Booking[];
}

const isSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ bookings }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const isBooked = (date: Date): boolean => {
        return bookings.some(booking => {
            const checkIn = new Date(booking.checkIn);
            const checkOut = new Date(booking.checkOut);
            checkIn.setHours(0,0,0,0);
            checkOut.setHours(0,0,0,0);
            const d = new Date(date);
            d.setHours(0,0,0,0);
            // Booking includes check-in date but not check-out date
            return d >= checkIn && d < checkOut;
        });
    };

    const changeMonth = (amount: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const renderDays = () => {
        const dayElements = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            dayElements.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(year, month, i);
            const today = new Date();
            today.setHours(0,0,0,0);
            
            const isBookedStatus = isBooked(dayDate);
            const isPast = dayDate < today;

            let cellClass = "text-center p-2 rounded-full w-8 h-8 flex items-center justify-center";
            if (isBookedStatus) {
                cellClass += " bg-red-300 text-white cursor-not-allowed";
            } else if (isPast) {
                cellClass += " text-gray-400 cursor-not-allowed";
            } else {
                cellClass += " bg-green-200 text-green-800";
            }
            if (isSameDay(dayDate, new Date())) {
                cellClass += " border-2 border-blue-500";
            }
            dayElements.push(<div key={i} className={cellClass}>{i}</div>);
        }
        return dayElements;
    };

    return (
        <div className="bg-brand-light p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-200">&larr;</button>
                <h4 className="font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-200">&rarr;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
                {days.map(day => <div key={day} className="font-bold text-center text-gray-500">{day}</div>)}
                {renderDays()}
            </div>
             <div className="mt-4 flex justify-center space-x-4 text-xs">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-200 mr-2"></span>Available</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-300 mr-2"></span>Booked</div>
            </div>
        </div>
    );
};
