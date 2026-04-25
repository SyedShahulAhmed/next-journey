type CacheItem = {
  data: unknown;
  expiry: number;
  cachedAt: number;
};

const cache = new Map<string, CacheItem>();

function pruneExpiredEntries() {
  const now = Date.now();

  for (const [key, item] of cache.entries()) {
    if (now > item.expiry) {
      cache.delete(key);
    }
  }
}

export function setCache(key: string, data: unknown, ttl: number) {
  const now = Date.now();

  cache.set(key, {
    data,
    expiry: now + ttl,
    cachedAt: now,
  });
}

export function getCache(key: string) {
  const item = cache.get(key);

  if (!item) return null;

  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item;
}

export function deleteCache(key: string) {
  return cache.delete(key);
}

export function getCacheMeta(item: CacheItem) {
  return {
    cachedAt: item.cachedAt,
    expiresIn: Math.max(item.expiry - Date.now(), 0),
  };
}

export function getAllCache() {
  pruneExpiredEntries();

  return Array.from(cache.entries()).map(([key, value]) => ({
    key,
    cachedAt: value.cachedAt,
    expiry: value.expiry,
    expiresIn: Math.max(value.expiry - Date.now(), 0),
  }));
}