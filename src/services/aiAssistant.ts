import { API_CONFIG } from '../config/api.config';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

class AIAssistantService {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor() {
    this.baseUrl = API_CONFIG.AI_ASSISTANT.BASE_URL;
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_PROXY_API_KEY}`
    };
  }

  async getResponse(prompt: string): Promise<string> {
    try {
      console.log('Sending request to AI Assistant:', { prompt });
      
      const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          model: API_CONFIG.AI_ASSISTANT.MODEL,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        console.error('AI Assistant Error:', {
          status: response.status,
          statusText: response.statusText
        });
        throw new Error(`AI Assistant request failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('AI Assistant Response:', data);
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Assistant Error:', error);
      return 'I apologize, but I am unable to provide a response at the moment. Please try again later.';
    }
  }

  async analyzeMarketNews(news: string[]): Promise<string> {
    const prompt = `Please analyze these market news and provide insights:\n${news.join('\n')}`;
    return this.getResponse(prompt);
  }

  async getPriceAnalysis(coin: string, priceData: any): Promise<string> {
    const prompt = `Please analyze the price data for ${coin}:\n${JSON.stringify(priceData)}`;
    return this.getResponse(prompt);
  }

  async getMarketStrategy(marketData: any): Promise<string> {
    const prompt = `Please analyze this market data and suggest a strategy:\n${JSON.stringify(marketData)}`;
    return this.getResponse(prompt);
  }
}

export const aiAssistant = new AIAssistantService(); 