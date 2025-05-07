# Peasy Fit3

> This project is currently under active development. Features and documentation may change frequently.

## Tech Stack

- Monorepo
- TypeScript
- Next.js (React)
- Docker
- Tailwind CSS
- Shadcn UI
- Next-intl
- Prisma
- PostgreSQL
- Nest
- Expo (React Native)

## Prerequisites

Ensure your system has the following tools installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Project Structure

```
peasy-fit3/
├── apps/          # Application code
├── packages/      # Shared packages
├── configs/       # Configuration files
├── postgresql_volume/  # Database volume
└── docker-compose.yml  # Docker configuration
```

## Installation and Startup Steps

1. **Create Environment Variables File**

   ```sh
   cp .env.dev.demo .env.dev
   ```

2. **Install Dependencies**

   ```sh
   pnpm install
   ```

3. **Start Database**

   ```sh
   pnpm start-db
   ```

4. **Run Database Migrations**

   ```sh
   pnpm migrate
   ```

5. **Build Prisma Client**

   ```sh
   pnpm build-prisma
   ```

6. **Start Development Server**

   ```sh
   pnpm server-dev
   ```

7. **Start Frontend Development Server**
   ```sh
   pnpm w-dev
   ```

## Development Notes

- Project uses pnpm workspace for monorepo management
- Database is containerized using Docker
- Development environment uses `.env.dev` configuration file
- Prisma is used as the ORM tool

## Important Notes

- Ensure Docker service is running
- Wait for database initialization on first startup
- Check Docker container status if experiencing database connection issues
