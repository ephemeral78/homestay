
import React, { useState } from 'react';

export const ContactView: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-brand-secondary py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-serif text-4xl font-bold text-brand-dark">Get in Touch</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have questions or special requests? We're here to help you plan your perfect getaway.
                    </p>
                </div>

                <div className="mt-12 max-w-lg mx-auto">
                    {submitted ? (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                            <p className="font-bold">Thank you!</p>
                            <p>Your message has been sent. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="full-name" className="sr-only">Full name</label>
                                <input type="text" name="full-name" id="full-name" autoComplete="name" required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-primary focus:border-brand-primary border-gray-300 rounded-md" placeholder="Full name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-primary focus:border-brand-primary border-gray-300 rounded-md" placeholder="Email" />
                            </div>
                             <div>
                                <label htmlFor="phone" className="sr-only">Phone</label>
                                <input type="text" name="phone" id="phone" autoComplete="tel" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-primary focus:border-brand-primary border-gray-300 rounded-md" placeholder="Phone (Optional)" />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea id="message" name="message" rows={4} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-brand-primary focus:border-brand-primary border border-gray-300 rounded-md" placeholder="Message"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
