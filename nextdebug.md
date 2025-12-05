
### Setup

1. Download node
2. `npx create-next-app@latest --no-git --typescript`
    - IMPORTANT! If you run without `--no-git` then there will be 2 git initialized(one inside client one outside and youre gonna have problems)
    - DO NOT INSTALL TAILWIND WITH NEXT(DEFAULT SETTING). This will install old tailwind 
3. install packages
    - `npm i @mui/material @emotion/react @emotion/styled lucide-react numeral date-fns axios recharts react-dnd react-dnd-html5-backend @mui/x-data-grid`
4. setup globals.css and tailwind packages  
    - `npm i -D prettier prettier-plugin-tailwindcss tailwind-merge`
5. .prettierrc: automatic class sorting
6. Set up redux toolkit(in `redux.tsx`)
7. For server (prisma setup):
    - `npm init -y`
    - `npm i -D ts-node typescript @types/node`
    - `npx tsc --init`
    - configure `tsconfig.json`
        - according to the offical prisma v7 with postgres docs
        - `    "moduleResolution": "bundler"` instead of `node `which is more suitable for ESM 
    - `npm i prisma @prisma/client`
        - `npx prisma init` to initialize prisma and create prisma folder
            - generates `schema.prisma` where models live
            - `.env` where your `DATABASE_URL` goes
            - generates `prisma.config.ts`
    - copy `seedData` into prisma folder
    - modify schema.prisma to remove `url = env("DATASOURCE_URL")` from db in `schema.prisma` and specify and the output file for the for the generated Prisma client
        - in Prisma v7, you specify the url in the `prisma.config.ts` file instead 
    - `npx prisma generate`: reads `schema.prisma` and generates the TS code for the Prisma Client. This is a type-safe query builder that allows you to interact with db in a structured way
        - this command generates the db API. so after you can write e.g. `const users = await prisma.user.findMany()`
        - whenever you modify the schema, you need to re-run `npx 
        prisma generate` to ensure the generated Prisma client reflects these changes and remains up to date
        - you can specify the output path in the `generator` block to control where the client code is placed in your project
    - `npx prisma migrate dev --name="init"`: creates actual tables in the db 
        - creates an sql migration file(SQL): Prisma reads your models and generates raw SQL to create the tables
        - then applies it ot the actual db in postgres. so postgres will physically contain the tables defined in schema.prisma
        - `--name=init` merely names the folder to help you keep track of the purpose of each migration
    - `npx prisma db seed`: inserts data via Prisma client
        - `seed` is not a special name, you can name it anything you want in the `migrations` block in `prisma.config.ts`
        - you can add a `"seed": "tsx prisma/seed.ts` in package.json and run `npm run seed` if you prefer, works the same 
8. `npm i express body-parser cors dotenv helmet morgan`
9. `npm i -D rimraf concurrently nodemon @types/cors @types/express @types/morgan @types/node`

### Debug

1. Package dependency conflicts are normal and are part of the process
2. To remove the next-app git repo bug, you have to delete the .git folder and git cache inside the next-app
    - `git rm -f client`
    - `ls -Force .gitmodules`
        - `Remove-Item .gitmodules` if file exists
    - `Remove-Item -Recurse -Force .git\modules\client` if folder doesn't exist continue
    - `git rm -f client` (clear cached index folder)
    - `git add .`
    - `git commit -m "remove submodule ref completely`
    - `git push`
    - then create the next app in your root folder(with `--no-git`) and add again
3. Change CJS to ESM for future-proofing
    - ref to above setup
    - change all cjs commands to be esm-friendly
4. In the seed script, you need to use TRUNCATE to delete the data so that autoincremented IDs are reset
    - you also need to delete the tables in order so that foreign key relations are preserved. This means deleting the child tables(those that reference parent tables in their fks) before parent tables
    - this means during insertion, to also insert the parent tables first before child tables
5. In the seed data, you shouldn't manually specify the IDs as the IDs are set to autoincrement in postgres, and you would have to manually reset the IDs afterwards for each table that you want to insert into
6. Next.js only looks for the `.env` file inside the directory where `package.json` for frontend lives! So `.env.local` should be in `client`, not outside!
7. Next.js v15+ states that params passed to a page are asynchronous(Promises). Hence in your page, to get the params you should do:
```ts
const params = useParams();
const id = params.id as string;
```
8. When trying to restart the project afresh(freshly pulled from github), remember to 
    - set up postgres
    - generate prisma and migrate
    - set up env variables in both client and server 




