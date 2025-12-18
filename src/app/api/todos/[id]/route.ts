import { db } from "@/db/index";
import { todosTable } from "@/db/schema";
import { errorResponse, successResponse } from "@/lib/utils";
import { eq } from "drizzle-orm";

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