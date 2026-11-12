const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000"

export type JobListing = {
  _id: string
  title: string
  company: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  minSalary: string
  maxSalary: string
  frequency: "hour" | "month" | "year"
  applicants?: number
  status?: "Active" | "Expired"
  deadline: string
}

export const getJobs = async (): Promise<JobListing[]> => {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`)
  }

  const jobs: unknown = await res.json()

  if (!Array.isArray(jobs)) {
    throw new TypeError("Expected the jobs API to return an array")
  }

  return jobs.filter(
    (job): job is JobListing =>
      typeof job === "object" &&
      job !== null &&
      "_id" in job &&
      typeof job._id === "string" &&
      "title" in job &&
      typeof job.title === "string" &&
      job.title.trim().length > 0
  )
}