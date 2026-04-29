# 📓 Survivor Journal

A **post-apocalyptic journal app** inspired by the haunting world of **🎮 The Last of Us**.
Designed to feel like a survivor documenting memories in a broken world — worn pages, faded ink, and quiet moments between chaos.

Built with **Next.js** ⚡, and **Tailwind CSS** 🎨

---

## 🌿 UI Inspiration

🧟 **The Last of Us**

This project captures the raw, grounded aesthetic of survival:

* 📜 Worn paper textures with grain and aging
* 🌫️ Muted greens, rust tones, and low saturation
* 🕯️ Subtle flickers and cinematic transitions
* ✍️ Handwritten-style titles with raw typography

The goal: create a **deeply atmospheric journaling experience**, not just another notes app.

---

## ✨ Features

📝 **Journal System**

* Add, edit, and delete entries
* Each entry includes:

  * 📌 Title
  * 📖 Content
  * 🏷️ Tags

📅 **Calendar View**

* Journal-style calendar layout
* Select days to view entries
* Visual highlights for active days

🔍 **Search & Filters**

* Filter by:

  * Text
  * Tags
  * Date

📤 **Export**

* Export entries as a text file

💾 **Offline Support**

* Data stored in `localStorage`
* Works without internet

🧠 **Hydration-Safe Dates**

* Consistent formatting using `en-GB`
* Avoids SSR/client mismatches

---

## 🎬 UI Highlights

* 📜 Paper grain textures + vignette overlays
* 🎞️ Cinematic fade-in + page-flip animations
* ✍️ Handwritten title font + monospace body
* 🌫️ Slow, atmospheric hover interactions

---

## 🛠️ Tech Stack

* ⚡ Next.js (App Router)
* ⚛️ React
* 🎨 Tailwind CSS v4
* 🔤 `next/font` (optimized fonts)

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="j4k8n2"
npm install
```

### ▶️ Start dev server

```bash id="m1z9x5"
npm run dev
```

### 🌐 Open in browser

```id="p7c3v8"
http://localhost:3000
```

---

## 🏗️ Project Structure

```text id="journal-structure"
src/
 ├── app/
 │    └── page.tsx            → 🧠 Layout + calendar + entry flow
 │
 ├── components/
 │    ├── EntryForm.tsx       → ✍️ Journal entry form
 │    └── EntryList.tsx       → 📜 Entry cards + empty state
 │
 ├── lib/
 │    └── date.ts             → 📅 Date formatting utilities
 │
 └── styles/
      └── globals.css         → 🎨 Animations + base styles
```

---

## 🧠 How It Works

* 📓 Entries stored in browser via `localStorage`
* 📅 Calendar highlights days with entries
* 🔍 Filters dynamically update visible entries
* 📤 Export generates a text file from stored data

