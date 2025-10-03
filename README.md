/**
AadhaarConnect
*/

AadhaarConnect is a modern web application built with the Next.js App Router, engineered to demonstrate an end-to-end product workflow with strong UX patterns, modular components, and a clear separation between UI and data layers.

Key Highlights
- Next.js App Router architecture with server and client components
- Shadcn/UI component system with Tailwind CSS v4 design tokens
- Deterministic mock adapters that simulate API latency and variability
- SWR for client-side data fetching and cache coherence
- Recharts for simple analytics/visualizations in admin views
- Strong accessibility defaults, semantic HTML, and keyboard-friendly navigation

Architecture
- app/: Route segments for landing, student flows, and admin flows
- components/: Reusable UI components (TopNav, Sidebar, StatusCard, etc.)
- lib/mock-api.ts: Mock data layer using timed Promises and randomized fields
- styles/: Global tokens and Tailwind styling (v4)
- public/: Static assets and placeholders

Primary Routes
- /: Landing page with calls-to-action and product overview
- /student: Student dashboard entry with quick status overview
- /student/check: Aadhaar-linked/seeded/DBT eligibility check (mocked adapter)
- /student/learn: Learning modules overview
- /student/quizzes: Lightweight knowledge checks
- /student/chatbot: Guided assistance surface
- /student/help: FAQs and support resources
- /admin: Program overview and key metrics
- /admin/campaigns: Campaign orchestration and status summaries
- /legal: Policies and terms

Data Strategy
- Mock adapters in lib/mock-api.ts produce structured, typed responses
- Latency simulation (setTimeout) to emulate network conditions
- Controlled randomness for status flags to create varied scenarios
- Safe, deterministic defaults to ensure consistent UI states

Accessibility & UX
- Semantic HTML sections (header, main, nav) and ARIA attributes
- Keyboard focus, proper labels, and screen-reader friendly text
- Mobile-first layout using Tailwind’s flex utilities and responsive tokens
- Minimal color system with clear contrast for text and interactive elements

Tech Stack
- Framework: Next.js App Router
- UI: Shadcn/UI, Tailwind CSS v4
- Data: Mock adapters, SWR for client caches
- Charts: Recharts
- Language/Build: TypeScript

Local Development
1) Ensure Node 18+ is available
2) Install dependencies
   - pnpm install
   - or npm install
3) Run the dev server
   - pnpm dev
   - or npm run dev
4) Open http://localhost:3000

Deployment
- Vercel is recommended. Connect your GitHub repository and import the project.
- No external secrets are required for the mocked data layer.
- Build output uses standard Next.js settings; customize as needed via next.config.mjs.

Project Decisions
- Clear separation between presentation (components) and data (lib/mock-api.ts)
- SWR provides cache consistency and avoids fetch-in-useEffect anti-patterns
- Minimal global state; data locality and composition are preferred
- Design tokens and typography applied via Tailwind v4, using system fonts by default

Contributing
- Follow existing component patterns and file naming conventions (kebab-case)
- Prefer composable UI and isolated responsibilities
- Add tests or story-like examples where valuable for complex components

License
- MIT
