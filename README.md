# NEXORA — Modern Commerce Experience

NEXORA is a premium, frontend-only e-commerce experience built with React, Vite, Tailwind CSS, React Router, TanStack Query, and a modern product-first design system. It is designed to feel like a real commerce brand rather than a classroom demo.

## Product overview

NEXORA centers on the idea that premium digital shopping should feel fast, thoughtful, and product-aware. The experience blends editorial storytelling, product discovery, persistent cart and wishlist state, checkout flow, and an admin dashboard into a single polished storefront.

## Problem statement

Most student e-commerce projects focus on a single product list or cart, but they rarely capture the complexity of a real-world commerce experience. NEXORA addresses that gap by combining:

- premium brand design language
- strong information architecture
- accessible and mobile-aware shopping flows
- production-style data modeling and state separation
- portfolio-grade polish for frontend interviews and hiring conversations

## Core features

- premium homepage with editorial sections and conversion-focused CTA blocks
- multi-filter product discovery with URL-query persistence
- product detail pages with image gallery, variants, and reviews
- cart and wishlist persistence in localStorage
- multi-step checkout flow with form validation
- customer account and order management screens
- admin dashboard with charts, top products, and KPIs
- responsive layouts across mobile and desktop breakpoints
- accessibility-focused focus states, structure, and contrast

## Screenshots

This project is designed to be portfolio-friendly. The app includes full-storefront views for landing, shopping, product detail, wishlist, checkout, admin, and account management.

## Tech stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React
- Recharts
- Vitest + React Testing Library

## Architecture

The app follows a practical structure:

- src/components: reusable layout, UI, and product components
- src/data: mock product and business datasets
- src/hooks: browser-local persistence hooks
- src/lib: utilities and testable transformation logic
- src/pages: route-level pages for storefront and app flows
- src/services: mock API layer with Axios abstractions

## State management strategy

- Server state: TanStack Query is used for mock API calls and future backend replacement.
- Local UI state: React state handles interactions such as filter toggles, step progress, and UI state.
- Persistent client state: localStorage powers cart and wishlist persistence.
- Form state: React Hook Form + Zod handle validation and checkout flow.

This keeps the project understandable while still reflecting how production frontends separate responsibilities.

## Performance strategy

- route-level lazy loading for code-splitting
- object and list memoization through small, focused logic
- responsive image usage and product card optimization
- lightweight mock data layer instead of deeply nested state
- filtered product queries with lean utility functions

## Accessibility strategy

- semantic headings and landmarks
- clear keyboard focus states
- input labels and readable contrast
- large tap targets for mobile shopping
- accessible navigation and form patterns

## Testing strategy

Vitest and Testing Library are used to validate behavior that matters:

- cart calculations
- product filtering
- search-driven shopping logic

## UX decisions

The design intentionally blends premium commerce cues from Apple, Shopify, and Nike without copying any one product directly. The result is a cleaner, more editorial e-commerce experience designed for conversion and trust.

## Installation

```bash
npm install
npm run dev
```

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm test
```

## Environment variables

This frontend-only version does not require environment variables. For a backend-connected deployment, the natural next step would be to add values such as:

- VITE_API_BASE_URL
- VITE_APP_NAME
- VITE_ENABLE_ANALYTICS

## Production build

```bash
npm run build
```

## Deployment

This project is ready for static deployment on Vercel, Netlify, or Cloudflare Pages. Since the current app uses mock data, deployment is straightforward and does not require a server.

## Future backend architecture

A production-ready backend would likely include:

- authentication service
- product catalog API
- inventory and pricing service
- order orchestration
- payment gateway integration
- analytics pipeline
- CMS for promotional content

## Architecture Decision Record

### ADR 1: Use localStorage for cart and wishlist
We intentionally keep cart and wishlist in localStorage because the app is frontend-only and user persistence is critical for a real shopping experience.

### ADR 2: Keep data mock-driven
The mock API layer isolates the app from real backend implementation and allows product, order, and user workflows to be developed realistically.

### ADR 3: Use route-level lazy loading
This keeps bundle size more manageable and makes the app feel more production-ready while preserving a user-friendly single-page experience.

### ADR 4: Use Tailwind with a small custom design language
This balances speed, clarity, and design consistency without creating an overly abstract design system.
