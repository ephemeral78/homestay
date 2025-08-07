
import React from 'react';
import type { Homestay } from '../types';

interface HomestayCardProps {
    homestay: Homestay;
    onSelectHomestay: (homestay: Homestay) => void;
}

export const HomestayCard: React.FC<HomestayCardProps> = ({ homestay, onSelectHomestay }) => {
    return (
        <div 
            className="group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
            onClick={() => onSelectHomestay(homestay)}
        >
            <div className="relative h-64">
                <img src={homestay.image} alt={homestay.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-serif text-2xl font-bold text-white">{homestay.name}</h3>
                    <p className="text-white/90 text-sm">{homestay.location}</p>
                </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 mb-4 flex-grow">{homestay.description}</p>
                <div className="mt-auto">
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-brand-dark text-lg">${homestay.pricePerNight} / night</span>
                        <button className="text-brand-primary font-bold hover:text-brand-accent transition-colors">
                            View Details &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const HomestayCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="bg-gray-300 h-64 w-full"></div>
            <div className="p-6">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                 <div className="flex justify-between items-center mt-4">
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    );
}
