# Deploying to cPanel — "Setup Node.js App"

This site is a single Node application: the Express API **also serves the built
SPA**, so on cPanel everything runs through one Passenger app mapped to your
domain. No Apache proxying, no `.htaccess`, no PM2.

```
mwauramurokiadvocates.co.ke  ──►  Passenger app (startup file: server/dist/index.js)
                                    ├─ /api/*      → contact-form API
                                    └─ everything  → static files + SPA fallback
```

> Already have a site in `public_html`? It will **stop being served** at the
> domain root once the Node app is mapped there. Back anything up first.

---

## 0. Prerequisites

- Node.js ≥ 18 installed on your machine (for building).
- Access to cPanel for `mwauramurokiadvocates.co.ke`.
- The mailbox **`info@mwauramurokiadvocates.co.ke`** exists
  (cPanel → *Email Accounts*) and you know its password.
  Create it now if it doesn't exist — the contact form sends through it.
- Optional but recommended: free Cloudflare Turnstile keys for spam protection.
  1. <https://dash.cloudflare.com> → turnstile → *Add site* → domain `mwauramurokiadvocates.co.ke`.
  2. Copy the **Site Key** into a local `.env` file before building:
     `VITE_TURNSTILE_SITE_KEY=...`
  3. Copy the **Secret Key** — you'll paste it into cPanel in step 5.
  Skipping this is fine: the widget stays hidden and only the honeypot field
  protects the form.

## 1. Build the package

From the project folder:

```powershell
powershell -ExecutionPolicy Bypass -File deploy\build-cpanel.ps1
```

This produces **`deploy\out\cpanel-app.zip`** containing everything the server
needs (built site + compiled API + production `node_modules`).

> Prefer a tiny upload instead? Add `-HostInstall` to the command above and
> click **Run NPM Install** in cPanel after uploading (step 4).

## 2. Create the application in cPanel

1. cPanel → **Software** → **Setup Node.js App** → **Create Application**.
2. Fill in:

   | Field | Value |
   | --- | --- |
   | Node.js version | **20** (or 18/22 — newest your host offers ≥ 18) |
   | Application mode | **Production** (sets `NODE_ENV=production`) |
   | Application root | `mwaura-app` (relative to your home directory) |
   | Application URL | `mwauramurokiadvocates.co.ke` — leave the path **empty/root** |
   | Application startup file | `server/dist/index.js` |
   | Application title | `Mwaura Site` (any label) |

3. Click **Create**.

## 3. Upload and extract

1. cPanel → **File Manager** → open the new **`mwaura-app`** folder
   (it is in your home directory, *not* inside `public_html`).
2. **Upload** → select `deploy\out\cpanel-app.zip` → **Go Back to …**.
3. Select the zip → **Extract** → confirm it extracts *into* `mwaura-app`.
   You should now see `package.json`, `dist/`, `server/` in that folder.

## 4. Install dependencies (only if you used `-HostInstall`)

Back in **Setup Node.js App**, click the pencil (edit) next to your app →
**Run NPM Install**. If your package shipped with `node_modules` (the default),
skip this step entirely.

## 5. Environment variables

Still on the app's edit screen, use **Add Variable** to set:

| Name | Value |
| --- | --- |
| `SMTP_HOST` | `lim107.truehost.cloud` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `info@mwauramurokiadvocates.co.ke` (full email address) |
| `SMTP_PASS` | *(the mailbox's password)* |
| `CONTACT_TO_EMAIL` | `info@mwauramurokiadvocates.co.ke` |
| `CONTACT_FROM_EMAIL` | `info@mwauramurokiadvocates.co.ke` |
| `TURNSTILE_SECRET_KEY` | *(your Turnstile secret — omit if you skipped it)* |

These SMTP values are TrueHost's official settings for website forms
(port 587 with TLS = STARTTLS, which the app enables automatically on 587 —
no extra flag needed).

`NODE_ENV` is set automatically by *Application mode: Production*.
`PORT` is assigned by Passenger — never hardcode it (the app already reads it
from the environment).

**Alternative:** instead of the env editor, upload a `.env` file (copy
`server/.env.example`, fill it in) directly into the `mwaura-app` root.
Variables set in cPanel's editor always win over the file.

## 6. Start the app

Click **Restart** (or Start) on the app's row. Status should show **Running**.

## 7. SSL certificate

cPanel → **SSL/TLS Status** → select the domain → **Run AutoSSL**.
Wait for the green icon, then load the site over `https://` — Turnstile and
mixed-content-free assets require it.

## 8. Verify

| Check | Expected |
| --- | --- |
| `https://mwauramurokiadvocates.co.ke/api/health` | `{"status":"ok"}` |
| Homepage | Site renders with fonts and images |
| Refresh a deep link, e.g. `https://mwauramurokiadvocates.co.ke/contact` | Page still loads (SPA fallback) |
| Contact form submit | Success message; email arrives at the info@ mailbox; auto-reply at the sender's address |
| Attach a ~3 MB file to the form | Upload accepted (some hosts cap request size — if rejected, lower `MAX_TOTAL_UPLOAD_MB`) |
| `https://www.mwauramurokiadvocates.co.ke` | Redirects to / serves the same site |

---

## Updating the site later

1. Re-run `deploy\build-cpanel.ps1`.
2. File Manager → delete the old `dist/` and `server/dist/` (or just overwrite).
3. Upload + extract the new zip again.
4. **Restart** the app in Setup Node.js App.

## Troubleshooting

- **503 / Passenger error page** → the app crashed on boot.
  Read **`mwaura-app/stderr.log`** (File Manager, next to `package.json`);
  the exact error is there. After any fix: **Restart**.
- **Page loads but `/api/*` 404s** → startup file wrong or `server/dist`
  missing; the startup file must be `server/dist/index.js`.
- **Emails fail ("Failed to send your message")** →
  check `stderr.log` for the SMTP error. Confirm the variables exactly match
  TrueHost's settings above: host `lim107.truehost.cloud`, port `587`,
  username = the **full** email address, and the mailbox password
  (cPanel → Email Accounts → *Connect Devices* shows the current password
  expectations; reset it there if unsure).
- **Fonts/stylesheet blocked in the browser console** → a CSP error; the
  headers are configured in `server/src/app.ts` (helmet directives).
- **Old files still served** → you extracted over the old copy; delete
  `dist/`/`server/dist` first, then re-extract and restart.
- **Node version errors** → edit the app and pick a newer Node version, then
  restart.
