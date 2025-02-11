type CacheItem<T> = {
  data: T;
  timestamp: number;
};

class Cache {
  private storage: Map<string, CacheItem<any>>;
  private readonly defaultTTL: number;

  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes by default
    this.storage = new Map();
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.storage.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.timestamp) {
      this.storage.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    return this.storage.has(key) && Date.now() <= this.storage.get(key)!.timestamp;
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  // Очистка просроченных элементов
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.storage.entries()) {
      if (now > item.timestamp) {
        this.storage.delete(key);
      }
    }
  }
}

export const cache = new Cache();

// Декоратор для кэширования результатов функций
export function cached(ttl?: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const key = `${propertyKey}-${JSON.stringify(args)}`;
      const cachedResult = cache.get(key);

      if (cachedResult !== null) {
        return cachedResult;
      }

      const result = await originalMethod.apply(this, args);
      cache.set(key, result, ttl);
      return result;
    };

    return descriptor;
  };
} 