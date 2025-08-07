
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomestayList } from './components/HomestayList';
import { HomestayDetail } from './components/HomestayDetail';
import { ContactView } from './components/ContactView';
import { HOMESTAYS } from './constants';
import type { Homestay, Booking } from './types';
import { generateHomestayDescriptions } from './services/geminiService';


type View = 'home' | 'details' | 'contact';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [homestays, setHomestays] = useState<Homestay[]>(HOMESTAYS);
    const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDescriptions = useCallback(async () => {
        try {
            setIsLoading(true);
            const descriptions = await generateHomestayDescriptions(homestays.map(h => h.name));
            const updatedHomestays = homestays.map((homestay, index) => ({
                ...homestay,
                description: descriptions[index] || 'A charming and serene getaway.'
            }));
            setHomestays(updatedHomestays);
        } catch (err) {
            console.error(err);
            setError('Failed to load homestay descriptions. Please try again later.');
            const updatedHomestays = homestays.map(homestay => ({
                ...homestay,
                description: 'A charming and serene getaway nestled in the beautiful hills.'
            }));
            setHomestays(updatedHomestays);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchDescriptions();
    }, [fetchDescriptions]);

    const handleSelectHomestay = (homestay: Homestay) => {
        setSelectedHomestay(homestay);
        setView('details');
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setSelectedHomestay(null);
        setView('home');
        window.scrollTo(0, 0);
    };
    
    const handleNavigate = (targetView: View) => {
        setView(targetView);
        window.scrollTo(0, 0);
    };

    const handleAddBooking = (newBooking: Booking) => {
        setBookings(prevBookings => [...prevBookings, newBooking]);
    };

    const renderView = () => {
        switch (view) {
            case 'home':
                return (
                    <>
                        <Hero onExplore={() => document.getElementById('homestays')?.scrollIntoView({ behavior: 'smooth' })} />
                        <div id="homestays" className="py-16 sm:py-24">
                            <HomestayList
                                homestays={homestays}
                                onSelectHomestay={handleSelectHomestay}
                                isLoading={isLoading}
                                error={error}
                            />
                        </div>
                    </>
                );
            case 'details':
                if (selectedHomestay) {
                    return (
                        <HomestayDetail
                            homestay={selectedHomestay}
                            bookings={bookings.filter(b => b.homestayId === selectedHomestay.id)}
                            onAddBooking={handleAddBooking}
                            onBack={handleBack}
                        />
                    );
                }
                return null;
            case 'contact':
                return <ContactView />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onNavigate={handleNavigate} currentView={view} />
            <main className="flex-grow">
                {renderView()}
            </main>
            <Footer />
        </div>
    );
};

export default App;
