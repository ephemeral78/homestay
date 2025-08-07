
import React from 'react';
import type { Homestay } from '../types';
import { HomestayCard, HomestayCardSkeleton } from './HomestayCard';

interface HomestayListProps {
    homestays: Homestay[];
    onSelectHomestay: (homestay: Homestay) => void;
    isLoading: boolean;
    error: string | null;
}

export const HomestayList: React.FC<HomestayListProps> = ({ homestays, onSelectHomestay, isLoading, error }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold text-brand-dark">Our Charming Homestays</h2>
                <p className="mt-2 text-lg text-gray-600">Each a unique gateway to the heart of Meghalaya.</p>
            </div>
            {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {isLoading 
                    ? Array.from({ length: 3 }).map((_, index) => <HomestayCardSkeleton key={index} />)
                    : homestays.map(homestay => (
                        <HomestayCard 
                            key={homestay.id} 
                            homestay={homestay} 
                            onSelectHomestay={onSelectHomestay} 
                        />
                    ))
                }
            </div>
        </div>
    );
};
