# 📖 ORV Scenario Expense Tracker

A **production-ready expense tracker** inspired by the world of **🎮 Omniscient Reader’s Viewpoint (ORV)** — where finances become survival resources inside a scenario system.

Built with **Next.js App Router** ⚡, secure JWT authentication 🔐, and a **cinematic monochrome UI** inspired by ORV’s constellation terminals, scenario windows, and dark narrative atmosphere.

---

## 🌌 UI Inspiration

📖 **Omniscient Reader’s Viewpoint**

This project recreates the feeling of interacting with a **Scenario Interface** inside ORV:

* ⚫ Monochrome, high-contrast system UI
* 📜 Scenario-window styled panels
* ✨ Subtle glow and terminal overlays
* 🌌 Constellation-inspired dashboard atmosphere
* 🎬 Cinematic transitions and slow-motion interactions

The goal: make expense management feel like managing **coins and survival resources during a scenario**.

---

## ✨ Features

🔐 **Secure Authentication**

* Signup / Login / Logout system
* JWT stored in **HTTP-only cookies**
* Protected routes using middleware

💰 **Expense & Income Tracking**

* Add, update, and delete transactions
* Track both income and expenses
* Organized category system

📊 **Scenario Analytics**

* Pie chart summaries
* Bar chart breakdowns
* Real-time financial insights

🛡️ **Protected Dashboard**

* Auth-guarded scenario console
* Redirect handling based on auth state

🎬 **Premium UI Experience**

* ORV-inspired monochrome visuals
* Smooth Framer Motion transitions
* Minimal yet cinematic layout

🍃 **Persistent Database**

* MongoDB + Mongoose integration
* Full CRUD transaction support

---

## 🛠️ Tech Stack

* ⚡ Next.js 16 
* 🎨 Tailwind CSS v4
* 🍃 MongoDB + Mongoose
* 🔐 JWT (`jsonwebtoken`)
* 🔒 `bcryptjs` for password hashing
* 📊 Recharts
* 🎬 Framer Motion

---

## 🧭 Routes

### 🌐 UI Routes

| Route        | Description                   |
| ------------ | ----------------------------- |
| `/`          | 🌌 Landing page               |
| `/login`     | 🔐 Sign in                    |
| `/signup`    | 📝 Create account             |
| `/dashboard` | 📊 Protected scenario console |

---

### 🔌 API Routes

| Method   | Endpoint                | Description               |
| -------- | ----------------------- | ------------------------- |
| `POST`   | `/api/auth/signup`      | 📝 Create user            |
| `POST`   | `/api/auth/login`       | 🔐 Authenticate + set JWT |
| `POST`   | `/api/auth/logout`      | 🚪 Clear session          |
| `GET`    | `/api/auth/me`          | 👤 Current user           |
| `GET`    | `/api/transactions`     | 📥 Fetch transactions     |
| `POST`   | `/api/transactions`     | ➕ Create transaction      |
| `PUT`    | `/api/transactions/:id` | ✏️ Update transaction     |
| `DELETE` | `/api/transactions/:id` | ❌ Delete transaction      |

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash
npm install
```

---

### 🔐 Configure environment

Create `.env.local`:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### ▶️ Run the app

```bash
npm run dev
```

### 🌐 Open in browser

```text
http://localhost:3000
```

---

## 📜 Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `npm run dev`   | 🚧 Start local dev server |
| `npm run build` | 🏗️ Production build      |
| `npm run start` | 🚀 Run production server  |
| `npm run lint`  | 🧹 Lint checks            |

---

## 🏗️ Folder Structure

```text
src/
 ├── app/
 │    ├── api/              → 🌐 API routes
 │    ├── dashboard/        → 📊 Protected dashboard
 │    ├── login/            → 🔐 Login flow
 │    └── signup/           → 📝 Signup flow
 │
 ├── components/            → 🧩 Reusable UI
 ├── hooks/                 → ⚡ Custom hooks
 ├── lib/                   → 🔧 Utilities + auth helpers
 ├── models/                → 🍃 Database schemas
 └── styles/                → 🎨 Global styles
```

---

## 🔐 Authentication Notes

* Uses an **HTTP-only cookie** named `token`
* Middleware protects `/dashboard`
* Automatic redirect behavior based on auth state

---

## 🧠 How It Works

* 🔐 JWT handles session authentication
* 🍃 MongoDB stores users + transactions
* 📊 Recharts visualizes financial summaries
* 🎬 Framer Motion powers cinematic interactions
* ⚡ Middleware validates access to protected pages

---


