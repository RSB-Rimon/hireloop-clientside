import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import logo from "@/app/images/logo.png"

const links = [
  { label: "Browse Jobs", href: "#jobs" },
  { label: "Company", href: "#company" },
  { label: "Pricing", href: "#pricing" },
]

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label="Main navigation"
      className={mobile ? "flex flex-col gap-1" : "hidden items-center gap-8 md:flex"}
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={
            mobile
              ? "rounded-md px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              : "text-xs text-zinc-300 transition-colors hover:text-white"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function SiteNavbar() {
  return (
    <header className="w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-xl border border-white/[0.06] bg-zinc-900/90 px-4 py-3 shadow-lg shadow-black/20 sm:px-6">
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

        <div className="hidden items-center gap-8 md:flex">
          <NavLinks />
          <span aria-hidden="true" className="h-5 w-px bg-white/10" />
          <Link
            href="/sign-in"
            className="text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            Sign In
          </Link>
          <Button
            render={<Link href="/get-started" />}
            className="h-8 rounded-lg bg-indigo-500 px-4 text-xs text-white shadow-[0_0_18px_rgba(99,102,241,0.35)] hover:bg-indigo-400"
          >
            Get Started
          </Button>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-9 cursor-pointer list-none flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 text-zinc-200 transition hover:bg-white/5 [&::-webkit-details-marker]:hidden">
            <span className="h-0.5 w-4 rounded bg-current transition group-open:translate-y-1 group-open:rotate-45" />
            <span className="h-0.5 w-4 rounded bg-current transition group-open:-translate-y-1 group-open:-rotate-45" />
            <span className="sr-only">Toggle navigation menu</span>
          </summary>
          <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border border-white/10 bg-zinc-900 p-3 shadow-xl shadow-black/40">
            <NavLinks mobile />
            <div className="my-2 border-t border-white/10" />
            <div className="flex items-center gap-2 p-1">
              <Button
                render={<Link href="/sign-in" />}
                variant="ghost"
                className="flex-1 text-zinc-200 hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                render={<Link href="/get-started" />}
                className="flex-1 bg-indigo-500 text-white hover:bg-indigo-400"
              >
                Get Started
              </Button>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}


