import { z } from "zod";

export const personSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long"),

  email: z
    .string()
    .email("Email invalide"),

  role: z
    .string().default("user").optional(),
});

export type PersonSchema = z.infer<typeof personSchema>;