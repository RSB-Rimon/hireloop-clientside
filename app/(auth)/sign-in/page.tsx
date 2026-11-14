"use client"

import { authClient } from "@/app/lib/auth-client"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { FormField } from "@/components/ui/form-field"
import { Typography } from "@/components/ui/typography"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { FormEvent } from "react"

export default function SignInPage() {
  const router = useRouter()

  const handleSignInEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries())

    const { data, error } = await authClient.signIn.email({
      email: values.email as string,
      password: values.password as string,
    })

    if (data) {
      console.log("Sign In successfully", data)
      router.replace("/")
      router.refresh()
    }

    if (error) {
      console.error("Error signing in:", error)
    }
  }

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Pick up where you left off and find your next opportunity."
      footer={
        <Typography
          as="p"
          variant="control"
          className="mt-6 text-center text-zinc-400"
        >
          Don&apos;t have an account?{" "}
          <Link
            className="type-weight-medium text-indigo-300 transition hover:text-indigo-200"
            href="/sign-up"
          >
            Create one
          </Link>
        </Typography>
      }
      legal={
        <>
          By continuing, you agree to Hireloop&apos;s terms and privacy policy.
        </>
      }
    >
      <form onSubmit={handleSignInEmail} className="space-y-5">
        <FormField label="Email address" layout="auth">
          <AuthInput
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </FormField>

        <FormField label="Password" layout="auth">
          <AuthInput
            autoComplete="current-password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </FormField>

        <label className="type-control flex items-center gap-2.5 text-zinc-400">
          <input
            className="size-4 rounded border-white/20 bg-[#101010] accent-indigo-500 focus:ring-indigo-400"
            name="rememberMe"
            type="checkbox"
            value="yes"
          />
          Remember me
        </label>

        <AuthSubmitButton>Sign in</AuthSubmitButton>
      </form>
    </AuthCard>
  )
}
