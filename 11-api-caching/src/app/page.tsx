"use client";

import { Press_Start_2P, Space_Mono } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CacheStatusPanel } from "@/components/dino-dashboard/CacheStatusPanel";
import { CacheTable } from "@/components/dino-dashboard/CacheTable";
import { ControlsPanel } from "@/components/dino-dashboard/ControlsPanel";
import { DesertBackground } from "@/components/dino-dashboard/DesertBackground";
import { DinoEngine } from "@/components/dino-dashboard/DinoEngine";
import { GameOverOverlay } from "@/components/dino-dashboard/GameOverOverlay";
import { LiveLogs } from "@/components/dino-dashboard/LiveLogs";
import { MetricsGrid } from "@/components/dino-dashboard/MetricsGrid";
import { RequestTimeline } from "@/components/dino-dashboard/RequestTimeline";
import type {
  CacheEventType,
  CacheRow,
  CacheStatus,
  LogLine,
  TimelineEvent,
} from "@/components/dino-dashboard/types";

type ApiPost = {
  id: number;
  title: string;
  userId: number;
};

type DataResponse = {
  source: string;
  data: ApiPost[];
  expiresIn: number;
};

type CacheListResponse = {
  keys: CacheRow[];
  total: number;
};

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toEventType(source: string): CacheEventType {
  if (source.includes("api")) return "miss";
  if (source.includes("stale")) return "stale";
  if (source.includes("cache")) return "hit";
  return "error";
}

function toStatus(eventType: CacheEventType): CacheStatus {
  if (eventType === "hit") return "HIT";
  if (eventType === "miss") return "MISS";
  if (eventType === "stale") return "STALE";
  return "ERROR";
}

export default function Home() {
  const [data, setData] = useState<ApiPost[]>([]);
  const [source, setSource] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);
  const [userId, setUserId] = useState("all");
  const [loading, setLoading] = useState(false);
  const [autoRun, setAutoRun] = useState(true);

  const [status, setStatus] = useState<CacheStatus>("IDLE");
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [cacheRows, setCacheRows] = useState<CacheRow[]>([]);

  const [totalRequests, setTotalRequests] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [staleCount, setStaleCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [totalResponseMs, setTotalResponseMs] = useState(0);
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);

  const [jumpTick, setJumpTick] = useState(0);
  const [glowTick, setGlowTick] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const hasBooted = useRef(false);

  const pushLog = useCallback((level: LogLine["level"], text: string) => {
    setLogs((prev) => [...prev.slice(-11), { id: makeId(), level, text }]);
  }, []);

  const registerEvent = useCallback(
    (eventType: CacheEventType, eventSource: string, latencyMs: number, actorUserId: string) => {
      const now = Date.now();

      setTimeline((prev) =>
        [
          {
            id: makeId(),
            type: eventType,
            createdAt: now,
            userId: actorUserId,
            source: eventSource,
            latencyMs,
          },
          ...prev,
        ].slice(0, 14),
      );

      setTotalRequests((prev) => prev + 1);
      setTotalResponseMs((prev) => prev + latencyMs);
      setRequestTimestamps((prev) => [...prev.filter((stamp) => now - stamp <= 60_000), now]);

      if (eventType === "miss") {
        setMissCount((prev) => prev + 1);
        setJumpTick((prev) => prev + 1);
      }

      if (eventType === "hit") {
        setHitCount((prev) => prev + 1);
        setGlowTick((prev) => prev + 1);
      }

      if (eventType === "stale") {
        setStaleCount((prev) => prev + 1);
      }
    },
    [],
  );

  const refreshCacheRows = useCallback(async () => {
    try {
      const res = await fetch("/api/cache", { cache: "no-store" });
      if (!res.ok) return;

      const json = (await res.json()) as CacheListResponse;
      setCacheRows(json.keys);
    } catch {
      // ignore polling errors
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (gameOver) return;

    const normalizedUserId = userId.trim() || "all";
    const startedAt = performance.now();

    try {
      setLoading(true);

      if (normalizedUserId.toLowerCase() === "fail") {
        throw new Error("Simulated API outage");
      }

      const res = await fetch(`/api/data?userId=${encodeURIComponent(normalizedUserId)}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`API stream failed (${res.status})`);
      }

      const json = (await res.json()) as DataResponse;
      const latencyMs = performance.now() - startedAt;
      const eventType = toEventType(json.source);

      setData(json.data ?? []);
      setSource(json.source);
      setExpiresIn(json.expiresIn ?? 0);
      setStatus(toStatus(eventType));

      registerEvent(eventType, json.source, latencyMs, normalizedUserId);
      pushLog("success", `[${new Date().toLocaleTimeString()}] ${json.source} :: ${latencyMs.toFixed(0)}ms`);
    } catch (error) {
      const latencyMs = performance.now() - startedAt;
      const message = error instanceof Error ? error.message : "Unknown error";

      setStatus("ERROR");
      setSource(message);
      setGameOver(true);
      registerEvent("error", "api (failed)", latencyMs, normalizedUserId);
      pushLog("error", `[${new Date().toLocaleTimeString()}] ERROR :: ${message}`);
    } finally {
      setLoading(false);
      await refreshCacheRows();
    }
  }, [gameOver, pushLog, refreshCacheRows, registerEvent, userId]);

  const clearCurrentCache = useCallback(async () => {
    const normalizedUserId = userId.trim() || "all";
    const key = `posts-${normalizedUserId}`;

    await fetch(`/api/cache?key=${encodeURIComponent(key)}`, {
      method: "DELETE",
    });

    setSource("");
    setData([]);
    setExpiresIn(0);
    setStatus("IDLE");
    pushLog("warn", `[${new Date().toLocaleTimeString()}] Cache cleared :: ${key}`);
    await refreshCacheRows();
  }, [pushLog, refreshCacheRows, userId]);

  const removeCacheKey = useCallback(
    async (key: string) => {
      await fetch(`/api/cache?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
      });

      setCacheRows((prev) => prev.filter((row) => row.key !== key));
      pushLog("warn", `[${new Date().toLocaleTimeString()}] Destroyed obstacle :: ${key}`);
    },
    [pushLog],
  );

  const restartEngine = useCallback(() => {
    setGameOver(false);
    setStatus("IDLE");
    pushLog("info", `[${new Date().toLocaleTimeString()}] Engine restart accepted`);
  }, [pushLog]);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    pushLog("info", `[${new Date().toLocaleTimeString()}] Dino cache engine online`);
    void refreshCacheRows();
    void fetchData();
  }, [fetchData, pushLog, refreshCacheRows]);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpiresIn((prev) => (prev > 1000 ? prev - 1000 : 0));
      setCacheRows((prev) =>
        prev.map((row) => ({
          ...row,
          expiresIn: Math.max(0, row.expiresIn - 1000),
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestTimestamps((prev) => prev.filter((stamp) => Date.now() - stamp <= 60_000));
      setTimeline((prev) => prev.filter((event) => Date.now() - event.createdAt <= 9_000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      void refreshCacheRows();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshCacheRows]);

  useEffect(() => {
    if (!autoRun || gameOver) return;

    const interval = setInterval(() => {
      void fetchData();
    }, 4000);

    return () => clearInterval(interval);
  }, [autoRun, fetchData, gameOver]);

  const requestRate = requestTimestamps.length;

  const engineSpeed = useMemo(() => {
    const base = 1 + requestRate / 8 + (loading ? 0.8 : 0);
    const withFocus = focusMode ? base * 0.45 : base;
    return Math.min(6, Math.max(0.65, withFocus));
  }, [focusMode, loading, requestRate]);

  const cacheHitRate = useMemo(() => {
    if (!totalRequests) return 0;
    return ((hitCount + staleCount) / totalRequests) * 100;
  }, [hitCount, staleCount, totalRequests]);

  const avgResponseTime = useMemo(() => {
    if (!totalRequests) return 0;
    return totalResponseMs / totalRequests;
  }, [totalRequests, totalResponseMs]);

  return (
    <main
      className={`${pixelFont.variable} ${monoFont.variable} min-h-screen bg-[radial-gradient(circle_at_top,#1b1b1b,#030303_58%)] px-3 py-5 text-zinc-100 md:px-6 md:py-8`}
    >
      <div className="mx-auto max-w-7xl">
        <div className={`dino-dashboard-shell ${status === "ERROR" ? "error-glitch" : ""}`}>
          <DesertBackground speedFactor={engineSpeed} />
          <GameOverOverlay visible={gameOver} onRestart={restartEngine} />

          <div className="relative z-10 space-y-4 p-4 md:p-6">
            <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="pixel-title text-xs text-cyan-300">Offline Runner // API Caching Ops</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
                  DinoCache Control Grid
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-zinc-300">
                  A live cache engine where every request is gameplay. Hover any cache key to enter
                  focus mode and slow down the track.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-200/25 bg-black/45 px-4 py-2 text-right">
                <p className="pixel-title text-xs text-zinc-400">Score</p>
                <p className="font-mono text-2xl text-cyan-300">{totalRequests.toLocaleString()}</p>
              </div>
            </header>

            <ControlsPanel
              userId={userId}
              setUserId={setUserId}
              autoRun={autoRun}
              setAutoRun={setAutoRun}
              loading={loading}
              onFetch={fetchData}
              onClearCurrent={clearCurrentCache}
            />

            <MetricsGrid
              totalRequests={totalRequests}
              hitRate={cacheHitRate}
              avgResponseTime={avgResponseTime}
              activeCacheKeys={cacheRows.length}
            />

            <section className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
              <div className="space-y-4">
                <DinoEngine
                  speed={engineSpeed}
                  jumpTick={jumpTick}
                  glowTick={glowTick}
                  loading={loading}
                  score={totalRequests}
                  requestRate={requestRate}
                />
                <RequestTimeline events={timeline} speed={engineSpeed} />
              </div>

              <div className="space-y-4">
                <CacheStatusPanel status={status} source={source} expiresIn={expiresIn} />
                <LiveLogs logs={logs} />
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
              <CacheTable
                rows={cacheRows}
                onDelete={removeCacheKey}
                onFocusChange={setFocusMode}
              />

              <div className="glass-panel rounded-2xl border border-white/20 p-4">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-400">
                  <span>Payload Preview</span>
                  <span className="font-mono text-zinc-300">{data.length} rows</span>
                </div>

                <div className="space-y-2">
                  {data.length > 0 ? (
                    data.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-white/10 bg-black/50 px-3 py-2"
                      >
                        <p className="font-mono text-[11px] text-zinc-400">POST #{item.id}</p>
                        <p className="mt-1 text-sm text-zinc-200">{item.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="rounded-lg border border-dashed border-white/15 bg-black/45 px-3 py-6 text-center text-sm text-zinc-500">
                      No payload loaded yet
                    </p>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.15em]">
                  <div className="rounded-md border border-white/10 bg-black/45 px-2 py-2 text-zinc-300">
                    HIT {hitCount}
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/45 px-2 py-2 text-zinc-300">
                    STALE {staleCount}
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/45 px-2 py-2 text-zinc-300">
                    MISS {missCount}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}