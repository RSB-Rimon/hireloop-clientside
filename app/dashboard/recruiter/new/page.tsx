"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createJob } from "@/app/lib/actions/jobs"

type FieldProps = {
  label: string
  children: ReactNode
  className?: string
}

function Field({ label, children, className = "" }: FieldProps) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-zinc-200 ${className}`}>
      {label}
      {children}
    </label>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-white/[0.06] bg-[#151517] p-5 sm:p-6">
      <h2 className="flex items-center gap-3 text-base font-semibold text-zinc-100">
        <span className="size-2 rounded-sm bg-violet-500" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

const inputClassName =
  "h-11 rounded-md border-white/[0.08] bg-[#1e1e21] px-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-violet-400 focus-visible:ring-violet-400/20"

const selectClassName =
  "h-11 w-full rounded-md border border-white/[0.08] bg-[#1e1e21] px-4 text-sm text-zinc-100 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"

const textareaClassName =
  "min-h-24 w-full resize-y rounded-md border border-white/[0.08] bg-[#1e1e21] px-4 py-3 text-sm leading-6 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

export default function AddNewPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setIsSubmitting(true)
    setMessage("")
    try {
      await createJob(formData)
      router.push("/dashboard/recruiter/manage-job")
      router.refresh()
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to create the job."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-full flex-1 bg-[#131315] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[984px]">
        <header className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-3 flex items-center gap-2 text-xs text-zinc-500"
            >
              <Link
                href="/dashboard/recruiter/manage-job"
                className="transition hover:text-zinc-300"
              >
                Manage Jobs
              </Link>
              <ChevronRight className="size-3" aria-hidden="true" />
              <span className="text-zinc-400">Create New Listing</span>
            </nav>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Post a New Job
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

        
        </header>

        <form id="job-post-form" onSubmit={handleSubmit} className="space-y-6">
          <Section title="1. Basic Information">
            <div className="grid gap-4">
              <Field label="Job Title *">
                <Input
                  className={inputClassName}
                  name="title"
                  placeholder="Frontend Developer"
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company Name *">
                  <Input
                    className={inputClassName}
                    name="company"
                    placeholder="HirePulse Network"
                    required
                  />
                </Field>
                <Field label="Job Category *">
                  <select
                    className={selectClassName}
                    name="category"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option>Engineering &amp; Tech</option>
                    <option>Design &amp; Creative</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Operations</option>
                  </select>
                </Field>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-zinc-200">
                  Job Type *
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {jobTypes.map((jobType, index) => (
                    <label key={jobType} className="cursor-pointer">
                      <input
                        className="peer sr-only"
                        type="radio"
                        name="jobType"
                        value={jobType}
                        defaultChecked={index === 0}
                      />
                      <span className="flex h-11 items-center justify-center rounded-md border border-white/[0.08] bg-[#1e1e21] text-sm text-zinc-300 transition peer-checked:border-violet-400/40 peer-checked:bg-[#232326] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400/40">
                        {jobType}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </Section>

          <Section title="2. Location, Compensation & Timeline">
            <div className="grid gap-4">
              <label className="flex min-h-16 items-center justify-between gap-4 rounded-md border border-white/[0.06] bg-[#1e1e21] px-4 py-3">
                <span>
                  <span className="block text-sm font-medium text-zinc-200">
                    Remote Work Allowed (isRemote)
                  </span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    Enable worldwide or distributed candidate applications
                  </span>
                </span>
                <span className="relative inline-flex shrink-0 items-center">
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    name="isRemote"
                    aria-label="Remote work allowed"
                  />
                  <span className="h-6 w-11 rounded-full bg-zinc-700 transition peer-checked:bg-violet-600 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400/50" />
                  <span className="pointer-events-none absolute left-0.5 size-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                </span>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Job Location (location)">
                  <Input
                    className={inputClassName}
                    name="location"
                    placeholder="New York, USA"
                    required
                  />
                </Field>
                <Field label="Application Deadline (deadline)">
                  <Input
                    className={inputClassName}
                    name="deadline"
                    type="date"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Min Salary / Rate">
                  <Input
                    className={inputClassName}
                    min="0"
                    name="minSalary"
                    placeholder="25"
                    type="number"
                  />
                </Field>
                <Field label="Max Salary / Rate">
                  <Input
                    className={inputClassName}
                    min="0"
                    name="maxSalary"
                    placeholder="40"
                    type="number"
                  />
                </Field>
                <Field label="Frequency">
                  <select
                    className={selectClassName}
                    name="frequency"
                    defaultValue="hour"
                  >
                    <option value="hour">per hour</option>
                    <option value="month">per month</option>
                    <option value="year">per year</option>
                  </select>
                </Field>
              </div>
            </div>
          </Section>

          <Section title="3. Responsibilities & Requirements">
            <div className="grid gap-4">
              <Field label="Key Responsibilities *">
                <textarea
                  className={textareaClassName}
                  name="responsibilities"
                  placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. Describe the day-to-day responsibilities of this role."
                  required
                />
              </Field>
              <Field label="Qualifications & Requirements *">
                <textarea
                  className={textareaClassName}
                  name="requirements"
                  placeholder="List the experience, skills, and qualifications candidates need for this role."
                  required
                />
              </Field>
            </div>
          </Section>
        </form>

        <p
          aria-live="polite"
          className="mt-3 min-h-5 text-xs text-red-400"
          role="alert"
        >
          {message}
        </p>
      </div>

      <div>
          <Button
            form="job-post-form"
            type="submit"
            disabled={isSubmitting}
            className="h-11 shrink-0 gap-2 rounded-md bg-violet-600 px-6 text-sm font-medium text-white hover:bg-violet-500"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
            <Send className="size-4" aria-hidden="true" />
          </Button>
      </div>
    </div>
  )
}
