export type CacheEventType = "hit" | "miss" | "stale" | "error";

export type CacheStatus = "HIT" | "MISS" | "STALE" | "IDLE" | "ERROR";

export type TimelineEvent = {
  id: string;
  type: CacheEventType;
  createdAt: number;
  userId: string;
  source: string;
  latencyMs: number;
};

export type CacheRow = {
  key: string;
  cachedAt: number;
  expiry: number;
  expiresIn: number;
};

export type LogLine = {
  id: string;
  level: "info" | "success" | "warn" | "error";
  text: string;
};
