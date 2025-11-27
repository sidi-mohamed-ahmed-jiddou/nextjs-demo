# Next.js Demo Project

This project demonstrates different data fetching strategies available in Next.js 16, showcasing how to leverage Server Components, React Query, and a hybrid approach with Suspense.

## Architectural Overview

The application is structured to demonstrate three distinct approaches to data fetching and state management, applied to different routes:

### 1. Server Components (`/persons`)
**Strategy:** Pure Server Components
*   **Implementation:** The Persons page (`src/app/(dashboard)/persons/page.tsx`) fetches data directly on the server using an asynchronous component.
*   **Why:** This is the default and most efficient method in Next.js for static or dynamic content that doesn't require immediate client-side interactivity (like polling or real-time updates) for the initial render. It reduces the client-side bundle size and improves initial page load performance.
*   **Key Features:**
    *   Direct database access via Server Actions (`getUsers`).
    *   No client-side JavaScript required for the initial data display.
    *   Simple error handling with standard `try/catch` blocks or response objects.

### 2. Client-Side React Query (`/products`)
**Strategy:** Client-Side Fetching with React Query
*   **Implementation:** The Products page (`src/app/(dashboard)/products/page.tsx`) uses the `useQuery` hook from `@tanstack/react-query` to fetch data on the client side.
*   **Why:** This approach is ideal for highly interactive data that needs to be fresh, supports polling, or requires complex client-side state management (like optimistic updates, infinite scrolling).
*   **Key Features:**
    *   Loading states handled via `isLoading` and a Spinner component.
    *   Automatic caching and re-fetching window focus or network reconnection.
    *   Client-side interactivity is prioritized.

### 3. Hybrid Approach with Suspense (`/posts`)
**Strategy:** Server Prefetching + Hydration + Suspense
*   **Implementation:** The Posts page (`src/app/(dashboard)/posts/page.tsx`) combines the best of both worlds.
    1.  **Prefetching:** Data is prefetched on the server using `queryClient.prefetchQuery`.
    2.  **Dehydration:** The cache is dehydrated and passed to the client via `HydrationBoundary`.
    3.  **Suspense:** A `Suspense` boundary wraps the component to handle the loading state while the server is doing the work or while the client takes over.
*   **Why:** This provides the initial load performance of Server Components (SEO friendly, fast First Contentful Paint) while retaining the power of React Query on the client (caching, background updates) after hydration.
*   **Key Features:**
    *   Instant initial render with data (no "loading" spinner on first load if prefetched correctly).
    *   Seamless transition to client-side state management.
    *   Uses `Suspense` for granular loading UI control.

### 4. Form Validation Comparison (`Zod` vs `Yup`)
**Strategy:** Comparative Implementation
*   **Implementation:** The project implements form validation using two popular libraries to demonstrate and compare their usage patterns.
*   **Why:** To evaluate the differences in developer experience, bundle size, and ease of use between Zod (TypeScript-first schema declaration) and Yup (builder pattern).

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management / Data Fetching:** TanStack Query (React Query)
*   **UI Components:** Shadcn UI
*   **Database:** Supabase (PostgreSQL)
*   **ORM:** Drizzle ORM
*   **Authentication:** Better Auth
*   **Validation:** Zod & Yup (used for comparison purposes)
