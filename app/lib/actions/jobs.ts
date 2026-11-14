const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000"

type JobFrequency = "hour" | "month" | "year"
type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type CreateJobInput = {
  title: string
  company: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  minSalary: string
  maxSalary: string
  frequency: JobFrequency
  applicants: number
  status: "Active"
  deadline: string
  responsibilities: string
  requirements: string
}

function getRequiredValue(data: FormData, field: string) {
  const value = data.get(field)
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Please enter ${field}.`)
  }
  return value.trim()
}

function getOptionalValue(data: FormData, field: string) {
  const value = data.get(field)
  return typeof value === "string" ? value.trim() : ""
}

function getJobPayload(data: FormData): CreateJobInput {
  const selectedCategory = getRequiredValue(data, "category")
  const category =
    selectedCategory === "Design & Creative"
      ? "Design"
      : selectedCategory === "Engineering & Tech"
        ? "Engineering"
        : selectedCategory

  const rawJobType = getRequiredValue(data, "jobType")
  const jobTypes: JobType[] = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ]
  if (!jobTypes.includes(rawJobType as JobType)) {
    throw new Error("Please select a valid job type.")
  }

  const rawFrequency = getOptionalValue(data, "frequency") || "hour"
  const frequencies: JobFrequency[] = ["hour", "month", "year"]
  if (!frequencies.includes(rawFrequency as JobFrequency)) {
    throw new Error("Please select a valid salary frequency.")
  }

  return {
    title: getRequiredValue(data, "title"),
    company: getRequiredValue(data, "company"),
    category,
    jobType: rawJobType as JobType,
    isRemote: data.get("isRemote") === "on",
    location: getRequiredValue(data, "location"),
    minSalary: getOptionalValue(data, "minSalary"),
    maxSalary: getOptionalValue(data, "maxSalary"),
    frequency: rawFrequency as JobFrequency,
    applicants: 0,
    status: "Active",
    deadline: getOptionalValue(data, "deadline"),
    responsibilities: getRequiredValue(data, "responsibilities"),
    requirements: getRequiredValue(data, "requirements"),
  }
}

export const createJob = async (data: FormData) => {
  const payload = getJobPayload(data)
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Failed to create job: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Failed to delete job: ${res.status} ${res.statusText}`)
  }

  return res.json()
}