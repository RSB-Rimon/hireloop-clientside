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
import { useState } from "react"

export default function SignUpPage() {
  const router = useRouter()
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignUpEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError("")

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")
    const role = formData.get("role")
    if (role !== "seeker" && role !== "recruiter" && role !== "admin") {
      setFormError("Please choose a valid account type.")
      return
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        role,
        callbackURL: "/",
      })

      if (error) {
        setFormError(error.message ?? "Unable to create your account.")
        return
      }

      if (data) {
        router.replace("/")
        router.refresh()
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      eyebrow="Get started"
      title="Create your account"
      description="Join Hireloop and take the next step in your career."
      footer={
        <Typography
          as="p"
          variant="control"
          className="mt-6 text-center text-zinc-400"
        >
          Already have an account?{" "}
          <Link
            className="type-weight-medium text-indigo-300 transition hover:text-indigo-200"
            href="/sign-in"
          >
            Sign in
          </Link>
        </Typography>
      }
      legal={
        <>
          By creating an account, you agree to Hireloop&apos;s terms and privacy
          policy.
        </>
      }
    >
      <form onSubmit={handleSignUpEmail} className="space-y-4">
        <FormField label="Full name" layout="auth">
          <AuthInput
            autoComplete="name"
            name="name"
            placeholder="Alex Morgan"
            required
            type="text"
          />
        </FormField>

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
            autoComplete="new-password"
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            required
            type="password"
          />
        </FormField>

        <FormField label="Confirm password" layout="auth">
          <AuthInput
            autoComplete="new-password"
            minLength={8}
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
            type="password"
          />
        </FormField>

        <fieldset className="space-y-2">
          <legend className="type-label text-zinc-200">
            I want to join as a
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="type-control type-weight-medium flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#101010] px-3 py-3 text-zinc-200 select-none">
              <input
                type="radio"
                name="role"
                value="seeker"
                className="size-4 accent-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-300"
                defaultChecked
              />
              Seeker
            </label>
            <label className="type-control type-weight-medium flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#101010] px-3 py-3 text-zinc-200 select-none">
              <input
                type="radio"
                name="role"
                value="recruiter"
                className="size-4 accent-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-300"
              />
              Recruiter
            </label>
            <label className="type-control type-weight-medium flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#101010] px-3 py-3 text-zinc-200 select-none">
              <input
                type="radio"
                name="role"
                value="admin"
                className="size-4 accent-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-300"
              />
              Admin
            </label>
          </div>
          <Typography as="p" variant="note" className="text-zinc-500">
            Admin signup is temporarily enabled for testing.
          </Typography>
        </fieldset>

        <AuthSubmitButton className="mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </AuthSubmitButton>
        {formError && (
          <p
            aria-live="polite"
            className="type-control text-red-400"
            role="alert"
          >
            {formError}
          </p>
        )}
      </form>
    </AuthCard>
  )
}
