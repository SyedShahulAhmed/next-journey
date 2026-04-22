
# 💸 Expense Splitter

A modern **expense sharing app** built with Next.js and Tailwind CSS, featuring a **Monopoly-inspired SaaS UI** — where managing money feels like playing a strategy game.

Track shared expenses, calculate balances, and settle debts with a **clean, interactive, board-game style experience**.

---

## 🎲 UI Inspiration

💰 **Monopoly**

This project brings Monopoly-like elements into a productivity tool:

* 🟩 Card-based financial dashboards
* 💵 Money-focused UI with bold highlights
* 🎯 Clear gain/loss visualization
* 🎮 Game-like interactions for managing expenses

The goal: make expense tracking feel like **playing a financial strategy game**, not doing boring math.

---

## ✨ Features

👥 **Group Management**

* Create and switch between multiple groups
* Add or remove people within each group

💸 **Expense Tracking**

* Add, edit, and delete expenses
* Track who paid and how much

📊 **Smart Calculations**

* Auto-calculate per-person balances
* Total spending per person cards

🔄 **Debt Simplification**

* Optimized settlements (who pays whom)
* Reduces unnecessary transactions

🧹 **Quick Actions**

* “Settle All” to reset group balances instantly

💾 **Persistence**

* Data stored in localStorage
* Restores groups and selection on reload

📱 **Responsive UI**

* Works across desktop and mobile
* Smooth animations and interactive cards

---

## 🛠️ Tech Stack

* ⚡ Next.js 16 (App Router)
* ⚛️ React 19
* 🟦 TypeScript
* 🎨 Tailwind CSS v4
* 🧹 ESLint

---

## 🚀 Run Locally

### 📦 Install dependencies

```bash id="b7k2q1"
npm install
```

### ▶️ Start development server

```bash id="h3m8x5"
npm run dev
```

### 🌐 Open in browser

```id="n9c4z2"
http://localhost:3000
```

---

## 📜 Available Scripts

```bash id="v1x6p8"
npm run dev    # 🚧 start dev server
npm run build  # 🏗️ production build
npm run start  # 🚀 run production server
npm run lint   # 🧹 lint checks
```

---

## 🏗️ Project Structure

```text
09_expense_splitter/
 ├── src/
 │    └── app/
 │         └── page.tsx     → 🧠 Core UI + logic
 │
 ├── public/
 ├── package.json
 └── README.md
```

---

## ⚙️ How It Works

* Each group contains:

  * `groupName`
  * `people[]`
  * `expenses[]`

* 📊 Balances are dynamically calculated

* 🔄 Settlement logic matches:

  * Debtors → Creditors

* 💾 State is saved in localStorage and restored automatically

