
# ⚔️ Jedi CMS — Holographic Blog Console

A **cinematic fullstack Blog CMS** inspired by the advanced holographic interfaces of **🎮 Star Wars Jedi: Survivor**.
Manage content like a Jedi operating a **high-tech control deck** — glowing panels, fluid motion, and immersive system feedback.

Built with **Next.js (App Router)** ⚡, **React 19** ⚛️, and **MongoDB** 🍃

---

## 🌌 UI Inspiration

⚔️ **Star Wars Jedi: Survivor**

This project recreates the feel of futuristic Jedi systems:

* 🟦 Holographic glass panels with neon glow
* ✨ Layered UI depth + scanline overlays
* 📡 Ambient particles and aurora backgrounds
* 🎬 Cinematic transitions and motion

The goal: turn a CMS into a **sci-fi command console**.

---

## ✨ Highlights

🟦 **Holographic UI System**

* Glassmorphism panels with glowing borders
* Scanlines + subtle distortion effects
* Layered depth for immersive visuals

🎬 **Cinematic Motion**

* Smooth page transitions
* Hover tilt + micro-interactions
* Responsive animations across flows

📱 **Responsive Layout**

* Adaptive feed grid
* Seamless editor experience

🧠 **Fullstack Capability**

* End-to-end CRUD API
* MongoDB-backed persistence

⚡ **Robust UX States**

* Loading shimmer
* Empty states
* Success toasts
* Error alerts

---

## 🚀 Features

📰 **Holo Feed**

* Animated blog cards
* Shimmer loading effects
* Responsive grid layout

📄 **Post Detail View**

* Clean reading experience
* Neon action controls

✍️ **Create / Edit System**

* Focused input states
* Smooth transitions
* Structured editing flow

🔔 **Feedback System**

* Toast notifications for success
* Alert panels for errors

🌌 **Ambient Effects**

* Aurora backgrounds
* Scanlines
* Floating particles

---

## 🛠️ Tech Stack

* ⚡ Next.js 16 (App Router)
* ⚛️ React 19
* 🎨 Tailwind CSS v4
* 🎬 Framer Motion
* 🔷 Lucide React
* 🍃 MongoDB + Mongoose

---

## 🏗️ Project Structure

```text id="jedi4-structure"
src/
 ├── app/
 │    ├── (public)/
 │    │    ├── page.tsx              → 📰 Feed
 │    │    └── post/[id]/page.tsx    → 📄 Post detail
 │    │
 │    ├── dashboard/
 │    │    ├── page.tsx              → 🧠 Dashboard
 │    │    ├── create/page.tsx       → ✍️ Create post
 │    │    └── edit/[id]/page.tsx    → ✏️ Edit post
 │    │
 │    ├── api/blogs/route.ts         → 🌐 API routes
 │    └── layout.tsx                 → 🧩 Root layout
 │
 ├── components/
 │    ├── AppShell.tsx               → 🖥️ Layout wrapper
 │    ├── BlogCard.tsx               → 📰 Feed card
 │    ├── HoloAlert.tsx              → ⚠️ Error UI
 │    └── HoloToast.tsx              → 🔔 Success UI
 │
 ├── lib/
 │    └── mongoDb.ts                → 🍃 Database connection
 │
 ├── models/
 │    └── Blog.ts                   → 🧾 Data schema
 │
 └── styles/
      └── globals.css              → 🎨 UI system + effects
```

---

## 🔌 API

📡 **Base Path:** `/api/blogs`

| Method   | Endpoint         | Description         |
| -------- | ---------------- | ------------------- |
| `GET`    | `/api/blogs`     | 📥 List all logs    |
| `POST`   | `/api/blogs`     | ➕ Create new log    |
| `GET`    | `/api/blogs/:id` | 📄 Fetch single log |
| `PUT`    | `/api/blogs/:id` | ✏️ Update log       |
| `PATCH`  | `/api/blogs/:id` | 🧩 Partial update   |
| `DELETE` | `/api/blogs/:id` | ❌ Delete log        |

---

## 🔐 Environment Variables

Create `.env.local`:

```bash id="jedi4-env"
MONGODB_URI=your_mongodb_connection_string
```

---

## 🚀 Running Locally

### 📦 Install dependencies

```bash id="jedi4-install"
npm install
```

### ▶️ Start dev server

```bash id="jedi4-dev"
npm run dev
```

### 🌐 Open app

```id="jedi4-open"
http://localhost:3000
```

---

## 📜 Scripts

| Command         | Description          |
| --------------- | -------------------- |
| `npm run dev`   | 🚧 Start dev server  |
| `npm run build` | 🏗️ Production build |
| `npm run start` | 🚀 Run production    |
| `npm run lint`  | 🧹 Lint code         |

---

## 🧠 How It Works

* 📡 API routes handle full CRUD operations
* 🍃 MongoDB stores blog data persistently
* 🎬 UI driven by motion + layered effects
* ⚡ State updates reflect instantly across views

---

