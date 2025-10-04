# 💠 AadhaarConnect

> **AadhaarConnect** is a modern web application built with the **Next.js App Router**, engineered to demonstrate an **end-to-end product workflow** with strong UX patterns, modular components, and a clear separation between UI and data layers.

---

## 🚀 Key Highlights

* ⚙️ **Next.js App Router** architecture with server and client components
* 🎨 **Shadcn/UI + Tailwind CSS v4** design tokens
* 🔄 **Deterministic mock adapters** simulating API latency and variability
* ⚡ **SWR** for client-side data fetching and cache coherence
* 📊 **Recharts** for analytics and admin visualizations
* ♿ **Accessibility-first** design with semantic HTML & keyboard navigation

---

## 🧩 Architecture

```
app/              → Route segments (landing, student, admin)
components/       → Reusable UI (TopNav, Sidebar, StatusCard, etc.)
lib/mock-api.ts   → Mock data layer using timed Promises + randomness
styles/           → Global Tailwind tokens and styling
public/           → Static assets and placeholders
```

---

## 🛣️ Primary Routes

| Route              | Description                                        |
| ------------------ | -------------------------------------------------- |
| `/`                | 🌐 Landing page with calls-to-action               |
| `/student`         | 🎓 Student dashboard with status overview          |
| `/student/check`   | 🔍 Aadhaar-linked / DBT eligibility check (mocked) |
| `/student/learn`   | 📘 Learning modules overview                       |
| `/student/quizzes` | 🧠 Knowledge checks                                |
| `/student/chatbot` | 🤖 Guided assistance surface                       |
| `/student/help`    | 💬 FAQs and support                                |
| `/admin`           | 🧭 Program overview & key metrics                  |
| `/admin/campaigns` | 📈 Campaign orchestration summaries                |
| `/legal`           | ⚖️ Policies and terms                              |

---

## 🧠 Data Strategy

* 🧩 **Mock adapters** in `lib/mock-api.ts` produce structured, typed responses
* 🕒 **Latency simulation** via `setTimeout` to mimic real-world conditions
* 🎲 **Controlled randomness** for varied yet consistent mock scenarios
* ✅ **Deterministic defaults** for stable UI rendering

---

## ♿ Accessibility & UX

* 🧱 Semantic HTML (`header`, `main`, `nav`) + ARIA attributes
* ⌨️ Full **keyboard support** and focus indicators
* 📱 **Mobile-first** layouts using Tailwind flex + responsive utilities
* 🌗 **High contrast** minimal color palette for clear readability

---

## 🛠️ Tech Stack

| Layer         | Tools                      |
| ------------- | -------------------------- |
| **Framework** | Next.js (App Router)       |
| **UI**        | Shadcn/UI, Tailwind CSS v4 |
| **Data**      | Mock Adapters, SWR         |
| **Charts**    | Recharts                   |
| **Language**  | TypeScript                 |

---

## 💻 Local Development

1️⃣ Ensure **Node 18+** is installed
2️⃣ Install dependencies

```bash
pnpm install
# or
npm install
```

3️⃣ Start the development server

```bash
pnpm dev
# or
npm run dev
```

4️⃣ Open 👉 **[http://localhost:3000](http://localhost:3000)**

---

## ☁️ Deployment

* 🚀 **Vercel recommended** → connect your GitHub repo and import directly
* 🧪 **No external secrets** (mock data layer only)
* ⚙️ Standard **Next.js build output**; customize via `next.config.mjs`

---

## 🧭 Project Decisions

* 🔹 **Separation of concerns** between presentation (`components/`) and data (`lib/`)
* 🌀 **SWR** ensures cache coherence & eliminates `useEffect` fetching hacks
* 📦 **Minimal global state** — local data and composition preferred
* 💅 **Tailwind v4 tokens + system fonts** for fast, accessible design

---

## 🤝 Contributing

* 🧱 Follow component and naming patterns (**kebab-case**)
* 🧩 Build **composable, isolated** UI components
* 🧪 Add tests or story-style examples for complex components

---

## 📜 License

**MIT License** — free to use, modify, and distribute 💫

---

**Team WatchMen**