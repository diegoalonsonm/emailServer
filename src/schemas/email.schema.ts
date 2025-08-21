import { z } from 'zod'

export const EmailSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email()).nonempty()]),
  subject: z.string().min(1),
  text: z.string().optional(),
  html: z.string().optional(),
  template: z.object({
    name: z.string().min(1),
    data: z.record(z.string(), z.any()).optional(),
    mjml: z.boolean().optional()
  }).optional(),
  attachments: z.array(z.object({
    filename: z.string(),
    content: z.any().optional(),
    path: z.string().optional(),
    contentType: z.string().optional()
  })).optional(),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  replyTo: z.string().email().optional(),
  from: z.string().optional()
});

export type EmailPayload = z.infer<typeof EmailSchema>