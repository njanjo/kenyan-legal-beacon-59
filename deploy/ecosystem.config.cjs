// PM2 process config for the contact-form API.
// Started from the repo root:  pm2 start deploy/ecosystem.config.cjs
// Reload after deploys:       pm2 reload kenyan-legal-beacon-api --update-env
// The API reads its configuration from server/.env (loaded by dotenv in config.ts).
module.exports = {
  apps: [
    {
      name: "kenyan-legal-beacon-api",
      cwd: "/var/www/kenyan-legal-beacon/server",
      script: "dist/index.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};