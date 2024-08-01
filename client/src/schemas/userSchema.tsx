import { z, ZodError } from "zod";

export const userSchema = z.object({
  name: z.string().min(8, "Name is Required"),
  email: z.string().min(10, "Email is Required"),
  password: z.string().min(8, "Password is Required"),
});

export type UserSchemaLogin = z.infer<typeof userSchema>;
