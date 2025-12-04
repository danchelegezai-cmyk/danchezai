import { GoogleGenAI, Type } from "@google/genai";
import { EventFormData, GeneratedCopyResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventCopy = async (
  formData: EventFormData
): Promise<GeneratedCopyResult> => {
  // Format prizes into a readable string list
  const prizesText = formData.prizes
    .filter(p => p.name.trim() || p.content.trim())
    .map(p => `- ${p.name}: ${p.content}`)
    .join('\n');

  const prompt = `
    Role: You are an expert Community Operations Manager for "九元飞跑团" (Nine Yuan Flying Running Group), an online running community.
    Task: Create promotional copy for an online running event based on the details below.
    
    Event Details:
    - Theme/Topic: ${formData.theme}
    - Duration/Time: ${formData.duration}
    - Prizes & Awards:
${prizesText}
    - Activity Rules: ${formData.rules}
    - How to Participate: ${formData.participation}
    - Other Requirements: ${formData.otherRequirements}
    - Preferred Tone: ${formData.style}
    - Platform: ${formData.platform}

    Requirements:
    1. Generate THREE distinct versions:
       - concise: Short, punchy, perfect for a quick notification or tweet.
       - playful: Fun, engaging, heavily uses emojis and slang where appropriate, high energy suitable for runners.
       - detailed: A structured announcement with clear sections (Theme, Time, How to Join, Prizes, Rules), suitable for a pinned post or newsletter.
    2. Also generate a string of relevant emojis suitable for this event topic.
    3. Ensure the copy is formatted nicely with line breaks.
    4. Language: Simplified Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            concise: {
              type: Type.STRING,
              description: "A short version of the copy, max 50 words.",
            },
            playful: {
              type: Type.STRING,
              description: "A fun, emoji-rich version of the copy.",
            },
            detailed: {
              type: Type.STRING,
              description: "A comprehensive version with bullet points and clear structure.",
            },
            emojiStr: {
              type: Type.STRING,
              description: "A string of 5-10 emojis relevant to the event.",
            },
          },
          required: ["concise", "playful", "detailed", "emojiStr"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated");
    }

    const json = JSON.parse(text);
    return json as GeneratedCopyResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate copy. Please try again.");
  }
};