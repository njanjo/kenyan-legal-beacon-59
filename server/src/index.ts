// Import config first: evaluating it loads dotenv before anything else runs.
import { config } from './config.js';
import { createApp } from './app.js';

const app = createApp();

const server = app.listen(config.PORT, config.HOST, () => {
  console.log(`API listening on http://${config.HOST}:${config.PORT}`);
  console.log('Bind is 127.0.0.1 only — this API must be reachable exclusively through nginx.');
});

function shutdown(signal: string): void {
  console.log(`${signal} received — shutting down gracefully.`);
  server.close(() => {
    process.exit(0);
  });
  // Force-exit if connections refuse to drain.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
