// src/api/gemini.js
const SYSTEM_PROMPT = `You are a startup monetization expert. Given a project description, return a JSON object with EXACTLY this structure:
{
  "tagline": "one punchy line describing the product value",
  "monetization_paths": [
    { "name": "path name", "description": "2 sentence explanation", "effort": "Low / Medium / High", "timeline": "e.g. 2-4 weeks" }
  ],
  "target_users": [
    { "persona": "who they are", "pain_point": "what problem they have", "willingness_to_pay": "Low / Medium / High" }
  ],
  "pricing_suggestion": { "model": "e.g. Subscription", "free_tier": "what's free", "paid_tier": "what's paid", "suggested_price": "e.g. ₹199/month" },
  "cold_pitch": "A 3-sentence cold pitch to send via email."
}`;

export const analyzeProject = async (projectData) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in .env file");

  const userPrompt = `Project: ${projectData.name}. Description: ${projectData.description}. Tech: ${projectData.tech}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      throw new Error(`API returned ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;
    
    console.log("RAW GEMINI OUTPUT:", rawText); // <-- ADD THIS
    
    return JSON.parse(rawText);
  } catch (error) {
    console.error("Total Failure:", error);
    throw error;
  }
};