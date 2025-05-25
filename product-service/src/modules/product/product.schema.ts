import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  imageKey: z.string(), // this is the s3 image key name
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
