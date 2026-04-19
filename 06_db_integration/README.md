# 🧠 Snippet Vault

A simple full-stack app to **store and retrieve code snippets** using Next.js and MongoDB.

---

## ⚡ Features

* ➕ Add snippets (title, content, language, tags)
* 📦 Store data in MongoDB
* 🔍 Search snippets (title + content)
* 🏷️ Filter by tags and language
* ⚡ Instant retrieval with API

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 
* **Backend:** Next.js API Routes
* **Database:** MongoDB
* **ODM:** Mongoose
* **Language:** TypeScript
* **Styling:** Tailwind CSS

---

## 📁 Project Structure

```
/app
  /api
    /snippets
/lib
  db.ts
/models
  Snippet.ts
```

---

## 🔌 API Endpoints

### ➕ Create Snippet

```
POST /api/snippets
```

### 📥 Get All Snippets

```
GET /api/snippets
```

### 🔍 Search Snippets

```
GET /api/snippets?search=keyword
```

### 🏷️ Filter

```
GET /api/snippets?tag=auth&language=js
```

---

## 🧠 Snippet Model

```ts
{
  title: string;
  content: string;
  language: string;
  tags: string[];
  createdAt: Date;
}
```

---

## 🚀 Getting Started

### 1. Clone the repo

```
git clone https://github.com/your-username/snippet-vault.git
cd snippet-vault
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment

Create `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the app

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🎯 What This Project Demonstrates

* Database integration with Next.js
* Schema design using Mongoose
* API route handling (GET, POST)
* Dynamic querying (search + filters)
* Full-stack data flow (UI → API → DB)

---


