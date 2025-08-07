
import { GoogleGenAI } from "@google/genai";

// Ensure you have the API_KEY in your environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Using mocked data.");
}
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MOCK_DESCRIPTIONS = [
    "Escape to Pine Ridge Cottage, a cozy sanctuary nestled amidst whispering pines. Enjoy breathtaking mountain views and serene nature walks right from your doorstep. The perfect blend of rustic charm and modern comfort awaits your arrival.",
    "Discover the enchanting Orchid Villa, where vibrant blooms and lush greenery create a paradise on Earth. Savor farm-to-table meals and immerse yourself in the tranquility of our sprawling gardens. An unforgettable experience for nature lovers.",
    "Perched atop the hills, Cloud Haven Retreat offers a sublime escape with panoramic vistas that touch the clouds. This eco-friendly haven provides a peaceful sanctuary to unwind, read, and reconnect with yourself amidst stunning natural beauty."
];

export const generateHomestayDescriptions = async (homestayNames: string[]): Promise<string[]> => {
    if (!ai) {
        return Promise.resolve(MOCK_DESCRIPTIONS);
    }
    
    try {
        const promises = homestayNames.map(name => {
            const prompt = `Create a beautiful, enticing, and short description for a homestay named "${name}" located in the serene hills of Northeast India, similar to Shillong. Highlight its unique charm, tranquility, and connection to nature. Keep it under 50 words. Be poetic and inviting.`;
            return ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
        });

        const responses = await Promise.all(promises);
        return responses.map(response => response.text);

    } catch (error) {
        console.error("Error generating descriptions with Gemini API:", error);
        // Fallback to mock descriptions in case of an API error
        return MOCK_DESCRIPTIONS;
    }
};
