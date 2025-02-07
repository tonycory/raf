import { API_CONFIG, ENDPOINTS } from '../config/api.config';

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  content: string;
  categories: string[];
}

class NewsService {
  private readonly baseUrl: string;
  private readonly useMock: boolean;
  private readonly mockNews: NewsItem[];

  constructor() {
    this.baseUrl = API_CONFIG.CRYPTOPANIC.BASE_URL;
    this.useMock = API_CONFIG.CRYPTOPANIC.USE_MOCK;
    this.mockNews = API_CONFIG.CRYPTOPANIC.MOCK_NEWS;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    if (this.useMock) {
      return {
        results: this.mockNews
      };
    }

    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseUrl}${endpoint}?${queryString}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PROXY_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`News API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('News API Error:', error);
      return {
        results: this.mockNews
      };
    }
  }

  async getLatestNews(currency?: string, limit: number = 10): Promise<NewsItem[]> {
    const params: Record<string, string> = {
      limit: limit.toString(),
      public: 'true'
    };

    if (currency) {
      params.currencies = currency;
    }

    const response = await this.makeRequest(ENDPOINTS.CRYPTOPANIC.POSTS, params);
    return response.results;
  }

  async getNewsForAnalysis(limit: number = 20): Promise<string[]> {
    const news = await this.getLatestNews(undefined, limit);
    return news.map(item => `${item.title}. ${item.content}`);
  }
}

export const newsService = new NewsService(); 