
# 🧱 Kanban Board

A **Minecraft-inspired kanban board** with drag-and-drop interactions, undo/redo history, biome themes, and immersive sound effects.
Designed to feel like managing tasks inside a **blocky, game-like world**.

Built with **Next.js (App Router)** ⚡, **Tailwind CSS** 🎨, and **Framer Motion** 🎬

---

## ✨ Features

📋 **Task Management**

* Add tasks and organize across:

  * 🟩 Todo
  * 🟨 In Progress
  * 🟦 Completed

🖱️ **Drag & Drop System**

* Smoothly move tasks between columns
* Reorder within columns effortlessly

⏪ **Undo / Redo History**

* Track up to **50 actions**
* Instantly revert or replay changes

🌍 **Biome Themes**

* 🌿 Overworld
* 🌲 Forest
* 🌙 Night
* 🔥 Nether

🔊 **Immersive Sound Effects**

* Toggleable UI sounds
* Game-like feedback for actions (drag, drop, swap, etc.)

💾 **Persistence**

* Saves board state using localStorage
* Continue where you left off

---

## 🎮 UI Inspiration

🧱 **Minecraft**

This project brings Minecraft-like aesthetics into productivity:

* 🟫 Blocky layout and pixel-style feel
* 🌍 Biome-based themes
* 🔊 Game-inspired interaction sounds
* 🎮 Playful yet functional UX

The goal: turn task management into a **fun, game-like experience** instead of a boring board.

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="n1w6b4"
npm install
```

### ▶️ Run development server

```bash id="q9s7x2"
npm run dev
```

### 🌐 Open in browser

```id="z7xk3p"
http://localhost:3000
```

---

## 🏗️ Project Structure

```id="6mf3y1"
📁 src/app/
 └── page.tsx        → 🧠 Board logic, drag-drop, history system

📁 src/app/
 └── globals.css     → 🎨 Minecraft-inspired styles & animations

📁 public/sounds/
 └── audio files     → 🔊 UI interaction sounds
```

---

## 🎨 Customization

🛠️ Make it your own:

* 🌍 Add new biome themes (colors, backgrounds, effects)
* 🔊 Replace sounds in `public/sounds/`
* 🧩 Modify task structure (priority, tags, deadlines)
* 🎮 Enhance animations with Framer Motion

---

## 📜 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | 🚧 Start dev server      |
| `npm run build` | 🏗️ Build for production |
| `npm run start` | 🚀 Run production build  |
| `npm run lint`  | 🧹 Lint code             |

---

## 🌟 Why This Project?

This isn’t just a kanban board — it’s a **gamified productivity tool**:

* 🎮 Makes task management enjoyable
* ⚡ Encourages interaction and flow
* 🧠 Demonstrates advanced state handling (history system)
* 🎨 Shows creative UI + UX thinking

---


