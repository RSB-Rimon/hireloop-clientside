import Image from "next/image"
import Link from "next/link"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"
import globe from "@/app/images/globe.png"

const popularSearches = ["Product Designer", "AI Engineer", "Data Analyst", "Frontend Developer"]

export default function HomePage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#101010] text-white">
      <SiteNavbar />

      <section className="relative isolate flex min-h-[calc(100svh-64px)] flex-col overflow-hidden px-4 pt-14 sm:px-6 sm:pt-16 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_24%,rgba(255,255,255,0.08),transparent_54%),linear-gradient(180deg,#101010_0%,#050505_48%,#000_100%)]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#171717] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-300 shadow-lg sm:text-xs">
            <BriefcaseBusiness aria-hidden="true" className="size-3.5 text-orange-400" />
            <span className="font-semibold text-white">50,000+</span>
            <span className="text-zinc-500">new jobs this month</span>
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:mt-7 sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
            Find Your Dream Job Today
          </h1>
          <p className="mt-4 max-w-xl text-xs leading-5 text-zinc-400 sm:text-sm sm:leading-6">
            Hireloop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
          </p>

          <form
            action="/jobs"
            className="mt-7 flex w-full max-w-2xl flex-col gap-1.5 rounded-xl border border-white/10 bg-[#191919] p-1.5 shadow-2xl shadow-black/40 sm:mt-8 sm:flex-row sm:items-center sm:gap-0 sm:rounded-2xl"
          >
            <label className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 sm:py-2">
              <Search aria-hidden="true" className="size-4 shrink-0 text-zinc-400" />
              <span className="sr-only">Job title, skill or company</span>
              <input
                name="q"
                type="search"
                placeholder="Job title, skill or company"
                className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-zinc-500 sm:text-sm"
              />
            </label>
            <span aria-hidden="true" className="hidden h-7 w-px bg-white/10 sm:block" />
            <label className="flex min-w-0 flex-1 items-center gap-2.5 border-t border-white/[0.06] px-3 py-2.5 sm:border-0 sm:py-2">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-zinc-400" />
              <span className="sr-only">Location or remote</span>
              <input
                name="location"
                type="text"
                placeholder="Location or Remote"
                className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-zinc-500 sm:text-sm"
              />
            </label>
            <button
              type="submit"
              aria-label="Search jobs"
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-400 sm:size-10 sm:shrink-0 sm:px-0"
            >
              <span className="sm:hidden">Search jobs</span>
              <Search aria-hidden="true" className="hidden size-4 sm:block" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:gap-2.5 sm:text-xs">
            <span className="mr-1 text-zinc-500">Trending:</span>
            {popularSearches.map((search) => (
              <Link
                key={search}
                href={`/jobs?q=${encodeURIComponent(search)}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:px-3"
              >
                {search}
              </Link>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[42%] min-h-64 sm:h-[48%] lg:h-[54%]">
          <Image
            src={globe}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_66%] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 mt-auto pb-16 pt-44 text-center sm:pb-20 sm:pt-52">
          <p className="text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7">
            Assisting over <span className="font-semibold text-white">15,000</span> job seekers
            <br />
            find their dream positions.
          </p>
        </div>
      </section>
    </main>
  )
}


