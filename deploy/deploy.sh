#!/usr/bin/env bash
# Deploy the Kenyan Legal Beacon site on a fresh build.
# Run as a user with pm2 + sudo rights on the server, from the repo root
# (the repo is expected at /var/www/kenyan-legal-beacon, e.g. via git pull or rsync).
# Prerequisites: node >= 18, npm, pm2 (npm i -g pm2), nginx, a certbot cert if using TLS.
set -euo pipefail

APP_DIR="/var/www/kenyan-legal-beacon"
API_NAME="kenyan-legal-beacon-api"

if [[ ! -f "$APP_DIR/deploy/ecosystem.config.cjs" ]]; then
  echo "ERROR: run this script from the repo root on the server ($APP_DIR)." >&2
  exit 1
fi

cd "$APP_DIR"

echo "==> Frontend: install + build"
npm ci
npm run build

echo "==> API: install + build"
npm ci --prefix server
npm run build --prefix server

echo "==> Restart API via PM2"
if pm2 reload "$API_NAME" --update-env >/dev/null 2>&1; then
  :
else
  pm2 start deploy/ecosystem.config.cjs >/dev/null
fi
pm2 save >/dev/null

echo "==> Reload nginx (static assets changed)"
nginx -t >/dev/null && systemctl reload nginx

echo "==> Done. API status:"
pm2 status "$API_NAME" | grep -E "(name|App name|$API_NAME)" || pm2 status "$API_NAME"

echo ""
echo "Sanity check: curl -s http://127.0.0.1:4000/api/health  (expect {\"status\":\"ok\"})"
echo "From the internet: curl -s https://your-domain.com/api/health"