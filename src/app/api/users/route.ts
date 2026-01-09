import { db } from "@/db";
import { users } from "@/db/schema";
import { headers } from "next/headers";
import z from "zod";
import jwt from 'jsonwebtoken'
import { eq } from "drizzle-orm";
import { validateJwt } from "@/lib/server-utils";


const userUpdateSchema = z.object({
    name:z.string().max(50)
})
export async function PUT(req:Request){

    //step 1 : get token from headers
    //step 2 : verify token
    //step 3 : get user id from decoded token
    
    const headerList = await headers()
    const token = headerList.get("Authorization")?.replace("Bearer ","")
    if(!token){
        return new Response(
            JSON.stringify({
                error:"Unauthorized"
            }),
            {
                status:400,
            }
        )
    }
    let decoded
    try{
    decoded = jwt.verify(token,"SecretKey") as {id:number}
        console.log(decoded,"+++++++++++++")
    }catch{
        return new Response(JSON.stringify({
            
            error:"Internal server Error"
        }))
    }

    const body = await req.json()

    const validation = userUpdateSchema.safeParse(body)

    if(!validation.success){
        return new Response(
            JSON.stringify({
                error:validation.error.message
            }),
            {
                status:400,
                headers:{"content-type":"application/json"}
            }
        )
    }
    const result = validation.data


  const [setResult] =  await db.update(users).set({
        name:result.name,
        updated_at:new Date()
    }).where(eq(users.id,decoded.id))
    .returning();

    return new Response(JSON.stringify(setResult),{
        status:200,
        
        headers:{"content-type":"application/json",

            
        }
        
    })
}

export async function GET(){
const headerList = await headers()
const token = headerList.get("Authorization")?.replace("Bearer ","")
if(!token){
    return new Response(
        JSON.stringify({
            error:"unauthorization"
        }),
        {
            status:400,
            headers:{"content-type":"application/json"}
        }
    )
}
const decoded = validateJwt(token)
if(!decoded){
    return new Response(
        JSON.stringify({
            error:"unauthorization"
        }),{
            status:400
        }
    )
}
// try{
//      decoded =jwt.verify(token,"SecretKey") as {id:number}
// }catch{
//     return new Response(
//         JSON.stringify({
//             error:"Internal server Error"
//         }),{
//             status:400,
//             headers:{"content-type":"application/json"}
//         }
//     )
// }

const [user]=await db.select({name:users.name,email:users.email})
.from(users)
.where(eq(users.id,decoded.id))
.limit(1)


return new Response(
    JSON.stringify({
        name:user.name,
        email:user.email
    }),{
        status:200,
        headers:{"content-type":"application/json"}
    }
)
}