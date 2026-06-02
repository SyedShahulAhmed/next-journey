# 💬 Real-Time Chat Workspace

A **premium real-time collaboration platform** built with Next.js, Socket.IO, and MongoDB. Designed for seamless communication, presence awareness, and fast team collaboration through a calm, modern workspace experience.

Built with **Next.js 16** ⚡, **Socket.IO** 🔄, and **MongoDB** 🍃

---

## 🌌 Platform Experience

Real-Time Chat Workspace is designed like a modern collaboration hub:

* 💬 Instant communication across rooms
* 🟢 Live presence and activity awareness
* ⚡ Optimistic messaging for smooth UX
* 🎬 Motion-rich interactions
* 🖥️ Clean, distraction-free interface

The goal: create a chat experience that feels **fast, focused, and reliable**.

---

## ✨ Highlights

💬 **Real-Time Messaging**

* Instant communication via Socket.IO
* Typing indicators
* Presence updates
* Room-level activity tracking

🔐 **Secure Authentication**

* JWT stored in HTTP-only cookies
* Server-side validation
* Protected routes and socket connections

🏠 **Room Management**

* Create and join rooms
* Search workspaces
* View room details and statistics

⚡ **Optimistic Updates**

* Messages appear instantly
* Automatic sync when sockets reconnect
* Graceful REST fallback

🍃 **Persistent Storage**

* MongoDB-backed users, rooms, and messages
* Durable chat history

🎬 **Premium UX**

* Smooth animations
* Responsive layouts
* Focused visual hierarchy

---

## 🛠️ Tech Stack

* ⚡ Next.js 16 (App Router + API Routes)
* ⚛️ React 19
* 🟦 TypeScript
* 🔄 Socket.IO
* 🍃 MongoDB + Mongoose
* 🎨 Tailwind CSS
* 🧩 Radix UI
* 🎬 Framer Motion
* 🐻 Zustand
* ✅ Zod
* 📝 React Hook Form
* 🔔 Sonner

---

## 🏗️ Project Structure

```text
src/
 ├── app/                  → 🌐 App Router pages + APIs
 │
 ├── pages/api/
 │    └── socket.ts        → 🔄 Socket.IO server
 │
 ├── components/           → 🧩 Chat + dashboard UI
 │
 ├── store/                → 🐻 Zustand state management
 │
 ├── models/               → 🍃 MongoDB schemas
 │
 └── lib/                  → 🔧 Auth, DB, validation helpers
```

---

## 🔐 Environment Variables

Create `.env.local`:

```bash
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
JWT_SECRET=replace_with_a_strong_secret
```

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Start development server

```bash
npm run dev
```

### 🌐 Open in browser

```text
http://localhost:3000
```

---

## 📜 Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | 🚧 Start development server |
| `npm run build` | 🏗️ Create production build |
| `npm run start` | 🚀 Run production server    |
| `npm run lint`  | 🧹 Lint codebase            |

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/auth/signup` |
| POST   | `/api/auth/login`  |
| POST   | `/api/auth/logout` |
| GET    | `/api/auth/me`     |

---

### 🏠 Rooms

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | `/api/rooms`      |
| POST   | `/api/rooms`      |
| GET    | `/api/rooms/[id]` |

---

### 💬 Messages

| Method | Endpoint                        |
| ------ | ------------------------------- |
| GET    | `/api/messages?roomId=<roomId>` |
| POST   | `/api/messages`                 |
| DELETE | `/api/messages/[id]`            |

---

## 🔄 Socket Events

### 📤 Client Emits

* `join_room`
* `leave_room`
* `send_message`
* `typing_start`
* `typing_stop`

---

### 📥 Server Emits

* `presence_sync`
* `user_online`
* `user_offline`
* `receive_message`
* `typing_update`
* `room_presence`

---

## 🗄️ Data Models

### 👤 User

* username
* email
* password hash
* avatar

### 🏠 Room

* name
* description
* createdBy

### 💬 Message

* sender
* room
* content
* clientId

---

## 🧠 How It Works

* 🔐 JWT authenticates both API and socket connections
* 🔄 Socket.IO handles real-time communication
* 🍃 MongoDB stores users, rooms, and messages
* ⚡ Optimistic updates provide instant feedback
* 🐻 Zustand manages client-side state
* 🛡️ Middleware protects authenticated experiences

---

