
Ensure that your system has the following tools installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Installation and Startup Steps

1. **Create Environment Variable File**
   ```sh
   cp .env.dev.demo .env.dev
2. **Install Dependencies**
    ```sh
    pnpm install
3. **Generate Required Files or Type Definitions**
    ```sh
    pnpm generate
4. **Start Development Server and Database (Ensure Docker is Available)**
    ```sh
    pnpm dev
5. **Run Database Migrations**
    ```sh
    pnpm migrate
6. **Create a Test User (Optional) Since the registration feature is not yet implemented, you can manually create a test user by running:**
    ```sh
    pnpm seed