"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validations/auth"

type RegisterResult = { success: true } | { success: false; error: string }

export async function registerUser(values: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(values)

  if (!parsed.success) {
    return { success: false, error: "Données invalides." }
  }

  const { email, pseudo, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { success: false, error: "Cette adresse email est déjà utilisée." }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: { email, pseudo, password: hashedPassword },
  })

  return { success: true }
}
