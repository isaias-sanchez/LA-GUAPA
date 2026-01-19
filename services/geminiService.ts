
import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem, RecommendationRequest } from "../types";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getChefRecommendation = async (req: RecommendationRequest): Promise<string> => {
  const menuStr = MENU_ITEMS.map(i => `${i.name} (${i.category}): ${i.description}`).join('\n');
  
  const prompt = `You are the chaotic but brilliant chef-artist of "La Guapa".
  A user wants a recommendation.
  Mood: ${req.mood}
  Hunger: ${req.hungerLevel}
  Dietary: ${req.dietary || 'None'}
  
  Here is our menu:
  ${menuStr}
  
  Pick 1 or 2 items and explain why in a poetic, street-wise, fanzine-style manifesto (in Spanish). Keep it short (max 60 words). Don't use bullet points.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "La cocina está en llamas, pero el alma sigue viva. Prueba la Belanova.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error en la matrix culinaria. Pide lo que te dicte el corazón.";
  }
};
