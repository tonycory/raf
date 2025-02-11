export const API_CONFIG = {
  AI_ASSISTANT: {
    BASE_URL: '/api/ai',
    MODEL: 'gpt-3.5-turbo',
    API_KEY: import.meta.env.VITE_PROXY_API_KEY || 'your-proxy-api-key',
    USE_MOCK: true, // Временно используем моки
    MOCK_RESPONSES: {
      default: "На основе анализа рыночных данных рекомендуется: увеличить долю стейкинга на 15% для максимизации доходности в текущих условиях рынка.",
      market_analysis: "Текущая ситуация на рынке характеризуется повышенной волатильностью. Рекомендуется: 1) Диверсифицировать портфель, 2) Увеличить долю стейблкоинов, 3) Следить за новостями о регулировании.",
      price_prediction: "На основе технического анализа и рыночных индикаторов, прогноз на ближайшие 24 часа: вероятен боковой тренд с возможным пробитием уровня сопротивления."
    }
  },
  COINGECKO: {
    // Временно используем моковые данные
    USE_MOCK: true,
    MOCK_DATA: {
      bitcoin: { usd: 65000, usd_24h_change: 2.5 },
      ethereum: { usd: 3500, usd_24h_change: 1.8 },
      solana: { usd: 150, usd_24h_change: 5.2 },
      binancecoin: { usd: 450, usd_24h_change: -0.8 },
      cardano: { usd: 0.65, usd_24h_change: 1.2 }
    },
    BASE_URL: '/api/coingecko',
    RATE_LIMIT: {
      requests: 50,
      per: 'minute'
    }
  },
  CRYPTOPANIC: {
    // Временно используем моковые данные
    USE_MOCK: true,
    MOCK_NEWS: [
      {
        id: '1',
        title: 'Bitcoin Reaches New All-Time High',
        url: '#',
        source: 'Mock News',
        published_at: new Date().toISOString(),
        content: 'Bitcoin has reached a new all-time high amid growing institutional adoption.',
        categories: ['bitcoin', 'price']
      },
      {
        id: '2',
        title: 'Ethereum 2.0 Development Progress',
        url: '#',
        source: 'Mock News',
        published_at: new Date().toISOString(),
        content: 'Ethereum 2.0 development continues with successful testnet deployments.',
        categories: ['ethereum', 'technology']
      },
      {
        id: '3',
        title: 'New DeFi Protocol Launch',
        url: '#',
        source: 'Mock News',
        published_at: new Date().toISOString(),
        content: 'A new DeFi protocol promises higher yields and improved security.',
        categories: ['defi']
      }
    ],
    BASE_URL: '/api/cryptopanic'
  },
  TELEGRAM: {
    CHANNELS: [
      'kopeechkav',
      'markettwits',
      'birzhevikstocksofficial2'
    ],
    CATEGORIES: {
      CRYPTO: {
        hashtags: ['#crypto', '#bitcoin', '#ethereum', '#btc', '#eth', '#defi', '#nft', '#altcoin', '#binance'],
        keywords: [
          'биткоин', 'криптовалюта', 'blockchain', 'defi', 'майнинг', 'токен', 'альткоин',
          'эфириум', 'биржа', 'холдинг', 'кошелек', 'блокчейн', 'смартконтракт', 'dao',
          'метавселенная', 'web3', 'стейкинг', 'yield farming', 'liquidity', 'пул'
        ]
      },
      US_MARKET: {
        hashtags: ['#sp500', '#nasdaq', '#dowjones', '#nyse', '#trading', '#stocks'],
        keywords: [
          'S&P500', 'NYSE', 'NASDAQ', 'фьючерс', 'индекс', 'dow jones', 'американский рынок',
          'уолл-стрит', 'фонд', 'etf', 'акции сша', 'трежерис', 'фрс', 'fed', 'джером пауэлл',
          'инфляция сша', 'американская сессия', 'премаркет', 'aftermarket', 'blue chips'
        ]
      },
      RU_MARKET: {
        hashtags: ['#moex', '#ммвб', '#ртс', '#спб', '#акции'],
        keywords: [
          'мосбиржа', 'российский рынок', 'рубль', 'офз', 'цб рф', 'набиуллина', 'ммвб',
          'индекс мосбиржи', 'спб биржа', 'дивиденды', 'российские акции', 'газпром',
          'сбер', 'лукойл', 'роснефть', 'втб', 'норникель', 'фосагро', 'московская биржа'
        ]
      }
    },
    UPDATE_INTERVAL: 30 * 60 * 1000, // 30 минут
    ANALYSIS_SCHEDULE: {
      MORNING_UPDATE: '09:00', // МСК
      EVENING_UPDATE: '20:00', // МСК
      TIMEZONE: 'Europe/Moscow'
    },
    TIMEFRAMES: {
      LONG_TERM: {
        YEAR: 365,
        HALF_YEAR: 180
      },
      MEDIUM_TERM: {
        THREE_MONTHS: 90,
        MONTH: 30
      },
      SHORT_TERM: {
        WEEK: 7,
        DAY: 1
      }
    }
  }
};

// Rate limiting configs
export const RATE_LIMITS = {
  COINGECKO: {
    REQUESTS_PER_MINUTE: 50
  }
};

// Endpoints
export const ENDPOINTS = {
  AI_ASSISTANT: {
    CHAT: '/chat/completions',
    ANALYSIS: '/analysis',
  },
  COINGECKO: {
    PRICES: '/simple/price',
    MARKET_CHART: '/coins/{id}/market_chart',
    COINS_LIST: '/coins/list'
  },
  CRYPTOPANIC: {
    POSTS: '/posts'
  }
}; 