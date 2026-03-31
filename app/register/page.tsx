import { SignUp } from "@clerk/nextjs"

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <SignUp />
    </div>
  )
}
