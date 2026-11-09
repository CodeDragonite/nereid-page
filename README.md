This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

The development environment runs in Docker Compose. You only need Docker
Desktop; do not run `npm`, `bun` or `next` on your machine.

```bash
docker compose up -d            # build (first time) and start with hot reload
docker compose logs -f web      # follow the dev server
```

Open [http://localhost:3000](http://localhost:3000) (Spanish at `/es`, English at `/en`).
Edits on your machine hot-reload inside the container.

| Task | Command |
| --- | --- |
| Tests (bun:test) | `docker compose exec web bun test` |
| Type check | `docker compose exec web npx tsc --noEmit` |
| Add a dependency | `docker compose exec web npm install <pkg>` |
| Rebuild the image after changing `Dockerfile.dev` | `docker compose up -d --build` |
| Stop | `docker compose down` |
| Reset `node_modules` and the `.next` cache | `docker compose down -v && docker compose up -d` |

How it works: `compose.yaml` bind-mounts the repo at `/app`; `node_modules` and `.next`
live in named Docker volumes so Linux binaries never mix with the host's. On start,
`docker/dev-entrypoint.sh` runs `npm ci` only when `package-lock.json` has changed.
`.env.local` is loaded automatically if present.

Fonts (DM Sans, DM Serif Display) are loaded with [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).
Project conventions for contributors and coding agents are in `AGENTS.md`.

This repository now targets Cloudflare deployment via OpenNext. See `IMPLEMENTATION_README.md` for email, messaging, and contact form setup.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
