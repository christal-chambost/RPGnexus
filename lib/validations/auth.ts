import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.string().email("Adresse email invalide"),
    pseudo: z.string().min(2, "Au moins 2 caractères").max(32),
    password: z
      .string()
      .min(8, "Au moins 8 caractères")
      .regex(/[A-Z]/, "Doit contenir une majuscule")
      .regex(/[0-9]/, "Doit contenir un chiffre"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>