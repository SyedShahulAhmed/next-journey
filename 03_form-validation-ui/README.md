# 🧠 Form Validation UI

A **sci-fi styled form validation interface** with real-time feedback, smooth animations, and reusable logic.
Inspired by the futuristic UI of **🎮 Detroit: Become Human**, delivering a cinematic, HUD-like experience.

Built with **Next.js (App Router)** ⚡, **Tailwind CSS** 🎨, and **Framer Motion** 🎬

---

## ✨ Features

⚡ **Real-Time Validation**

* Instant field validation with inline error messages
* No waiting for submit

✅ **Smart Feedback System**

* Success indicators for valid inputs
* Error states with smooth transitions

🔐 **Password Intelligence**

* Confirm password matching
* Strength rules (secure input guidance)

🚀 **Submit Experience**

* Simulated async loading state
* Smooth feedback animations

🧩 **Reusable Architecture**

* Custom `useForm` hook:

  * Values
  * Errors
  * Touched state
* Easily reusable across projects

🎬 **Cinematic UI**

* HUD-style interface inspired by **Detroit: Become Human**
* Animated entry transitions
* Futuristic glow, grids, and system feedback visuals

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run development server

```bash
npm run dev
```

### 🌐 Open in browser

```
http://localhost:3000
```

---

## 🏗️ Project Structure

```
📁 app/
 └── page.tsx         → 🧠 UI + validation rules

📁 hooks/
 └── useForm.ts       → 🧩 Reusable form logic (state + validation)

📁 app/
 └── globals.css      → 🎨 HUD theme, typography, animations
```

---

## 🎨 UI Inspiration

🎮 **Detroit: Become Human**

This project replicates key design elements from the game:

* 🟦 Clean futuristic panels
* ✨ Subtle glowing borders
* 📡 System-style feedback animations
* 🧠 AI / HUD-like interaction feel

The goal: make form validation feel like a **next-gen system interface**, not a boring input form.

---

## 🎯 Customization

🛠️ Extend and tweak easily:

* ➕ Add new validation rules inside `useForm.ts`
* 🎨 Modify HUD theme in `globals.css`
* 🎬 Enhance animations using Framer Motion
* 🧩 Reuse `useForm` across multiple forms

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

This isn’t just form validation — it’s a **UX upgrade**:

* 🎯 Makes validation intuitive
* 🎬 Adds emotional & visual feedback
* 🧠 Demonstrates reusable architecture
* 🎮 Feels like interacting with a futuristic system



