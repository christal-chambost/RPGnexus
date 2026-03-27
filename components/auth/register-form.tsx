"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth"
import { registerUser } from "@/lib/actions/register"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  function onSubmit(values: RegisterFormValues) {
    setServerError(null)
    startTransition(async () => {
      const result = await registerUser(values)
      if (result.success) {
        setSuccess(true)
      } else {
        setServerError(result.error)
      }
    })
  }

  if (success) {
    return (
      <p className="text-sm text-muted-foreground">
        Inscription réussie ! Vous pouvez maintenant vous connecter.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="pseudo">Pseudonyme</FieldLabel>
          <Input
            id="pseudo"
            placeholder="Votre pseudo"
            aria-invalid={!!errors.pseudo}
            {...register("pseudo")}
          />
          <FieldError errors={[errors.pseudo]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          <Input
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">
            Confirmer le mot de passe
          </FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
      </FieldGroup>

      {serverError && (
        <p className="text-xs text-destructive">{serverError}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Inscription en cours…" : "S'inscrire"}
      </Button>
    </form>
  )
}
