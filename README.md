This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## comandos:
## 1) npx create-next-app --typescript: esto es para crear una app con nextJS
## 
## 2) npm run dev: para reinicializar un proyecto
## 
## 3) npx prisma init: para crear una carpeta prisma
## 
## Instalacion de dependencias:
## 1) npm install -D tailwindcss postcss autoprefixer: instalamos las dependencias de tailwind
## 2) npx tailwindcss init -p: con esto nos creara nuevos archivos para poder usar tailwind
## 3) npm install react-icons: con esto instalaremos icons que podremos usar en nuestro proyecto
## 4) npm install zustand: es una API basada en hooks escalable usando simples flux principales
## 5) npm install axios: es un cliente HTTP basado en promesas, es un isomorfico
## 6) npm install react-hook-form: para construir UX y DX, para fortalecer de forma nativa los formularios HTML
## 7) npm install react-hot-toast: agrega un mensaje a la aplicacion, se encargara de renderizar notificaciones
## 8) npm install query-string: nos pasa nuestro query como un objeto
## 9) npm install world-countries: esto nos ayudara a traer modulos para saber en que pais se encuentra el cliente
## 10) npm install react-select: es una buena forma para consumir API, inyeccion de Api con control UI
## 11) npm install leaflet: nos ayuda a tener mapas interactivos para mobiles de forma responsiva
##  11.1) npm install -D @types/leaflet: es complemento del anterior
##  11.2) npm install react-leaflet: complemento de leaflet para react
## 12) npm install next-cloudinary: con esta dependencia nos deja traer una foto para guardarla en cloudinary
## 13) npm install date-fns: nos ayuda para guardar fechas 
## 14) npm install react-date-range: para poder ajustar rangos de dias
##  14.1)npm install -D @types/react-date-range: complemento
## 15) npm install react-spinners: nos ayuda a obtener spinners para nuestras pagina loader
## 
## Webs usadas:
## 
## 1) para guardar nuestras fotos cuando se registre un airbn:
## https://console.cloudinary.com/console/c-f589ca3381a18cd7ac1f2b9fb53e89/media_library/search?q=
## 2) para manejar nuestra base datos:
## https://cloud.mongodb.com/v2/642d9aa8a2263c2e9ae18dbe#/clusters
## 
## 
## 
## prisma comandos:
## 1) npm i -D prisma: el cliente de prisma es usado en Node,js o aplicacion TypeScript backend esta puede ser REST API
##    GraphQl API o cualquiera base de datos.
## 2) npx prisma db push: con este comando hacemos push a nuestra base de datos a atlas  
## 3) npm install next-auth prisma/client @next-auth/prisma-adapter: este adaptador de prisma es parta next-auth
##    este paquete solo puede ser usado en conjuncion con the primary next-auth paquete
## 4) npm install bcrypt: este paquete es para nuestro uso como administrador
##  4.1) npm install -D @types/bcrypt: es un complemento del anterior



