# Mwaura Muroki Associates & Advocates

Kenyan law firm website: a Vite + React + TypeScript + shadcn/ui + Tailwind frontend, plus a
standalone Node contact-form API with file uploads and Cloudflare Turnstile spam protection.

## Stack

- **Frontend** (this directory): React 18, Vite 5, TypeScript, Tailwind 3, shadcn/ui (Radix),
  Framer Motion, React Router, PDF generation (pdf-lib, client-side).
- **API** (`/server`): Express, multer (memory storage), nodemailer, helmet, express-rate-limit,
  zod, TypeScript ESM. Binds `127.0.0.1:4000` only — reachable exclusively through nginx.

## Running locally

```sh
# 1. Install frontend + API dependencies
npm i
npm i --prefix server

# 2. Configure environment
#    Create server/.env from server/.env.example and fill in SMTP + Turnstile values.
#    Create .env from .env.example if you want a Turnstile widget during development.
#    (SMTP and Turnstile both degrade gracefully: without SMTP the email send fails with
#     a friendly message; without the secret key verification is skipped for local testing.)

# 3. Run web (vite, port 8080) + API together
npm run dev:all

# ...or run them separately
npm run dev          # vite only
npm run dev:api      # API only (tsx watch)
```

Vite proxies `/api/*` to `http://localhost:4000` in development, so the form works as-is at
http://localhost:8080.

## Environment variables

| File                 | Variable              | Purpose                                          |
| -------------------- | --------------------- | ------------------------------------------------ |
| `.env`               | `VITE_TURNSTILE_SITE_KEY` | Turnstile site key (exposed to the browser). Empty hides the widget. |
| `server/.env`        | `SMTP_HOST` / `PORT` etc. | API config — copy from `server/.env.example`.     |

`.env` files are gitignored; the `.env.example` files document every key.

## Contact form behaviour

- Up to 5 attachments (PDF, DOC, DOCX, JPG, PNG), 10 MB total — validated client-side and
  server-side (extension + declared MIME + magic bytes).
- Turnstile widget + a honeypot field. If the honey pot is tripped or Turnstile fails, the API
  returns a fake success and sends nothing.
- Rate limited to 5 submissions per IP per 15 minutes (429 beyond that).
- Uploads live in memory only — never written to disk, never logged.
- Submissions go to `CONTACT_TO_EMAIL` as an HTML email with attachments; a confirmation
  auto-reply goes to the sender.

## API

See [server/README.md](server/README.md) for endpoints, validation rules and error codes.

```sh
curl http://127.0.0.1:4000/api/health   # {"status":"ok"}
```

## Production deployment

- **cPanel shared hosting** (Setup Node.js App): see **[deploy/CPANEL.md](deploy/CPANEL.md)** —
  build a zip with `powershell -File deploy\build-cpanel.ps1` and follow the guide.
- **VPS (nginx + PM2)**:

Prerequisites on the server: Node >= 18, pm2 (`npm i -g pm2`), nginx, certbot.

1. **Ship the code** to `/var/www/kenyan-legal-beacon` (git pull or rsync, excluding
   `node_modules`, `.env`, `.git`).
2. **Configure the API**: copy `server/.env.example` to `server/.env` and set real SMTP
   credentials and the Turnstile secret.
3. **Build + start**: run `bash deploy/deploy.sh` — it installs dependencies, builds both
   packages, (re)starts the API under PM2 and reloads nginx.
4. **nginx**: install `deploy/nginx.conf` as `/etc/nginx/sites-available/kenyan-legal-beacon`,
   symlink into `sites-enabled`, replace `your-domain.com`, `nginx -t` then reload.
5. **TLS**: `certbot --nginx -d your-domain.com -d www.your-domain.com`, then uncomment the
   HTTPS redirect block at the top of the nginx config and reload again.
6. **DNS**: point the domain's A records at the server IP (only 80/443/SSH should be open — the
   API listens on 127.0.0.1:4000 and must never be reachable from outside).

### Manual steps that cannot be automated

- SMTP credentials (sign up for/with your mail provider, create an app password, paste into `server/.env`).
- Cloudflare Turnstile site + secret keys (dashboard.cloudflare.com → Turnstile) — put the site
  key in `.env` and the secret in `server/.env`.
- DNS records and the certbot certificate.

## Commands

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Vite dev server (port 8080)                    |
| `npm run dev:api`     | API dev server (tsx watch, port 4000)          |
| `npm run dev:all`     | Both together via concurrently                 |
| `npm run build`       | Production build → `dist/`                     |
| `npm run lint`        | ESLint (frontend only; `server` is a separate package) |
| `npm run preview`     | Preview the production build                   |
| `npm run build --prefix server` | Build the API → `server/dist/`          |