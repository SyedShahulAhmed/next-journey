

# ⚔️ Battle Arena Quiz Game

An **immersive combat-style quiz game** where every question is a battle.
Face off against enemies, manage HP, beat the timer, and prove your knowledge in the arena.

Built with **Next.js** ⚡, **React** ⚛️, and **Tailwind CSS** 🎨

---

## 🏟️ Overview

Step into the arena where knowledge = power:

* ❤️ **Player vs Enemy HP system**
* ⏱️ Timed combat rounds (quiz questions)
* ⚡ High-impact visual feedback for every action
* 🏆 Victory / defeat end screens

Each question isn’t just a choice — it’s an **attack, defense, or missed opportunity**.

---

## ✨ Features

⚔️ **Combat-Based Quiz System**

* Each question = a battle phase
* Correct answer → damage enemy
* Wrong answer → take damage

❤️ **HP Mechanics**

* Player and enemy health bars
* Pulse + sheen animations for impact

⏱️ **Dynamic Timer**

* Circular countdown (30s per question)
* 🚨 Critical alerts when time is low

🎬 **Cinematic Feedback**

* ✨ Glow burst on correct answer
* 💥 Screen shake on wrong answer
* ⚡ Flash effects + XP float animations

🔄 **Smooth Transitions**

* Seamless movement between questions
* Button micro-interactions for responsiveness

🏆 **Result Screen**

* Victory / defeat emphasis
* Clear performance feedback

💾 **Session Persistence**

* Progress saved in localStorage
* Resume gameplay on refresh

---

## 🎮 UI Style

⚔️ **Battle Arena Theme**

This project delivers a high-energy, game-inspired interface:

* 🌌 Animated backgrounds + particles
* 🌑 Vignette effects for focus
* 🔥 Combat-style UI feedback
* ⚡ Fast, responsive interactions

The goal: make quizzes feel like **intense battles**, not boring forms.

---

## 🛠️ Tech Stack

* ⚡ Next.js (App Router)
* ⚛️ React
* 🎨 Tailwind CSS
* 🔤 Google Fonts:

  * Orbitron (futuristic headings)
  * Exo 2 (clean readability)

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="bq1x9m"
npm install
```

### ▶️ Run development server

```bash id="z7r2k4"
npm run dev
```

### 🌐 Open in browser

```id="y5c8p3"
http://localhost:3000
```

---

## 🎮 Gameplay

* ⏱️ Each question starts with **30 seconds**

* 🎯 Select an answer:

  * Locks input
  * Shows feedback
  * Advances automatically

* ⌛ Timeout:

  * Auto-advances to next question

* ❤️ HP updates based on performance

* 🏆 Final result determines victory or defeat

---

## 🏗️ Folder Structure

```text id="arena-structure"
src/
 ├── app/
 │    ├── page.tsx          → 🏠 Entry / landing
 │    ├── quiz/page.tsx     → ⚔️ Main gameplay logic
 │    ├── result/page.tsx   → 🏆 Result screen
 │    └── globals.css       → 🎨 Theme + effects
 │
 └── components/
      ├── QuestionCard.tsx  → 🧩 Question UI
      └── ProgressBar.tsx   → ❤️ HP / progress system
```

---

## 🧠 How It Works

* 🧠 Game state managed in React
* 💾 Progress stored in localStorage
* ⚡ UI updates driven by state transitions
* 🎬 Animations handled via CSS + transitions

---



