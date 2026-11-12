const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000"

export const createJob = async (data: FormData) => {
  const payload = {
    ...Object.fromEntries(data.entries()),
    isRemote: data.has("isRemote"),
  }

  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Failed to create job: ${res.status} ${res.statusText}`)
  }

  return res.json()

}


 export const deleteJob =  async (jobId:string)=>{
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
    method:"DELETE",

  });
  return res.json()
 }