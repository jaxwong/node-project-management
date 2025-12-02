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
    - frontend install: `

2. Useful tailwind packages:
    - prettier-plugin-tailwindcss: for sorting classes in tailwind
    - tailwind-merge: for merging classes

3. dashboardWrapper for consistent root styling
4. root(`app/layout.tsx`) layout.tsx styling applies to every page in the next app
5. redux toolkit packages: react-redu, @reduxjs/toolkit, redux-persist, dotenv
6. what is redux toolkit and how is it being used in `redux.tsx`? How is redux toolkit used in enterprise next.js in general?
7. next distinguishes between `.env.local` and `.env.production`
8. "use client" is required wherever there is interaction in nextjs
9. explain how the tailwindcss v4 directives work and interact with the nextapp in `globals.css`
    - how does `Sidebar.tsx` work?
10. empty fragment vs div
11. Template to create sidebars and navbars like in the tutorial
12. postgres server vs database and best practices
    - security
    - roles and services
13. `npm init -y` in the server: what is it doing?
14. what does specifying `OutDir` in `tsconfig.json` do?
15. what does `include` in `tsconfig.json` do?
16. what does `seed` in package.json do? automatically run seed scripts? is this a keyword?
    - what does `ts-node path_to_seed_script` do? 
    - commonjs?
17. What is Prisma and how does it work in this tutorial?
    - init
    - configure schema
    - seed data
    - generate
    - migrate
18. After any update to the schema, need to
    - generate
    - migrate again
    - seed again(if you want but usually no and ONLY IN DEV, NEVER PROD)
19. we use ESM over commonjs like in the tutorial for future-proofing
    - refer to official prisma documentation for setting up prisma with postgres(1), and for seeding data using seed scripts(2)
    - what we did:
        - Changed package.json to be compatible with ESM, using the documentation in (1)
        - changed prisma.config.ts to contain seed scripts instead of running in the package.json
        - change schema.prisma according to docs in (1) and explicitly use `"moduleFormat"= "esm`
        - update `prisma/seed.ts`
20. `-D` and `--save-dev` mean the same thing
    - add package to `devDependencies` in the `package.json`
21. what purpose does `@/src/index.ts` serve?
    - what do all the configurations mean?
22. what do all the packages do? `@types` packages, `rimraf`, `nodemon`, `cors`, `helmet`, `morgan` etc
23. `tsc` vs `tsx` vs `ts-node`
    - `tsc` is the typescript compiler: only compiles TS to JS
        - reads `tsconfig.json`, type-checks code, emits `.js` files(emitting is the process of generating JS output files from the source code; transpilation)
    - `ts-node` runs `.ts` files without compiling first, older CJS system
    - `tsx`: is the new standard for running TS in development:
        - runs `.ts` instantly
        - supports ESM out of the box
        - automatically reloads with `tsx watch`
24. `dist/index.js` is the JS file that TS generates after compiling your project
    - exists because Node.js cannot run TS directly in prod, so `tsc` must compile code into plain JS which Node can then run. 
    - the compiled version lives in the `dist` directory as specified by `outDir` in `tsconfig.json`
25. What do the commands in `"scripts"` in `package.json` do?
    - `rimraf dist && tsc`: `rimraf` is a cross-platform version of Unix `rm -rf`, deletes `dist` directory(ensure clean build) and `tsc` compiles to js files again
    - `npm run build && node dist/index.js` builds and runs the compiled js using node
    - `tsx watch src/index.ts` runs the ts directly, auto-reloads when files change, no build step and allows ESM with no config
        - different from `node dist/index.js` as this doesnt reload on changes and is usually used in prod only
    - `tsx prisma/seed.ts` just runs the seed script to seed the postgres db locally

