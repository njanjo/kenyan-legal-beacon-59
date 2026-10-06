# kenyan-legal-beacon-api

Standalone contact-form API with file uploads for the Kenyan legal website.

- **Runtime:** Node.js ≥ 18 (ESM, TypeScript)
- **Bind:** `127.0.0.1:4000` only — reachable exclusively through nginx, never exposed publicly
- **Uploads:** memory storage only (nothing is written to disk)

## Endpoints

| Method | Path            | Purpose                                  |
| ------ | --------------- | ---------------------------------------- |
| GET    | `/api/health`   | Liveness check (no rate limit)           |
| POST   | `/api/contact`  | Submit a contact form (+ attachments)    |

### POST /api/contact

`multipart/form-data` fields:

| Field           | Required | Notes                                        |
| --------------- | -------- | -------------------------------------------- |
| `name`          | yes      | 2–120 chars                                  |
| `email`         | yes      | valid email, ≤ 254 chars                     |
| `phone`         | no       |                                                |
| `subject`       | no       | ≤ 200 chars                                  |
| `message`       | yes      | ≤ 8000 chars                                 |
| `honeypot`      | no       | anti-spam trap — must stay empty             |
| `turnstileToken`| no       | Cloudflare Turnstile token                   |
| `files`         | no       | ≤ 5 files; PDF, DOC, DOCX, JPG, PNG; 10 MB total |

**Files are validated three ways:** extension, declared MIME (advisory), and magic bytes (`%PDF`, OLE2, ZIP, JPEG, PNG headers). Content that does not match its extension is rejected.

**Responses**

- `200 { success: true }` — email queued/sent, **or** fake success for bots (honeypot tripped or Turnstile failed)
- `400 { error }` — validation failed (fields or files)
- `413 { error }` — upload exceeds the 10 MB total cap
- `429 { error }` — rate limited (5 submissions per IP per 15 minutes)
- `500 { error }` — SMTP failure or unexpected error

**Security defaults**

- `helmet` headers, `x-powered-by` disabled
- `app.set('trust proxy', 1)` so rate limiting sees the real client IP behind nginx
- All user input HTML-escaped in emails; control characters stripped
- Message text and file names/contents are never logged
- Turnstile secret and tokens are never logged

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable                | Default | Notes                                          |
| ----------------------- | ------- | ---------------------------------------------- |
| `PORT`                  | `4000`  | Bound to 127.0.0.1                             |
| `SMTP_HOST`             | —       | SMTP server                                     |
| `SMTP_PORT`             | `587`   | `465` enables implicit TLS                      |
| `SMTP_USER`             | —       | SMTP username                                   |
| `SMTP_PASS`             | —       | SMTP password / app token                       |
| `CONTACT_TO_EMAIL`      | —       | Inbox receiving form notifications              |
| `CONTACT_FROM_EMAIL`    | —       | From-address for notifications and auto-replies |
| `TURNSTILE_SECRET_KEY`  | —       | Cloudflare Turnstile secret (empty = off, dev)  |
| `MAX_TOTAL_UPLOAD_MB`   | `10`    | Combined upload cap                             |

> SMTP is validated lazily: the API boots without it and only fails when a send is attempted.

## Development

```sh
npm install
npm run dev        # tsx watch src/index.ts — reloads on save
```

## Production

```sh
npm run build      # tsc → dist/
npm start          # node dist/index.js
```

The root `deploy/deploy.sh` script (see the repo README) builds and restarts the API via PM2.