"use client"

import Link from "next/link"
// import type { FormEvent } from "react"

// function handleSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault()

//   const formData = new FormData(event.currentTarget)
//   const values = Object.fromEntries(formData.entries())

//     console.log("Form submitted with values:", values)
// }

export default function SignInPage() {
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
              Welcome back
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Pick up where you left off and find your next opportunity.
            </p>
          </div>

          <form  className="space-y-5">
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
                autoComplete="current-password"
                className="h-11 w-full rounded-lg border border-white/10 bg-[#101010] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                name="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </label>

            <label className="flex items-center gap-2.5 text-sm text-zinc-400">
              <input
                className="size-4 rounded border-white/20 bg-[#101010] accent-indigo-500 focus:ring-indigo-400"
                name="rememberMe"
                type="checkbox"
                value="yes"
              />
              Remember me
            </label>

            <button
              className="flex h-11 w-full items-center justify-center rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
              type="submit"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              className="font-medium text-indigo-300 transition hover:text-indigo-200"
              href="/sign-up"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          By continuing, you agree to Hireloop&apos;s terms and privacy policy.
        </p>
      </section>
    </main>
  )
}
