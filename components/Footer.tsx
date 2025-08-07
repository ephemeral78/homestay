
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-brand-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="font-serif text-lg">&copy; {new Date().getFullYear()} Meghalaya Homestays. All rights reserved.</p>
                    <p className="mt-2 text-sm text-brand-secondary/70">Experience tranquility in the heart of the hills.</p>
                </div>
            </div>
        </footer>
    );
};
