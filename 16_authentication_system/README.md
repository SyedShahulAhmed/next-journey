
# 🩸 Path of the Silent Blade

A **cinematic authentication system** inspired by the world of **🎮 Ghost of Tsushima**, blending secure backend logic with a **minimal, shadow-heavy, blood-moon UI**.

Step into the role of a silent warrior — where every login feels like entering a sacred battlefield.

Built with **Next.js** ⚡, **TypeScript** ⚛️, and **MongoDB** 🍃

---

## 🌕 UI Inspiration

⚔️ **Ghost of Tsushima**

This project captures the calm, deadly elegance of feudal Japan:

* 🌕 Blood-moon lighting with deep shadows
* 🌫️ Fog layers and drifting ash particles
* 🖌️ Ink-wash inspired UI elements
* 🎬 Slow, cinematic motion transitions

The goal: turn authentication into a **ritual-like experience**, not a basic form.

---

## ✨ Features

🔐 **Authentication System**

* Email/password login & signup
* JWT stored in **httpOnly cookies**
* Secure session handling

🛡️ **Protected Routes**

* `/dashboard` secured via Next.js middleware
* Requires valid auth token

🎬 **Cinematic UI**

* Blood-moon theme with layered atmosphere
* Smooth Framer Motion transitions
* Minimalist, immersive interface

🔔 **Feedback System**

* Toast-based error messages
* Styled to match the cinematic theme

🍃 **Database Integration**

* MongoDB with Mongoose
* Persistent user data

---

## 🛠️ Tech Stack

* ⚡ Next.js (App Router)
* ⚛️ React + TypeScript
* 🎨 Tailwind CSS v4
* 🎬 Framer Motion
* 🔷 Lucide React (icons)
* 🍃 MongoDB + Mongoose
* 🔐 JWT + bcrypt

---

## 🧭 Pages

| Route        | Description                  |
| ------------ | ---------------------------- |
| `/`          | 🌄 Cinematic landing page    |
| `/login`     | 🔐 Login experience          |
| `/signup`    | 📝 Registration flow         |
| `/dashboard` | 🛡️ Protected command center |

---

## 🔌 API Routes

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| `POST` | `/api/auth/signup` | 📝 Create user               |
| `POST` | `/api/auth/login`  | 🔐 Authenticate + set cookie |
| `POST` | `/api/auth/logout` | 🚪 Clear session             |
| `GET`  | `/api/auth/me`     | 👤 Get current user          |

---

## 🔐 Environment Variables

Create `.env.local`:

```bash id="blade-env"
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
```

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="blade-install"
npm install
```

### ▶️ Run development server

```bash id="blade-dev"
npm run dev
```

### 🌐 Open app

```id="blade-open"
http://localhost:3000
```

---

## 📜 Scripts

```bash id="blade-scripts"
npm run dev     # 🚧 dev server
npm run build   # 🏗️ production build
npm run start   # 🚀 run production
npm run lint    # 🧹 lint checks
```

---

## 🧠 How It Works

* 🔐 JWT token stored in **httpOnly cookie**
* 🛡️ Middleware validates token for protected routes
* 🍃 MongoDB stores user credentials securely
* 🎬 UI reacts with cinematic feedback for user actions

---


