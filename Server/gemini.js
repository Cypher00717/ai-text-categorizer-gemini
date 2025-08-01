import { GoogleGenAI } from '@google/genai';
import env from 'dotenv';
env.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


async function categorizeText(inputText) {


    // Construct the prompt for Gemini AI
    // This prompt instructs the AI to categorize the expense text
    const prompt = `Categorize the following user expense text.
                    Extract: amount (number), category (Food, Travel, Bills, Shopping, etc), and a short summary.
                    Return result just as JSON. Return the result in **strict JSON** format.
                    No code blocks, no markdown, no explanation — just plain JSON.

                    Text: "${inputText}"`


    // Call the Gemini AI model to generate content based on the prompt                
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
    });

    

    // Check if the response is successful
    let text = response.text;

    text = text.replace(/```json|```/g, "").trim();


    function cleanJsonResponse(text) {
        // Remove Markdown-style code blocks
        let cleaned = text.replace(/```json|```/g, "").trim();

        // Replace single quotes with double quotes
        cleaned = cleaned.replace(/'/g, '"');

        // Add quotes around unquoted keys (best effort)
        cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

        return cleaned;
    }

    const cleaned = cleanJsonResponse(text);

    console.log(cleaned)

    // Parse the response text as JSON
    // This assumes the AI returns a valid JSON string
    try {
        const json = JSON.parse(cleaned);

        console.log("Parsed JSON:", json);
        return json;
    } catch (e) {
        console.error("Error parsing JSON:", e);
    }
}

export default categorizeText;