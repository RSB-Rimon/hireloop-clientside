"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signOut, useSession } from "@/app/lib/auth-client"
import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"

const links = [
  { label: "Browse Jobs", href: "#jobs" },
  { label: "Company", href: "#company" },
  { label: "Pricing", href: "#pricing" },
]

export function SiteNavbar() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const [menuOpen, setMenuOpen] = useState(false)

  const isLoggedIn = !!session?.user

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
          router.refresh()
        },
      },
    })
  }

  return (
    <header className="w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-xl border border-white/[0.06] bg-zinc-900/90 px-4 py-3 shadow-lg shadow-black/20 sm:px-6">
        {/* Logo */}
        <Link href="/" aria-label="Hireloop home" className="shrink-0">
          <Image
            src={logo}
            alt="Hireloop"
            width={112}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Navigation Links */}
          <nav aria-label="Main navigation" className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="type-small text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span className="h-5 w-px bg-white/10" />

          {/* Authentication */}
          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : isLoggedIn ? (
            <>
              <span className="type-small max-w-32 truncate text-zinc-300">
                Hi, {session.user.name}
              </span>

              <Button
                render={
                  <Link href={`/dashboard/${session.user.role || "seeker"}`} />
                }
                className="type-small h-8 rounded-lg bg-indigo-500 px-4 text-white hover:bg-indigo-400"
              >
                Dashboard
              </Button>

              <Button
                variant="ghost"
                onClick={handleSignOut}

                className="type-small h-8 hover:cursor-pointer"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="type-small type-weight-medium text-indigo-300 transition-colors hover:text-indigo-200"
              >
                Sign In
              </Link>

              <Button
                render={<Link href="/sign-up" />}
                className="type-small h-8 rounded-lg bg-indigo-500 px-4 text-white shadow-[0_0_18px_rgba(99,102,241,0.35)] hover:bg-indigo-400"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="relative md:hidden">
          {/* Hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 text-zinc-200 transition hover:bg-white/5"
          >
            <span
              className={`h-0.5 w-4 rounded bg-current transition ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 rounded bg-current transition ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border border-white/10 bg-zinc-900 p-3 shadow-xl shadow-black/40">
              {/* Links */}
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="type-control rounded-md px-3 py-2.5 text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="my-2 border-t border-white/10" />

              {/* Mobile Authentication */}
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-white/5" />
              ) : isLoggedIn ? (
                <div className="space-y-2">
                  <div className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="type-small text-zinc-500">Signed in as</p>
                    <p className="type-control type-weight-medium truncate text-white">
                      {session.user.name}
                    </p>
                  </div>

                  <Button
                    render={
                      <Link
                        href={`/dashboard/${session.user.role || "seeker"}`}
                      />
                    }
                    onClick={() => setMenuOpen(false)}
                    className="w-full bg-indigo-500 text-white hover:bg-indigo-400"
                  >
                    Dashboard
                  </Button>

                  <Button
                    variant="ghost"

                    onClick={handleSignOut}
                    className="w-full text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    render={<Link href="/sign-in" />}
                    variant="ghost"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-zinc-200 hover:bg-white/5 hover:text-white"
                  >
                    Sign In
                  </Button>

                  <Button
                    render={<Link href="/sign-up" />}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 bg-indigo-500 text-white hover:bg-indigo-400"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
