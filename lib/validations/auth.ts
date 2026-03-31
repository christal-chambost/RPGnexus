import { z } from "zod"

export const registerSchema = z
  .object({
    email: z.string().email("L'adresse email est invalide"),
    pseudo: z.string().min(2, "Le pseudo doit contenir au minimum 2 caractères").max(32),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au minimum 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>