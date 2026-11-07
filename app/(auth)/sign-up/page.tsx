"use client"

import Link from "next/link"
import type { FormEvent } from "react"

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const values = Object.fromEntries(formData.entries())

  console.info("Sign-up form submitted. Connect your auth logic here.", {
    ...values,
    password: "[redacted]",
    confirmPassword: "[redacted]",
  })
}

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#101010] px-4 py-12 text-white sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.16),transparent_48%)]"
      />

      <section className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500 text-base font-bold shadow-[0_0_22px_rgba(99,102,241,0.3)]">
            H
          </span>
          Hireloop
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#171717]/95 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="mb-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-indigo-300">
              Get started
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Join Hireloop and take the next step in your career.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2 text-sm font-medium text-zinc-200">
              Full name
              <input
                autoComplete="name"
                className="h-11 w-full rounded-lg border border-white/10 bg-[#101010] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                name="name"
                placeholder="Alex Morgan"
                required
                type="text"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-zinc-200">
              Email address
              <input
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-white/10 bg-[#101010] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-zinc-200">
              Password
              <input
                autoComplete="new-password"
                className="h-11 w-full rounded-lg border border-white/10 bg-[#101010] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                minLength={8}
                name="password"
                placeholder="At least 8 characters"
                required
                type="password"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-zinc-200">
              Confirm password
              <input
                autoComplete="new-password"
                className="h-11 w-full rounded-lg border border-white/10 bg-[#101010] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                minLength={8}
                name="confirmPassword"
                placeholder="Re-enter your password"
                required
                type="password"
              />
            </label>

            <button
              className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
              type="submit"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              className="font-medium text-indigo-300 transition hover:text-indigo-200"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          By creating an account, you agree to Hireloop&apos;s terms and privacy policy.
        </p>
      </section>
    </main>
  )
}
