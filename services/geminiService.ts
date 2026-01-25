import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem, RecommendationRequest } from "../types";
import { MENU_ITEMS } from "../constants";

// Corrected initialization using process.env.API_KEY directly as per guidelines
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || "AIzaSyD5CokJry_XXsFkFZGM2sV-HtEsHtCRilY"; // Fallback just in case
const ai = new GoogleGenAI({ apiKey });

export const getChefRecommendation = async (req: RecommendationRequest, availableMenu: MenuItem[]): Promise<string> => {
  // Use provided menu or fallback to constant if empty (though logic should ensure we pass real data)
  const itemsToConsider = availableMenu.length > 0 ? availableMenu : MENU_ITEMS;
  const menuStr = itemsToConsider.map(i => `${i.name} (${i.category}): ${i.description}`).join('\n');

  const prompt = `Eres el caótico pero brillante chef-artista de "La Guapa".
  Un usuario quiere una recomendación.
  Estado de ánimo: ${req.mood}
  Nivel de hambre: ${req.hungerLevel} (donde 'snack' es picoteo, 'meal' es comida y 'feast' es banquete)
  Restricciones: ${req.dietary || 'Ninguna'}
  
  Aquí está nuestro menú:
  ${menuStr}
  
  Elige 1 o 2 platos y explica por qué en un manifiesto poético, callejero y estilo fanzine (EXCLUSIVAMENTE EN ESPAÑOL). Sé breve (máximo 60 palabras). No uses viñetas.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });
    // The GenerateContentResponse has a `text` property that directly returns the extracted string output.
    return response.text || "La cocina está en llamas, pero el alma sigue viva. Prueba la Belanova.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error en la matrix culinaria. Pide lo que te dicte el corazón.";
  }
};