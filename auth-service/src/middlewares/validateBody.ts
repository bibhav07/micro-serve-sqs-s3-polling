import { ZodSchema } from "zod";

// This middleware validates the request body against a Zod schema.
export const validateBody = (schema: ZodSchema) => (req:any, res:any, next:any) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return next(parsed.error);

  req.body = parsed.data;
  next();
};
