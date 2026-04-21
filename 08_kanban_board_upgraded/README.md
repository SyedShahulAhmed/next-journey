
# 🏹 Expedition Kanban Board (Upgraded)

A **Tomb Raider–inspired expedition task board** built with Next.js, React 19, and TypeScript.
This upgraded version delivers a **cinematic UI, fluid drag-and-drop, and immersive task management** — like planning missions in a hidden temple.

---

## 🌄 Overview

This app transforms productivity into an **archaeological expedition**:

* 🏕️ **Camp** → Prep & Supplies
* 🧭 **Exploration** → Active Mission
* 🏆 **Completed** → Recovered Relics
* 🕳️ **Abyss** → Abandoned

Manage your journey by creating, moving, and organizing tasks across these zones — just like navigating dangerous ruins.

---

## ✨ Features

🖱️ **Advanced Drag & Drop**

* Powered by `@dnd-kit/core`
* Reorder tasks within columns
* Move tasks across columns smoothly
* Drop over tasks or empty zones

🧩 **Task Management**

* ➕ Add tasks
* ✏️ Edit tasks
* ❌ Delete tasks

⚡ **Quick Actions**
* Context menu on each task:

  * Edit
  * Move left/right
  * Delete

💾 **Persistence**

* Auto-saves board state in `localStorage`
* Resume your expedition anytime

📱 **Responsive Design**

* Works across mobile, tablet, and desktop

🎬 **Cinematic UI**

* Tomb Raider–inspired visuals
* Animated backgrounds
* Adventure-style interface elements

---

## 🎮 UI Inspiration

🏹 **Tomb Raider**

This project captures the feel of exploration and survival:

* 🪨 Ancient, rugged UI textures
* 🌄 Expedition-style layouts
* 🔥 Atmospheric backgrounds
* 🎒 Mission-driven task flow

The goal: make productivity feel like a **dangerous adventure through lost worlds**.

---

## 🛠️ Tech Stack

* ⚡ Next.js 16 (App Router)
* ⚛️ React 19
* 🟦 TypeScript
* 🎨 Tailwind CSS v4
* 🧲 `@dnd-kit/core` (drag-and-drop)
* 🔷 `lucide-react` (icons)

---

## 🏗️ Project Structure

```id="e7k2p9"
src/
 ├── app/
 │    ├── globals.css      → 🎨 Theme, animations, styles
 │    ├── layout.tsx       → 🧩 App layout
 │    └── page.tsx         → 🧠 Main logic + state

 ├── components/
 │    ├── Board.tsx        → 🧲 DnD context + orchestration
 │    ├── Column.tsx       → 📦 Column UI (droppable zones)
 │    └── TaskCard.tsx     → 🗂️ Draggable task + actions

 └── types/
      └── kanban.ts        → 🧾 Shared types
```

---

## 🚀 Getting Started

### 📋 Prerequisites

* Node.js 20+
* npm / pnpm / yarn / bun

### 📦 Installation

```bash id="p2d8x1"
npm install
```

### ▶️ Run development server

```bash id="m5v9q3"
npm run dev
```

### 🌐 Open in browser

```id="r8c1z6"
http://localhost:3000
```

---

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | 🚧 Start dev server      |
| `npm run build` | 🏗️ Build for production |
| `npm run start` | 🚀 Run production build  |
| `npm run lint`  | 🧹 ESLint checks         |

---

## ⚙️ How It Works

* 🏕️ New tasks start in **Camp**
* 🖱️ Drag over a task → insert before it
* 📦 Drag into empty column → move to that column
* ⚡ Use task menu for quick actions
* 💾 Data saved under `kanban-tasks` in localStorage



