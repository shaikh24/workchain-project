# WorkChain – Hackathon MVP (PWA + Node + MongoDB + Pi Testnet)

## What’s inside
- **server/** Node/Express API (Auth, Users, Jobs, Reviews, Payments (Pi Testnet), Chat skeleton)
- **client/** PWA React (via CDN) with Tailwind (Login, Profile, Jobs, Post, Wallet, Dark/Light)
- **scripts/build.js** copies client → server/public
- Single deploy: serve API + client from same server (Render friendly)

## Quick Start (Termux / PC)
```bash
cd workchain_mvp_hackathon
npm run install-all            # install server deps
cp server/.env.example server/.env
# edit server/.env -> add MongoDB Atlas URI, JWT secret, Pi keys (testnet)
npm run build                  # copy client to server/public
npm start                      # http://localhost:4000 (open in Pi Browser for wallet flow)
```

## Render Deploy
- Root: `.`
- Build Command: `npm run install-all && npm run build`
- Start Command: `npm start`
- Env Vars (on Render):
  - `PORT` = 10000 (Render sets automatically)
  - `MONGODB_URI` = your Atlas connection string
  - `JWT_SECRET` = your strong secret
  - `CORS_ORIGIN` = *
  - `PI_APP_ID` = your Pi app id
  - `PI_API_KEY` = your Pi api key
  - `PI_PRIVATE_SEED` = your seed (use testnet)
  - `PI_USE_SANDBOX` = true

## API surfaces
- `POST /api/auth/signup { username, email, password }`
- `POST /api/auth/login { email, password }` → `{ token }`
- `GET /api/users/me` (Bearer token)
- `PUT /api/users/me { interests[], country, walletAddress }`
- `GET /api/jobs` (filters: q, category, type, mode, status)
- `POST /api/jobs` (auth) create job
- `POST /api/reviews` (auth) add review
- `POST /api/payments/create` create Pi test payment (server-side)
- `GET /api/payments/:id` status

## Notes
- This is **MVP** for hackathon demo: simple, fast, works on mobile (PWA).
- Payments endpoint calls Pi API with `PI_USE_SANDBOX=true` flag in metadata.
- For real mainnet later, set `PI_USE_SANDBOX=false` and Pi dashboard to mainnet.
# hackathon-
