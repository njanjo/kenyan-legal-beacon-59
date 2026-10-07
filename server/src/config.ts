import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Load environment variables once, at module evaluation time.
// 1. .env in the working directory (dev: `server/`; cPanel/Passenger: the
//    application root). Passenger-provided variables already exist in
//    process.env, and dotenv never overwrites those — so cPanel's
//    "Environment Variables" always win over a shipped .env file.
// 2. server/.env resolved next to this file — fallback in case the process
//    working directory is not where we expect it.
dotenv.config();
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(moduleDir, '..', '.env') });

function readString(key: string, fallback = ''): string {
  const value = process.env[key];
  return value === undefined ? fallback : value;
}

function readInt(key: string, fallback: number): number {
  const raw = process.env[key];
  if (raw === undefined || raw.trim() === '') return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Application configuration, derived from process.env.
 *
 * SMTP variables are intentionally exposed as possibly-empty strings: the API
 * must boot without them (useful in dev) and only fail lazily when a send is
 * actually attempted (see mailer.ts).
 */
export const config = {
  PORT: readInt('PORT', 4000),
  HOST: '127.0.0.1',

  SMTP_HOST: readString('SMTP_HOST'),
  SMTP_PORT: readInt('SMTP_PORT', 587),
  SMTP_USER: readString('SMTP_USER'),
  SMTP_PASS: readString('SMTP_PASS'),
  CONTACT_TO_EMAIL: readString('CONTACT_TO_EMAIL'),
  CONTACT_FROM_EMAIL: readString('CONTACT_FROM_EMAIL'),

  /**
   * Dedicated no-reply sender for the client acknowledgement email.
   * Falls back to CONTACT_FROM_EMAIL when unset. Create this mailbox
   * (or forwarder) in cPanel so SPF/DKIM align with the firm's domain.
   */
  NO_REPLY_EMAIL: readString('NO_REPLY_EMAIL'),

  /** Display name used in the no-reply acknowledgement ("Firm (No Reply)"). */
  FIRM_NAME: readString('FIRM_NAME', 'Mwaura Muroki Associates & Advocates'),

  /** May be empty in dev; an empty secret disables verification (turnstile.ts). */
  TURNSTILE_SECRET_KEY: readString('TURNSTILE_SECRET_KEY'),

  MAX_TOTAL_UPLOAD_MB: readInt('MAX_TOTAL_UPLOAD_MB', 10),
} as const;

export const MAX_TOTAL_UPLOAD_BYTES = config.MAX_TOTAL_UPLOAD_MB * 1024 * 1024;

export type AppConfig = typeof config;
