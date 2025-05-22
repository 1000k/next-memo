# next-memo

Next.js memo app

## Requirements

- Podman & Podman Compose
    - Or Docker & Docker Compose

## Development

```sh
# Create DB
npm podman

# Migrate
npx migrate dev --name init

# Run local server
npm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy to Vercel

1. Fix ESLint errors by excluding generated files:
   - Add `{ ignores: ["src/generated/**/*"] }` to your `eslint.config.mjs` file

2. Push your code to GitHub or GitLab

3. Connect your repository on Vercel: https://vercel.com/new

4. Set up environment variables in the Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - Any other environment variables your app needs

5. Deploy your application

6. Deploy DB
    - `dotenv -e .env.production -- npx prisma migrate deploy`

7. Set environment variables in Vercel's dashboard
    - `AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET`

8. Update Google Auth Platform
    - Add Vercel App's URLs to Google Auth Platform
    - "OAuth 2.0 Client" screen -> Fill "Approved JavaScript Generator" & "Approved Redirect URI"
        - Note: It may take from five minutes to several hours for the settings to take effect.