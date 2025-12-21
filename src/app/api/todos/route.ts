import { db } from "@/db/index";
import { todosTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import z from "zod";

export async function GET(){
    //get todos from database

    const todos= await db
    .select()
    .from(todosTable)
    .orderBy(desc(todosTable.created_at))
    .limit(50)

    


    return new Response(JSON.stringify(todos),{
        status:200,
        headers:{"content-type":"application/json"},
    })
}

//Post Handler


const todoSchema=z.object({
    title:z.string().min(1).max(100),
    description:z.string().max(100).optional()
});


export async function POST(req: Request) {
                const body = await req.json();

  const validation = todoSchema.safeParse(body);
  if (!validation.success) {
    return new Response(
      JSON.stringify({
        error: validation.error.message,
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  const newTodo = validation.data;

  const [response] = await db
    .insert(todosTable)
    .values({
      ...newTodo,
      created_at: new Date(),
      updated_at: new Date(),
      completed: false,
    })
    .returning();

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

