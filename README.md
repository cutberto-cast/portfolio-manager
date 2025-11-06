# Portfolio Manager

Una aplicación full-stack para gestionar y mostrar proyectos de desarrollo.

## Características

- **Frontend**: Next.js 14 con TypeScript y Tailwind CSS
- **Backend**: Express.js con TypeScript y Prisma ORM  
- **Base de datos**: PostgreSQL con Neon
- **Autenticación**: JWT (próximamente)

## Tecnologías

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- App Router

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JWT

## Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar DATABASE_URL en .env
npx prisma generate
npx prisma migrate dev
npm run dev