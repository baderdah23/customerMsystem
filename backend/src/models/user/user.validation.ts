import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().trim().min(2).max(50),
  password: z.string().trim().min(6).max(255),
  email: z.email(),
});
