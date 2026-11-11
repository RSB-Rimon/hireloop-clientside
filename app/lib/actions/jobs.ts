const BASE_URL=process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000'

export const createJob = async (data:FormData)=>{

    const res = await fetch(`${BASE_URL}/jobs`,{
        method: "POST",
        headers :{
            "content-type" :"application/json"
        },
        body: JSON.stringify(data),
    });
    return res.json();


}