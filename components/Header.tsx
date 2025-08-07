
import React from 'react';

interface HeaderProps {
    onNavigate: (view: 'home' | 'contact') => void;
    currentView: 'home' | 'details' | 'contact';
}

const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            isActive
                ? 'text-brand-accent'
                : 'text-brand-dark hover:text-brand-accent'
        }`}
    >
        {children}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
    return (
        <header className="sticky top-0 z-50 bg-brand-light/80 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            <span className="font-serif text-2xl font-bold text-brand-dark">Meghalaya Stays</span>
                        </button>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        <NavLink onClick={() => onNavigate('home')} isActive={currentView === 'home' || currentView === 'details'}>
                            Home
                        </NavLink>
                        <NavLink onClick={() => onNavigate('contact')} isActive={currentView === 'contact'}>
                            Contact
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};
