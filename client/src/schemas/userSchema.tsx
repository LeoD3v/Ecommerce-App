import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(4, "Name is required or wronge name"),
  email: z.string().min(6, "Email is required or incorrect email"),
  password: z.string().min(4, "Password is required or wrong password"),
});

export type UserSchemaLogin = z.infer<typeof userSchema>;
