
# 🦖 DinoCache Dashboard
A **futuristic SaaS dashboard** inspired by the iconic **Chrome Dino Game**, reimagined as a **real-time API caching developer tool**.

This project transforms backend caching into a **playable system** — where every API event becomes part of a dynamic runner experience.

Built with **Next.js (App Router)** ⚡, **React 19** ⚛️, **TypeScript** 🟦, **Tailwind CSS** 🎨, and **Framer Motion** 🎬

---

## 🎮 UI Inspiration

🦖 **Chrome Dino Game**

This dashboard reinterprets the classic endless runner into a developer tool:

* 🏜️ Infinite desert with side-scrolling motion
* 🦖 Dino reacts to API events in real-time
* 🌵 Obstacles represent cache behavior
* ⚡ Game mechanics mapped to system performance

The goal: turn debugging APIs into a **visual, interactive experience**.

---

## ✨ Key Features

### 🏃‍♂️ Live Runner Experience

* 🏜️ Infinite scrolling desert + moving ground lines
* 🌌 Parallax layers + CRT scanline effect
* 🎨 Pixel-art + glassmorphism hybrid UI
* 📈 Real-time score based on processed requests

---

### 🎯 Cache Gameplay Mapping

* 💎 **Cache Hit** → Dino glow + gem event
* 🌵 **Cache Miss** → Dino jump + cactus obstacle
* 🐦 **Stale Cache** → Bird event
* 💀 **API Error** → Skull + glitch + game over

---

### 📊 SaaS Dashboard Modules

📦 **Cache Status Panel**

* Animated states: HIT / MISS / STALE

📉 **Metrics Cards**

* 📊 Total Requests
* ⚡ Cache Hit Rate
* ⏱ Average Response Time
* 🧠 Active Cache Keys

🧾 **Request Timeline**

* Horizontal event stream (real-time movement)

📜 **Live Logs**

* Terminal-style typing stream

🗂️ **Cache Table**

* TTL countdown bars
* Delete actions per key

---

### 🎮 Interactions

* 🔄 Auto-run mode for continuous simulation
* 🐢 Hover focus mode (slowdown effect)
* 💥 Delete key → obstacle destroy feedback
* 🔁 Restart button after game over

---

## 🏗️ Project Structure

```text id="dino-structure"
src/
 ├── app/
 │    ├── api/
 │    │    ├── cache/route.ts
 │    │    └── data/route.ts
 │    ├── globals.css        → 🎨 Theme + effects
 │    ├── layout.tsx         → 🧩 Layout
 │    └── page.tsx           → 🧠 Main dashboard logic
 │
 ├── components/
 │    └── dino-dashboard/
 │         ├── CacheStatusPanel.tsx
 │         ├── CacheTable.tsx
 │         ├── ControlsPanel.tsx
 │         ├── DesertBackground.tsx
 │         ├── DinoEngine.tsx
 │         ├── GameOverOverlay.tsx
 │         ├── LiveLogs.tsx
 │         ├── MetricsGrid.tsx
 │         ├── RequestTimeline.tsx
 │         └── types.ts
 │
 └── lib/
      └── cache.ts           → ⚙️ In-memory caching logic
```

---

## 🔌 API Endpoints

### 📥 GET `/api/data`

Fetches data with caching behavior.

**Query Params:**

* `userId` → `all` or numeric

**Behavior:**

* ⚡ No cache → fetch fresh API data
* 💎 Valid cache → return cached data
* 🐦 Near expiry → return stale + background refresh

---

### 📦 GET `/api/cache`

Returns all cache entries:

* key
* cachedAt
* expiry
* expiresIn

---

### ❌ DELETE `/api/cache?key=<cache-key>`

Deletes a specific cache entry.

---

## 🚀 Local Development

### 📦 Install dependencies

```bash id="d1k9x3"
npm install
```

### ▶️ Run dev server

```bash id="z8m4q7"
npm run dev
```

### 🌐 Open app

```id="p5r2c1"
http://localhost:3000
```

---

## 📜 Scripts

```bash id="scripts-dino"
npm run dev     # 🚧 dev server
npm run lint    # 🧹 lint
npm run build   # 🏗️ build
npm run start   # 🚀 production
```

---

## 🧪 Demo Tips

* 🔢 Use `userId`: `all`, `1`, `2`, `3` → create unique cache keys
* 💀 Use `fail` → simulate API failure → trigger game over
* 🔄 Enable Auto-run → stress-test system + speed scaling





