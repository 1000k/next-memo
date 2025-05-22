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
