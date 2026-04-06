# 🔐 Password Generator

A **soft, modern password generator** with real-time strength feedback, flexible customization, and seamless UX.
Built with **Next.js (App Router)** ⚡ + **Tailwind CSS** 🎨

---

## ✨ Features

🔢 **Custom Length Control**

* Slider range from **6 → 50 characters**

🎛️ **Character Options**

* 🔠 Uppercase letters
* 🔡 Lowercase letters
* 🔢 Numbers
* 🔣 Symbols

🔒 **Secure Generation**

* Uses **`crypto.getRandomValues`** for cryptographically strong randomness

📊 **Strength Meter**

* Visual strength indicator
* 💡 Actionable feedback chips (improve weak passwords instantly)

⚡ **Smart UX**

* Auto-regenerates password when settings change
* No manual refresh needed

📋 **One-Click Copy**

* Copy password instantly
* ✅ Confirmation feedback state

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
 └── page.tsx        → 🧠 Core generator logic + strength algorithm + UI

📁 app/
 └── globals.css     → 🎨 Custom styles (range slider, UI polish)
```

---

## 🎨 Customization

🛠️ Easily tweak the generator:

* 🔢 Adjust default length range in logic
* 🎨 Customize slider styles → `globals.css`
* 📊 Improve strength rules (entropy, patterns, scoring logic)
* 🔣 Add new character sets or rules

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

This isn’t just a generator — it’s a **secure UX-focused tool**:

* 🔐 Promotes strong password habits
* ⚡ Instant feedback improves security awareness
* 🎯 Clean, distraction-free interface

---

