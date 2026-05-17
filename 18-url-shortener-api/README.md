# 🔗 Shortly — URL Shortener Platform

A **production-ready URL shortener** built with Next.js App Router, MongoDB, and JWT authentication — featuring secure sessions, analytics tracking, QR code support, and a sleek modern dashboard.

Transform long, messy URLs into **clean, trackable links** with a premium SaaS-style experience.

Built with **Next.js** ⚡, **MongoDB** 🍃, and **Tailwind CSS** 🎨

---

## 🌌 Platform Experience

Shortly is designed like a **modern link management SaaS**:

* ⚫ Minimal dashboard aesthetics
* 📊 Real-time analytics insights
* 🔗 Clean URL management flow
* ⚡ Fast, responsive interactions
* 🎬 Smooth transitions and polished UI states



---

## ✨ Features

🔐 **Authentication System**

* Secure signup/login flows
* JWT stored in **http-only cookies**
* Protected dashboard + APIs

🔗 **URL Shortening**

* Create short links instantly
* Optional custom slugs
* Fast redirect handling

📊 **Analytics Tracking**

* Track click counts
* Store last-visited timestamps
* Basic usage insights per link

🧾 **Dashboard Management**

* Manage all links in one place
* Edit or delete URLs
* Generate QR codes

🛡️ **Protected Access**

* Middleware-secured routes
* Auth-protected API access

---

## 🛠️ Tech Stack

* ⚡ Next.js (App Router)
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication
* 🍪 HTTP-only cookies
* 🎨 Tailwind CSS

---

## 🔌 API Endpoints



### 🔐 Authentication

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| `POST` | `/api/auth/signup` | 📝 Create account      |
| `POST` | `/api/auth/login`  | 🔐 Login + set session |
| `POST` | `/api/auth/logout` | 🚪 Clear session       |
| `GET`  | `/api/auth/me`     | 👤 Current user        |

---

### 🔗 URL Management

| Method   | Endpoint          | Description        |
| -------- | ----------------- | ------------------ |
| `GET`    | `/api/url/all`    | 📋 Get user URLs   |
| `POST`   | `/api/url/create` | ➕ Create short URL |
| `PATCH`  | `/api/url/:id`    | ✏️ Update slug     |
| `DELETE` | `/api/url/:id`    | ❌ Delete short URL |

---

### 🌐 Redirect Handling

| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| `GET`  | `/:shortCode` | 🔄 Redirect + track click |

---

## 🧾 Request Example

### ➕ Create URL

```json id="shortly-body"
{
  "originalUrl": "https://example.com",
  "customSlug": "my-link"
}
```

---

## 🔐 Environment Variables

Create `.env.local`:

```bash id="shortly-env"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash id="shortly-install"
npm install
```

### ▶️ Start development server

```bash id="shortly-dev"
npm run dev
```

### 🌐 Open app

```text id="shortly-open"
http://localhost:3000
```

---

## 📜 Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | 🚧 Start development server |
| `npm run build` | 🏗️ Production build        |
| `npm run start` | 🚀 Start production server  |
| `npm run lint`  | 🧹 Run ESLint               |

---

## 🧠 How It Works

* 🔐 JWT stored in secure http-only cookies
* 🍃 MongoDB stores users + shortened URLs
* 📊 Redirect route tracks analytics automatically
* 🛡️ Middleware validates protected routes
* 🔗 Each short code maps to a unique destination URL

---


