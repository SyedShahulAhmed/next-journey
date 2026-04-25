import { NextResponse } from "next/server";
import { getCache, setCache, getCacheMeta } from "@/lib/cache";

const CACHE_TTL_MS = 1000 * 60;
const STALE_THRESHOLD_MS = 12_000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "all";

  const cacheKey = `posts-${userId}`;

  const url =
    userId === "all"
      ? "https://jsonplaceholder.typicode.com/posts"
      : `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  const cached = getCache(cacheKey);

  // Serve cache immediately and optionally revalidate in background near expiry.
  if (cached) {
    const meta = getCacheMeta(cached);
    const isStale = meta.expiresIn <= STALE_THRESHOLD_MS;

    if (isStale) {
      fetch(url)
        .then((res) => res.json())
        .then((freshData) => {
          setCache(cacheKey, freshData, CACHE_TTL_MS);
        })
        .catch(() => {});
    }

    return NextResponse.json({
      source: isStale ? "cache (stale)" : "cache (hit)",
      data: cached.data,
      ...meta,
    });
  }

  // no cache -> fetch fresh data
  const res = await fetch(url);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Upstream API failed", status: res.status },
      { status: 502 },
    );
  }

  const data = await res.json();

  setCache(cacheKey, data, CACHE_TTL_MS);

  return NextResponse.json({
    source: "api (fresh)",
    data,
    cachedAt: Date.now(),
    expiresIn: CACHE_TTL_MS,
  });
}