import { z } from 'zod';

/**
 * Contact form field schema. All string inputs are trimmed before validation.
 * `honeypot` and `turnstileToken` are anti-spam fields: they are accepted here
 * but interpreted by the route, not by the consumer of the parsed result.
 */
export const contactSchema = z.object({
  name: z.string({ required_error: 'Please provide your full name.' }).trim().min(2, 'Name must be at least 2 characters.').max(120, 'Name must be at most 120 characters.'),
  email: z.string({ required_error: 'Please provide your email address.' }).trim().email('Please provide a valid email address.').max(254, 'Email must be at most 254 characters.'),
  phone: z.string().trim().max(40, 'Phone must be at most 40 characters.').optional(),
  subject: z.string().trim().max(200, 'Subject must be at most 200 characters.').optional(),
  message: z.string({ required_error: 'Please include a message.' }).trim().min(1, 'Message is required.').max(8000, 'Message must be at most 8000 characters.'),
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactFields = z.infer<typeof contactSchema>;

/**
 * Parse raw form fields (typically multer-populated `req.body`).
 * Throws a ZodError when the input does not satisfy the schema.
 */
export function parseContactFields(raw: Record<string, unknown>): ContactFields {
  return contactSchema.parse(raw);
}
