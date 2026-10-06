const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const VERIFY_TIMEOUT_MS = 5000;

/**
 * Verify a Cloudflare Turnstile token.
 *
 * - Empty/undefined secret → dev mode: always returns true (the caller logs a
 *   one-time warning so verification is never silently disabled in prod).
 * - Missing token → false.
 * - Network/timeout errors → false (fail closed).
 * The token and secret are never logged.
 */
export async function verifyTurnstile(token: string | undefined, secret: string): Promise<boolean> {
  if (!secret || secret.trim() === '') {
    return true;
  }

  if (!token || token.trim() === '') {
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);

  try {
    const body = new URLSearchParams({ secret, response: token });
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: unknown };
    return data.success === true;
  } catch {
    // Network failure or 5s timeout — never surface details to the caller.
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
