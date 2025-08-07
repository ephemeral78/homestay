
import React from 'react';

interface HeroProps {
    onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
    return (
        <div className="relative h-[60vh] min-h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/assets/meghalaya-hero.jpg')" }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
                    Discover Serenity
                </h1>
                <p className="mt-4 max-w-2xl text-lg sm:text-xl text-white/90">
                    Find your perfect escape in the breathtaking landscapes of Northeast India. Unwind, explore, and create unforgettable memories.
                </p>
                <button 
                    onClick={onExplore}
                    className="mt-8 px-8 py-3 bg-brand-accent text-white font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-transform duration-300 hover:scale-105"
                >
                    Explore Homestays
                </button>
            </div>
        </div>
    );
};
