import { db } from "@/db/index";
import { todosTable } from "@/db/schema";
import { getApiSession } from "@/lib/server-utils";
import { desc, eq } from "drizzle-orm";
import z from "zod";

export async function GET() {
  //get todos from database
const session = await getApiSession()
  if(!session){
    return new Response(
      JSON.stringify({
        error:"unauthorized"
      }),{
        status:400
      }
    )
  }
 


  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId,session.id))
    .orderBy(desc(todosTable.created_at))
    .limit(50);


  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

//Post Handler

const todoSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(100).optional(),
});

export async function POST(req: Request) {
  // step 1 : get token from bearer headers
  //step 2 :

 const session = await getApiSession()
  if (!session) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 400,
      }
    );
  }


 

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
      userId: session.id,
    })
    .returning();

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
