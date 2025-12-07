import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const analyzeConversionTrend = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) return "Gemini API Key missing.";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
    You are a financial analyst API.
    User wants to convert ${amount} ${fromCurrency} to ${toCurrency}.
    Analyze current general market volatility and trends for these currencies.
    Provide a SINGLE, concise sentence (max 25 words) offering strategic advice.
    Example: "Consider holding USD as EUR volatility is high due to recent ECB announcements."
    Do not provide a disclaimer.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Unable to generate insight.";
  } catch (error) {
    console.error("Gemini Conversion Analysis Error:", error);
    return "Market analysis currently unavailable.";
  }
};

export const getOptimalPaymentStrategy = async (
  location: string,
  amount: number,
  currency: string,
  riskProfile: string
): Promise<{ recommendation: string; reasoning: string; actionPlan: string[] }> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) throw new Error("API Key missing");

  try {
    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model,
      contents: `
      Act as a high-end financial tax strategist and crypto expert.
      User Location: ${location}
      Incoming Payment: ${amount} ${currency}
      Risk Profile: ${riskProfile}

      Analyze the best cryptocurrency to receive this payment in (e.g., USDC, USDT, ETH, BTC) to optimize for:
      1. Tax efficiency (Capital Gains/Income Tax in ${location})
      2. Liquidity and Transaction Fees
      3. Speed
      Return JSON with:
      - recommendation (The asset ticker)
      - reasoning (A paragraph explaining why based on local tax laws and market conditions)
      - actionPlan (Array of strings, 3 specific steps the user should take)
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            actionPlan: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from Gemini");

    const parsed = JSON.parse(jsonText);

    return {
      recommendation: parsed.recommendation || "Strategy Unavailable",
      reasoning: parsed.reasoning || "Could not generate reasoning due to incomplete data.",
      actionPlan: Array.isArray(parsed.actionPlan) ? parsed.actionPlan : []
    };
  } catch (error) {
    console.error("Gemini Strategy Error:", error);
    throw new Error("Failed to generate strategy.");
  }
};
