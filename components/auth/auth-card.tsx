import type { ReactNode } from "react"
import Link from "next/link"
import { Typography } from "@/components/ui/typography"

type AuthCardProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
  legal: ReactNode
}

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
  legal,
}: AuthCardProps) {
  return (
    <main className="auth-page sm:px-6">
      <div aria-hidden="true" className="auth-page-glow" />
      <section className="relative w-full max-w-md">
        <Link
          href="/"
          className="type-control type-weight-semibold mb-8 inline-flex items-center gap-2 tracking-tight text-white"
        >
          <span className="auth-brand-mark">H</span>
          Hireloop
        </Link>

        <div className="auth-panel">
          <div className="mb-7">
            <Typography as="p" variant="small" className="auth-eyebrow">
              {eyebrow}
            </Typography>
            <Typography as="h1" variant="authTitle" className="text-white">
              {title}
            </Typography>
            <Typography as="p" variant="body" className="mt-2 text-zinc-400">
              {description}
            </Typography>
          </div>
          {children}
          {footer}
        </div>

        <Typography
          as="p"
          variant="small"
          className="mt-6 text-center text-zinc-600"
        >
          {legal}
        </Typography>
      </section>
    </main>
  )
}
