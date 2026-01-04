// For safety and security, ideally the API key would be loaded from an environment variable.
// For this demonstration, we\`ll use a placeholder and simulate the API call.
const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key

export async function generateStampText(prompt: string): Promise<string> {
  console.warn("Gemini API key not configured or API integration failed. Returning mock text.");
  // Simulate AI response for demonstration purposes without an actual API key
  const mockResponses = [
    "A journey of a thousand miles begins with a single step.",
    "The best way to predict the future is to create it.",
    "Wherever you go, go with all your heart.",
    "Believe you can and you\`re halfway there.",
    "The only limit to our realization of tomorrow will be our doubts of today."
  ];
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
    }, 1000) // Simulate network delay
  );
}
