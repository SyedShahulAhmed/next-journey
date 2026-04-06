# 🍅 Pomodoro Timer

A **cinematic Pomodoro timer** with immersive focus cycles, ambient atmosphere effects, and a polished UI.
Built using **Next.js (App Router)** ⚡ + **Tailwind CSS** 🎨

---

## ✨ Features

⏱️ **Smart Timer Modes**

* 🍅 Focus mode
* ☕ Short break
* 🌙 Long break (auto-triggered)

🔁 **Automation & Flow**

* Automatic switching between sessions
* Session counter with long-break intervals

🎮 **Controls**

* ▶️ Start / ⏸ Pause / 🔄 Reset
* ⌛ Custom time adjustments

⚙️ **Settings Panel**

* Modify focus & break durations
* Adjust long-break interval

🌌 **Ambient Experience**

* 🌧 Rain effect
* ❄️ Snow effect
* ✨ Starfield
* 🎥 Optional animated backgrounds

💡 **Motivation System**
* Rotating inspirational quotes while timer runs

🕒 **Clock Options**

* 12h / 24h format toggle

💾 **Persistence**

* Saves:

  * Timer state
  * Mode
  * Settings
  * Background
* Uses localStorage for seamless experience

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
 └── page.tsx        → 🧠 Core timer logic + UI layout

📁 components/
 └── UI components   → 🎛 Timer ring, controls, settings, effects

📁 data/
 ├── quotes.ts       → 💬 Motivational quotes
 └── gifs.ts         → 🎥 Background assets
```

---

## 🎨 Customization

🛠️ Easily personalize your experience:

* ⏱ Update durations in **settings modal**
* 🎥 Add custom backgrounds → `data/gifs.ts`
* 💬 Add/edit quotes → `data/quotes.ts`

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

This isn’t just a timer — it’s a **focus environment**:

* 🎧 Reduces distractions
* 🎯 Improves deep work sessions
* 🌌 Creates a calming workspace vibe

---