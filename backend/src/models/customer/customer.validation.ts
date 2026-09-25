import { z } from "zod";

export const CustomerSchema = z.object({
  first_name: z.string().trim().min(2).max(50),
  last_name: z.string().trim().min(2).max(50),
  email: z.email(),
  telephone: z.string().trim().max(20),
  gender: z.string(),
  age: z.coerce.number(),
  country: z.string().trim().max(60),
});
