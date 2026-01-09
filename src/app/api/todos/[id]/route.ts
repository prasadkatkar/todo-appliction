import { db } from "@/db/index";
import { todosTable } from "@/db/schema";
import { errorResponse, successResponse } from "@/lib/utils";
import { eq } from "drizzle-orm";
import z from "zod";

export async function GET(
    request:Request,
   ctx:RouteContext<"/api/todos/[id]">
){
    const {id} =await ctx.params

       const [todo]= await db
       .select()
       .from(todosTable)
       .where(eq(todosTable.id,Number(id)))
    


    if (!todo){
        return errorResponse("no todo found",404)
    }
    return successResponse(todo)
}

//Update schema

const updateSchema=z.object({
    title:z.string().optional(),
    description:z.string().optional(),
    completed:z.boolean().optional()
})

export async function PUT(req:Request,ctx:RouteContext<"/api/todos/[id]">){
    const {id}=await ctx.params

    const body = await req.json()

    const validation=updateSchema.safeParse(body)

    if(!validation.success){
        return errorResponse(validation.error.message,400)
    }
    const updatePaylod:Record<string,unknown>={}

    const {title,description,completed}=validation.data

    if(title!==undefined){
        updatePaylod.title=title
    }
    if(description!==undefined){
        updatePaylod.description=description
    }
    if(completed!==undefined){
        updatePaylod.completed=completed
    }

    const [result]=await db
    .update(todosTable)
    .set({updated_at:new Date(),
        ...updatePaylod,})
    .where(eq(todosTable.id,Number(id)))
    .returning();

return successResponse(result);
}

//Delete Schema


export async function DELETE(req:Request,ctx:RouteContext<"/api/todos/[id]">){
    const {id}=await ctx.params

    await db.delete(todosTable).where(eq(todosTable.id,Number(id)))
    return successResponse({
        success:true
    })
}

