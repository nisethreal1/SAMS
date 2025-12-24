
import { GoogleGenAI } from "@google/genai";
import { SlideData } from "../types";

export const generateSpeakerNotes = async (slide: SlideData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    You are an expert Software Project Manager helping a student with a presentation for their "Student Attendance Management System (SAMS)" project.
    Create a concise, professional speaker script (max 150 words) for Slide ${slide.id} titled "${slide.title}".
    
    Slide Content: ${JSON.stringify(slide.content)}
    
    The tone should be confident, academic, and engaging. Focus on key takeaways and transition to the next slide if appropriate.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });

    return response.text || "Could not generate notes at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to AI service.";
  }
};
