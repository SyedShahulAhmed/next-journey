
# 🌌 API Basics

A **Next.js API playground** with a cinematic UI inspired by **🎮 Death Stranding**, performing full CRUD operations on a MongoDB-backed `users` collection.
Designed to feel like interacting with a **futuristic data terminal**.

Built with **Next.js (App Router)** ⚡, **MongoDB** 🍃, **Tailwind CSS** 🎨, **Framer Motion** 🎬, and **Lucide Icons** 🔷

---

## ✨ Features

🌐 **REST API System**

* Full CRUD operations:

  * 📥 `GET` → Fetch users
  * ➕ `POST` → Create user
  * ✏️ `PUT` → Update user
  * ❌ `DELETE` → Remove user

🧪 **Test Endpoint**

* `/api/hello` for quick API checks

🖥️ **Interactive UI**

* Create, edit, and delete users visually
* Smooth animated transitions

🍃 **Database Integration**

* MongoDB connection via `MONGODB_URI`
* Persistent data storage

🎬 **Cinematic Experience**

* Death Stranding-inspired UI
* Minimal, holographic, terminal-like design
* Smooth motion and glowing system feedback

---

## 🎮 UI Inspiration

🌌 **Death Stranding**

This project reflects the game’s unique interface style:

* ⚫ Dark, minimal UI layers
* 🔷 Holographic panels & glowing accents
* 📡 System-terminal interaction feel
* 🎬 Smooth, deliberate animations

The goal: make working with APIs feel like operating a **futuristic network system**.

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="x2k9lq"
npm install
```

### 🔐 Setup environment variables

Create a `.env.local` file:

```bash id="v8s2jd"
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
```

### ▶️ Run development server

```bash id="r4p7mw"
npm run dev
```

### 🌐 Open in browser

```id="d1c9hf"
http://localhost:3000
```

---

## 🔌 API Routes

| Method   | Endpoint         | Description        |
| -------- | ---------------- | ------------------ |
| `GET`    | `/api/hello`     | 👋 Test endpoint   |
| `GET`    | `/api/users`     | 📥 Fetch all users |
| `POST`   | `/api/users`     | ➕ Create user      |
| `PUT`    | `/api/users/:id` | ✏️ Update user     |
| `DELETE` | `/api/users/:id` | ❌ Delete user      |

---

## 🏗️ Project Structure

```id="l7n3vx"
📁 src/app/
 └── page.tsx                  → 🧠 UI + API interaction logic

📁 src/app/api/
 ├── hello/route.ts            → 👋 Sample endpoint
 ├── users/route.ts            → 📥 GET + ➕ POST
 └── users/[id]/route.ts       → ✏️ PUT + ❌ DELETE

📁 src/lib/
 └── mongodb.ts                → 🍃 Database connection
```

---

## 🎨 Customization

🛠️ Extend your system:

* 🧩 Add new API routes (auth, roles, permissions)
* 🎨 Enhance UI effects (glow, grid, scanlines)
* 📡 Integrate real-time updates (WebSockets)
* 🗂️ Expand schema (profiles, metadata, roles)

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

This isn’t just API practice — it’s a **developer experience upgrade**:

* 🧠 Learn full-stack CRUD workflows
* 🌐 Understand API architecture in Next.js
* 🎬 Experience cinematic UI for dev tools
* ⚡ Bridge backend logic with frontend UX

---

