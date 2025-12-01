### next conventions

1. App router: Next.js does not use `index.tsx`
    - instead, each route must use the filename `page.tsx`
    - anything inside `app/` is assumed to be a route
2. Other convention files in App Router:
    - `layout.tsx`: shared UI for a route and its children
    - `loading.tsx`: for a built-in suspense fallback
    - `error.tsx`: for error boundary UI
    - `not-found.tsx` : for 404s inside this router subtree
3. Dynamic routes:
    - e.g. `app/users/[id]/page.tsx` -> `/users/123`
4. Route Handlers: `app/api/**/route.ts`
    - exports HTTP methods
        ```ts
        export function GET(req: Request) {}
        export function POST(req: Request) {}
        ```
5. By default, all files in `app/` are Server Components
    - `"use client"` to use client features(hooks, browser APIs) in your components
6. A folder wrapped in () is a route group, and it has no effect on the URL
    - purely organizational: these folders don't become routes, so you can use them like normal component storage
    - everything inside `(components)` is ignored by routing
    - you can grouo certain pages

### Learnings

1. devDependencies are only needed while developing your app
    - Jest
    - type checking
    - linting and formatting etc

2. Useful tailwind packages:
    - prettier-plugin-tailwindcss: for sorting classes in tailwind
    - tailwind-merge: for merging classes

3. dashboardWrapper for consistent root styling
4. root(`app/layout.tsx`) layout.tsx styling applies to every page in the next app