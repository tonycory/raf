import { API_CONFIG } from '../config/api.config';

interface TelegramMessage {
  message_id: number;
  date: number;
  text: string;
  hashtags: string[];
  channel: string;
  category?: 'CRYPTO' | 'US_MARKET' | 'RU_MARKET';
}

interface MarketAnalysis {
  crypto: TelegramMessage[];
  usMarket: TelegramMessage[];
  ruMarket: TelegramMessage[];
  timestamp: number;
}

interface TimeframeAnalysis {
  messages: TelegramMessage[];
  period: number;
  startDate: Date;
  endDate: Date;
}

class TelegramService {
  private readonly baseUrl: string;
  private readonly channelCache: Map<string, TelegramMessage[]>;
  private readonly analysisCache: MarketAnalysis;
  private readonly updateInterval: number = API_CONFIG.TELEGRAM.UPDATE_INTERVAL;
  private lastScheduledUpdate: Date | null = null;

  constructor() {
    this.baseUrl = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}`;
    this.channelCache = new Map();
    this.analysisCache = {
      crypto: [],
      usMarket: [],
      ruMarket: [],
      timestamp: Date.now()
    };
    this.startUpdateLoop();
    this.startScheduledAnalysis();
  }

  private async startScheduledAnalysis() {
    setInterval(() => {
      const now = new Date();
      const moscowTime = this.getMoscowTime(now);
      const timeStr = moscowTime.toTimeString().substring(0, 5);

      if (
        (timeStr === API_CONFIG.TELEGRAM.ANALYSIS_SCHEDULE.MORNING_UPDATE ||
         timeStr === API_CONFIG.TELEGRAM.ANALYSIS_SCHEDULE.EVENING_UPDATE) &&
        this.lastScheduledUpdate?.getTime() !== now.getTime()
      ) {
        this.generateScheduledAnalysis();
        this.lastScheduledUpdate = now;
      }
    }, 60000); // Проверяем каждую минуту
  }

  private getMoscowTime(date: Date): Date {
    return new Date(date.toLocaleString('en-US', { timeZone: API_CONFIG.TELEGRAM.ANALYSIS_SCHEDULE.TIMEZONE }));
  }

  private async generateScheduledAnalysis() {
    const analysis = await this.getMarketAnalysis();
    const timeframe = this.getMoscowTime(new Date()).getHours() < 12 ? 'утренний' : 'вечерний';
    
    // Здесь можно добавить логику отправки аналитики через бота или сохранения в базу данных
    console.log(`Generating ${timeframe} анализ рынков...`);
    return {
      timestamp: Date.now(),
      timeframe,
      analysis
    };
  }

  async getTimeframeAnalysis(category: 'CRYPTO' | 'US_MARKET' | 'RU_MARKET', days: number): Promise<TimeframeAnalysis> {
    const analysis = await this.getMarketAnalysis();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const messages = (analysis[category.toLowerCase() as keyof MarketAnalysis] as TelegramMessage[])
      .filter(msg => {
        const messageDate = new Date(msg.date * 1000);
        return messageDate >= startDate && messageDate <= endDate;
      })
      .sort((a, b) => b.date - a.date);

    return {
      messages,
      period: days,
      startDate,
      endDate
    };
  }

  async getLongTermAnalysis(category: 'CRYPTO' | 'US_MARKET' | 'RU_MARKET', isYear: boolean = true): Promise<TimeframeAnalysis> {
    const days = isYear ? API_CONFIG.TELEGRAM.TIMEFRAMES.LONG_TERM.YEAR : API_CONFIG.TELEGRAM.TIMEFRAMES.LONG_TERM.HALF_YEAR;
    return this.getTimeframeAnalysis(category, days);
  }

  async getMediumTermAnalysis(category: 'CRYPTO' | 'US_MARKET' | 'RU_MARKET', isThreeMonths: boolean = true): Promise<TimeframeAnalysis> {
    const days = isThreeMonths ? API_CONFIG.TELEGRAM.TIMEFRAMES.MEDIUM_TERM.THREE_MONTHS : API_CONFIG.TELEGRAM.TIMEFRAMES.MEDIUM_TERM.MONTH;
    return this.getTimeframeAnalysis(category, days);
  }

  async getShortTermAnalysis(category: 'CRYPTO' | 'US_MARKET' | 'RU_MARKET', isWeek: boolean = true): Promise<TimeframeAnalysis> {
    const days = isWeek ? API_CONFIG.TELEGRAM.TIMEFRAMES.SHORT_TERM.WEEK : API_CONFIG.TELEGRAM.TIMEFRAMES.SHORT_TERM.DAY;
    return this.getTimeframeAnalysis(category, days);
  }

  private async startUpdateLoop() {
    await this.updateChannelsCache();
    setInterval(() => {
      this.updateChannelsCache();
    }, this.updateInterval);
  }

  private async updateChannelsCache() {
    try {
      const channels = API_CONFIG.TELEGRAM.CHANNELS;
      for (const channel of channels) {
        const messages = await this.getChannelHistory(channel);
        if (messages) {
          this.channelCache.set(channel, messages);
          await this.categorizeMessages(messages);
        }
      }
    } catch (error) {
      console.error('Failed to update channels cache:', error);
    }
  }

  private async getChannelHistory(channel: string, limit: number = 50): Promise<TelegramMessage[]> {
    try {
      const response = await fetch(`${this.baseUrl}/getUpdates`);
      if (!response.ok) {
        throw new Error(`Telegram API request failed: ${response.statusText}`);
      }
      return [];  // Временно возвращаем пустой массив
    } catch (error) {
      console.error('Failed to get channel history:', error);
      return [];
    }
  }

  private extractHashtags(text: string = ''): string[] {
    const hashtagRegex = /#[\wа-яА-Я]+/g;
    return text.match(hashtagRegex) || [];
  }

  private async categorizeMessages(messages: TelegramMessage[]) {
    const categories = API_CONFIG.TELEGRAM.CATEGORIES;
    
    messages.forEach(message => {
      const text = message.text.toLowerCase();
      const hashtags = message.hashtags.map(h => h.toLowerCase());

      // Проверяем принадлежность к категории CRYPTO
      if (
        hashtags.some(h => categories.CRYPTO.hashtags.includes(h)) ||
        categories.CRYPTO.keywords.some(k => text.includes(k.toLowerCase()))
      ) {
        message.category = 'CRYPTO';
        this.analysisCache.crypto.push(message);
      }
      // Проверяем принадлежность к категории US_MARKET
      else if (
        hashtags.some(h => categories.US_MARKET.hashtags.includes(h)) ||
        categories.US_MARKET.keywords.some(k => text.includes(k.toLowerCase()))
      ) {
        message.category = 'US_MARKET';
        this.analysisCache.usMarket.push(message);
      }
      // Проверяем принадлежность к категории RU_MARKET
      else if (
        hashtags.some(h => categories.RU_MARKET.hashtags.includes(h)) ||
        categories.RU_MARKET.keywords.some(k => text.includes(k.toLowerCase()))
      ) {
        message.category = 'RU_MARKET';
        this.analysisCache.ruMarket.push(message);
      }
    });

    // Обновляем временную метку анализа
    this.analysisCache.timestamp = Date.now();
  }

  async getMarketAnalysis(): Promise<MarketAnalysis> {
    // Если кеш устарел, обновляем его
    if (Date.now() - this.analysisCache.timestamp > this.updateInterval) {
      await this.updateChannelsCache();
    }
    return this.analysisCache;
  }

  async getCryptoAnalysis(): Promise<TelegramMessage[]> {
    const analysis = await this.getMarketAnalysis();
    return analysis.crypto;
  }

  async getUSMarketAnalysis(): Promise<TelegramMessage[]> {
    const analysis = await this.getMarketAnalysis();
    return analysis.usMarket;
  }

  async getRUMarketAnalysis(): Promise<TelegramMessage[]> {
    const analysis = await this.getMarketAnalysis();
    return analysis.ruMarket;
  }
}

export const telegramService = new TelegramService(); 