

# 🖥️ Password Vault

A **Watch Dogs–inspired password vault UI** built with Next.js, delivering a **live hacking dashboard experience** with glitch effects, scanlines, and system-style animations.

This isn’t just a vault — it feels like you're **breaching a secure network interface**.

Built with **Next.js (App Router)** ⚡, **React** ⚛️, **Tailwind CSS** 🎨, and **Framer Motion** 🎬

---

## 🎮 UI Inspiration

🕶️ **Watch Dogs**

This project replicates the signature hacker aesthetic:

* 🟩 Terminal-style UI with neon highlights
* 📡 System logs and animated status indicators
* ⚡ Glitch effects and flickering text
* 🖥️ Surveillance/dashboard-style layouts

The goal: make password management feel like operating a **real hacking system**.

---

## ✨ Features

🔐 **Lock Screen Experience**

* Animated typing headline
* Neon-styled password input
* Immersive entry into the system

🗂️ **Vault Dashboard**

* Split layout:

  * 📋 Password list
  * 📄 Details view

🎬 **Advanced UI Effects**

* Glitch hover effects
* Flicker text animations
* Pulse glow highlights
* Scanline overlay

📡 **System Feedback**

* Animated status banners
* Background live log simulation

👁️ **Password Controls**

* Mask / reveal with animation
* Copy to clipboard
* Delete entries

📱 **Responsive Design**

* Works across desktop and mobile
* Smooth, adaptive layout

---

## 🛠️ Tech Stack

* ⚡ Next.js (App Router)
* ⚛️ React
* 🎨 Tailwind CSS v4
* 🎬 Framer Motion
* 🔷 Lucide React (icons)
* 🔤 Share Tech Mono (Google Font)

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="wd1x8p"
npm install
```

### ▶️ Run development server

```bash id="wd7k3m"
npm run dev
```

### 🌐 Open in browser

```id="wd9c2z"
http://localhost:3000
```

---

## 📜 Scripts

```bash id="wd-scripts"
npm run dev     # 🚧 development server
npm run build   # 🏗️ production build
npm run start   # 🚀 run production
npm run lint    # 🧹 lint checks
```

---

## 🏗️ Project Structure

```text id="wd-structure"
src/
 ├── app/
 │    ├── page.tsx         → 🧠 Main UI + interactions
 │    ├── layout.tsx       → 🧩 Root layout + font setup
 │
 ├── styles/
 │    └── globals.css      → 🎨 Tailwind + custom UI effects
 │
 ├── lib/
 │    └── helpers          → 🔐 Crypto + auth utilities
 │
 └── types/
      └── password types   → 🧾 Data models
```

---

## 🧠 How It Works

* 🔐 Master password is hashed and stored locally
* 🗂️ Vault entries stored in `localStorage`
* ⚡ UI interactions simulate a live system environment
* 🎬 Animations enhance feedback and immersion

---
