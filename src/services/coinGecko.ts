import { API_CONFIG, ENDPOINTS } from '../config/api.config';

interface CoinPrice {
  [key: string]: {
    usd: number;
    usd_24h_change?: number;
  };
}

interface MarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

class CoinGeckoService {
  private readonly baseUrl: string;
  private readonly useMock: boolean;
  private readonly mockData: any;

  constructor() {
    this.baseUrl = API_CONFIG.COINGECKO.BASE_URL;
    this.useMock = API_CONFIG.COINGECKO.USE_MOCK;
    this.mockData = API_CONFIG.COINGECKO.MOCK_DATA;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    if (this.useMock) {
      // Возвращаем моковые данные для разных эндпоинтов
      if (endpoint === ENDPOINTS.COINGECKO.PRICES) {
        const coinId = params.ids;
        return { [coinId]: this.mockData[coinId] };
      }
      if (endpoint === ENDPOINTS.COINGECKO.COINS_LIST) {
        return Object.keys(this.mockData).map(id => ({
          id,
          symbol: id,
          name: id.charAt(0).toUpperCase() + id.slice(1)
        }));
      }
      // Генерируем моковые данные для графика
      if (endpoint.includes(ENDPOINTS.COINGECKO.MARKET_CHART)) {
        const coinId = endpoint.split('/')[2];
        const basePrice = this.mockData[coinId]?.usd || 1000;
        const days = parseInt(params.days) || 30;
        return this.generateMockChartData(basePrice, days);
      }
    }

    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_PROXY_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CoinGecko API Error:', error);
      throw error;
    }
  }

  private generateMockChartData(basePrice: number, days: number): MarketChart {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const prices: [number, number][] = [];
    const market_caps: [number, number][] = [];
    const total_volumes: [number, number][] = [];

    for (let i = days; i >= 0; i--) {
      const timestamp = now - (i * dayMs);
      const randomChange = (Math.random() - 0.5) * 0.02; // ±1% изменение
      const price = basePrice * (1 + randomChange);
      prices.push([timestamp, price]);
      market_caps.push([timestamp, price * 1000000]); // Просто для примера
      total_volumes.push([timestamp, price * 100000]); // Просто для примера
    }

    return { prices, market_caps, total_volumes };
  }

  async getPrice(coinId: string): Promise<CoinPrice> {
    return this.makeRequest(ENDPOINTS.COINGECKO.PRICES, {
      ids: coinId,
      vs_currencies: 'usd',
      include_24hr_change: 'true'
    });
  }

  async getMarketChart(coinId: string, days: number = 30): Promise<MarketChart> {
    return this.makeRequest(ENDPOINTS.COINGECKO.MARKET_CHART.replace('{id}', coinId), {
      vs_currency: 'usd',
      days: days.toString(),
      interval: 'daily'
    });
  }

  async getCoinsList(): Promise<Array<{ id: string; symbol: string; name: string }>> {
    return this.makeRequest(ENDPOINTS.COINGECKO.COINS_LIST);
  }

  formatChartData(marketChart: MarketChart) {
    return marketChart.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toISOString().split('T')[0],
      value: price
    }));
  }
}

export const coinGecko = new CoinGeckoService(); 