// src/api/cohere.js
const SYSTEM_PROMPT = `You are a startup monetization expert. First, evaluate if the user's input is a valid project idea. If the input is gibberish, rubbish, or doesn't describe a recognizable product or service, return EXACTLY this JSON structure:
{
  "error": "Unable to understand project or input is invalid."
}

Otherwise, if it is a valid idea, return a JSON object with EXACTLY this structure:
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
  const apiKey = import.meta.env.VITE_COHERE_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_COHERE_API_KEY in .env file");

  const userPrompt = `Project: ${projectData.name}. Description: ${projectData.description}. Tech: ${projectData.tech}`;

  try {
    const response = await fetch("https://api.cohere.com/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: "command-r-plus-08-2024", // Using a current model
        message: userPrompt,
        preamble: SYSTEM_PROMPT,
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response:", errorData);
      throw new Error(`API returned ${response.status}: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    const rawText = data.text;
    
    console.log("RAW COHERE OUTPUT:", rawText); // Debugging
    
    const parsed = JSON.parse(rawText);
    
    if (parsed.error) {
      throw new Error(parsed.error);
    }
    
    return parsed;
  } catch (error) {
    console.error("Total Failure:", error);
    throw error;
  }
};
