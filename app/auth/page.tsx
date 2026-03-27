import { RegisterForm } from "@/components/auth/register-form"

export default function AuthPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1">
          <h1 className="font-heading text-xl font-semibold">Créer un compte</h1>
          <p className="text-sm text-muted-foreground">
            Rejoignez RPGnexus pour faire la pub de votre forum.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
