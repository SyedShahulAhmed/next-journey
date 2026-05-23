# 💼 Job Tracker

A **full-stack job application tracker** built with the **Next.js App Router**, featuring secure authentication, analytics dashboards, and a premium productivity-focused UI.

Track applications, interviews, and offers through a clean, modern workspace designed to feel like a **personal career command center**.

Built with **Next.js** ⚡, **MongoDB** 🍃

---

## 🌌 Platform Experience

Job Tracker is designed like a modern productivity SaaS:

* 📊 Analytics-driven dashboard
* 🧠 Focused workflow management
* ⚡ Smooth interactions and motion
* 🖥️ Responsive multi-panel layout
* 🎬 Subtle cinematic UI polish

The goal: make job hunting feel **organized, strategic, and motivating** instead of overwhelming.

---

## ✨ Features

🔐 **Authentication System**

* Email/password signup & login
* JWT-based session cookies
* Protected routes via middleware

💼 **Job Management**

* Create, edit, and delete applications
* Track statuses:

  * Applied
  * Interview
  * Offer
  * Rejected

🔍 **Filtering & Organization**

* Filter jobs dynamically
* Organize applications efficiently

📊 **Analytics Dashboard**

* Status breakdown charts
* Monthly application trends
* Recharts-powered visual insights

🖥️ **Modern Dashboard UI**

* Sidebar navigation system
* Responsive layout across devices
* Toast notifications + smooth motion

---

## 🛠️ Tech Stack

* ⚡ Next.js 16.2.6 (App Router)
* 🟦 TypeScript
* 🎨 Tailwind CSS 4
* 🍃 MongoDB + Mongoose
* 🧩 React Hook Form + Zod
* 📊 Recharts
* 🎬 Framer Motion
* 🔷 Lucide Icons
* 🔔 Sonner
* 🔐 JWT + bcryptjs

---

## 🚀 Getting Started

### 📋 Prerequisites

* Node.js 18+
* MongoDB connection string

---

### 🔐 Environment Variables

Create `.env.local`:

```bash id="jobtracker-env"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

---

### 📦 Install dependencies

```bash id="jobtracker-install"
npm install
```

### ▶️ Start development server

```bash id="jobtracker-dev"
npm run dev
```

### 🌐 Open in browser

```text id="jobtracker-open"
http://localhost:3000
```

---

## 📜 Scripts

```bash id="jobtracker-scripts"
npm run dev     # 🚧 Start development server
npm run build   # 🏗️ Production build
npm run start   # 🚀 Run production server
npm run lint    # 🧹 Lint checks
```

---

## 🏗️ Project Structure

```text id="jobtracker-structure"
src/
 ├── app/            → 🌐 App Router pages + API routes
 ├── components/     → 🧩 Dashboard UI components
 ├── lib/            → 🔧 Auth, DB, JWT, helpers
 ├── models/         → 🍃 Mongoose schemas
 ├── styles/         → 🎨 Global styles
 └── public/         → 📦 Static assets
```

---

## 🔌 API Routes

### 🔐 Authentication

* `/api/auth/login`
* `/api/auth/signup`
* `/api/auth/me`
* `/api/auth/logout`

---

### 💼 Jobs

* `/api/jobs`
* `/api/jobs/[id]`

---

### 📊 Analytics

* `/api/analytics/stats`
* `/api/analytics/monthly`

---

## 🧠 How It Works

* 🔐 JWT stored in secure cookies
* 🍃 MongoDB persists users + applications
* 📊 Analytics aggregate job status data
* ⚡ Dashboard updates dynamically with user actions
* 🛡️ Middleware protects authenticated pages

---

## 📝 Notes

* ⚙️ Settings/profile pages are currently placeholders
* 📱 Fully responsive dashboard experience
* 🎬 Motion is intentionally subtle for a professional feel

---

## 🚀 Deployment

Deploy on any Node.js-compatible platform:

* ⚡ Vercel (recommended)
* ☁️ Railway
* 🐳 Docker/VPS

Set:

* `MONGO_URI`
* `JWT_SECRET`

in deployment environment variables.



<!-- ## 🧠 Future Enhancements

* 📅 Interview calendar integration
* 🔔 Application reminders
* 📄 Resume upload support
* 🤖 AI job match suggestions
* ☁️ Multi-device cloud sync
* 👥 Team/recruiter collaboration
 -->

