import dotenv from 'dotenv';

// Load environment variables once, at module evaluation time.
dotenv.config();

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

  /** May be empty in dev; an empty secret disables verification (turnstile.ts). */
  TURNSTILE_SECRET_KEY: readString('TURNSTILE_SECRET_KEY'),

  MAX_TOTAL_UPLOAD_MB: readInt('MAX_TOTAL_UPLOAD_MB', 10),
} as const;

export const MAX_TOTAL_UPLOAD_BYTES = config.MAX_TOTAL_UPLOAD_MB * 1024 * 1024;

export type AppConfig = typeof config;
