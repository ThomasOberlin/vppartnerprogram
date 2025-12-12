import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// In a real production app, you would handle the missing key more gracefully or use a backend proxy.
// For this demo, we assume the key is present or the feature will gracefully fail.

export const generateTextAssistance = async (
  context: 'business_description' | 'motivation',
  userInput: string
): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    let systemInstruction = "";
    let prompt = "";

    if (context === 'business_description') {
      systemInstruction = "You are a professional business copywriter. Help the user refine their business description for a B2B partnership application. Keep it concise, professional, and clear.";
      prompt = `Refine or expand this business description: "${userInput}". If the input is very short, expand it to 2-3 professional sentences.`;
    } else {
      systemInstruction = "You are a professional career coach. Help the user articulate why they want to partner with a food compliance software company.";
      prompt = `Refine or expand this motivation statement: "${userInput}". Focus on mutual growth and professional alignment. Keep it under 4 sentences.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ""; // Return empty string on error to handle gracefully in UI
  }
};
