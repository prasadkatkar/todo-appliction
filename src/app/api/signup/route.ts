import { db } from "@/db"
import { users } from "@/db/schema"
import z from "zod"

const userSchema=z.object({
    email:z.email(),
    password:z.string()
})

export async function POST(req:Request){
    const body = await req.json()

    const validation = userSchema.safeParse(body)
    if(!validation.success){
        return new Response(
            JSON.stringify({
                error:validation.error.message
            }),
            {
                status:400,
                headers:{"content-type":"application/json"}
            },
        )
    }

    const user = validation.data
    await db.insert(users).values({
        email:user.email,
        password:user.password,
        updated_at:new Date(),
        created_at:new Date()
    })

    return new Response(JSON.stringify({success:true}),{
        status:200,
        headers:{"content-type":"application/json"}
    })

}