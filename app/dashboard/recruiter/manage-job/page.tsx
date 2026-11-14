import Link from "next/link"
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  EllipsisVertical,
  MapPin,
  Pencil,
  Plus,
  UsersRound,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getJobs, type JobListing } from "@/app/lib/api/jobs"
import { Typography } from "@/components/ui/typography"

import DashboardDialog from "@/app/components/DashboardDialog"

const frequencyLabels: Record<JobListing["frequency"], string> = {
  hour: "hr",
  month: "mo",
  year: "yr",
}

const categoryColors: Record<string, string> = {
  Engineering: "text-sky-400",
  Design: "text-orange-400",
  Infrastructure: "text-cyan-400",
  Marketing: "text-violet-400",
  Quality: "text-blue-400",
}

function formatDeadline(deadline: string) {
  return new Date(`${deadline}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function ManageJobPage() {
  const jobs = await getJobs()
  // function deleteJob(jobId: string) {
  //   setJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId))
  // }

  return (
    <div className="min-h-full flex-1 bg-[#131315] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="type-small mb-2 flex items-center gap-1.5 text-zinc-500"
            >
              <span>Manage Jobs</span>
              <ChevronRight className="size-3" aria-hidden="true" />
              <span className="text-zinc-300">Job Listings &amp; Postings</span>
            </nav>
            <Typography as="h1" variant="pageTitle" className="text-zinc-100">
              Manage Job Posts
            </Typography>
            <p className="type-small mt-1 text-zinc-500">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/new"
            className="type-small type-weight-medium inline-flex h-9 items-center justify-center gap-1.5 self-start rounded-md bg-violet-600 px-3 text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:self-auto"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            New Job Post
          </Link>
        </header>

        <section
          aria-label="Job listings"
          className="overflow-hidden rounded-lg border border-white/[0.07] bg-[#171719]"
        >
          <Table className="min-w-[1080px]">
            <TableHeader>
              <TableRow className="h-9 bg-[#19191c] hover:bg-[#19191c]">
                <TableHead className="type-micro w-[19%] px-3 tracking-wide text-zinc-400 uppercase">
                  Job title &amp; dept
                </TableHead>
                <TableHead className="type-micro w-[19%] px-3 tracking-wide text-zinc-400 uppercase">
                  Company &amp; location
                </TableHead>
                <TableHead className="type-micro w-[9%] px-3 tracking-wide text-zinc-400 uppercase">
                  Type
                </TableHead>
                <TableHead className="type-micro w-[12%] px-3 tracking-wide text-zinc-400 uppercase">
                  Compensation
                </TableHead>
                <TableHead className="type-micro w-[11%] px-3 tracking-wide text-zinc-400 uppercase">
                  Applicants
                </TableHead>
                <TableHead className="type-micro w-[9%] px-3 tracking-wide text-zinc-400 uppercase">
                  Status
                </TableHead>
                <TableHead className="type-micro w-[11%] px-3 tracking-wide text-zinc-400 uppercase">
                  Deadline
                </TableHead>
                <TableHead className="type-micro w-[10%] px-3 text-right tracking-wide text-zinc-400 uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                const status =
                  job.status ??
                  (job.deadline &&
                  new Date(`${job.deadline}T00:00:00`) < new Date()
                    ? "Expired"
                    : "Active")
                const applicants = job.applicants ?? 0

                return (
                  <TableRow
                    key={job._id}
                    className="h-[54px] border-white/[0.05]"
                  >
                    <TableCell className="px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-[#202024]">
                          <BriefcaseBusiness
                            className="size-3.5 text-violet-300"
                            aria-hidden="true"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="type-small type-weight-medium truncate text-zinc-100">
                            {job.title}
                          </p>
                          <p
                            className={`type-micro mt-0.5 truncate ${categoryColors[job.category] ?? "text-zinc-400"}`}
                          >
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <p className="type-data type-weight-medium truncate text-zinc-200">
                        {job.company}
                      </p>
                      <p className="type-micro mt-0.5 flex items-center gap-1 truncate text-zinc-500">
                        {job.isRemote ? (
                          <Building2
                            className="size-3 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <MapPin
                            className="size-3 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        {job.location}
                      </p>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <span className="type-micro inline-flex rounded-full border border-white/[0.06] bg-[#202024] px-2 py-1 text-zinc-300">
                        {job.jobType}
                      </span>
                    </TableCell>
                    <TableCell className="type-data px-3 py-2 text-zinc-200">
                      {job.minSalary} – {job.maxSalary} /{" "}
                      {frequencyLabels[job.frequency]}
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <span className="type-data inline-flex items-center gap-1.5 whitespace-nowrap text-violet-300">
                        <UsersRound className="size-3.5" aria-hidden="true" />
                        {applicants} Candidates
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <span
                        className={
                          status === "Active"
                            ? "type-micro type-weight-medium inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-400"
                            : "type-micro type-weight-medium inline-flex rounded-full border border-zinc-500/20 bg-zinc-500/10 px-2.5 py-1 text-zinc-400"
                        }
                      >
                        {status}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <p className="type-data whitespace-nowrap text-zinc-200">
                        {job.deadline
                          ? formatDeadline(job.deadline)
                          : "No deadline"}
                      </p>
                      <p className="type-micro mt-0.5 text-zinc-600">
                        {status === "Expired" ? "Closed" : "Active"}
                      </p>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href="/dashboard/recruiter/new"
                          aria-label={`Edit ${job.title}`}
                          title="Edit job"
                          className="type-micro type-weight-medium inline-flex h-7 items-center gap-1 rounded border border-violet-400/20 bg-violet-500/10 px-2 text-violet-300 transition hover:bg-violet-500/20 focus-visible:outline-2 focus-visible:outline-violet-400"
                        >
                          <Pencil className="size-3" aria-hidden="true" />
                          Edit
                        </Link>
                        {/* <button
                        type="button"
                        aria-label={`Delete ${job.title}`}
                        title="Delete job"
                        // onClick={() => deleteJob(job.id)}
                        className="inline-flex size-7 items-center justify-center rounded border border-white/[0.06] bg-[#202024] text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-red-400"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </button> */}
                        <DashboardDialog job={job} />
                        <button
                          type="button"
                          aria-label={`More actions for ${job.title}`}
                          title="More actions"
                          className="inline-flex size-6 items-center justify-center rounded text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-violet-400"
                        >
                          <EllipsisVertical
                            className="size-4"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

              {jobs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="type-control h-28 text-center text-zinc-500"
                  >
                    No job posts yet. Create a new post to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        <p className="type-micro mt-3 text-zinc-600">
          Job listings are loaded from your jobs API.
        </p>
      </div>
    </div>
  )
}
