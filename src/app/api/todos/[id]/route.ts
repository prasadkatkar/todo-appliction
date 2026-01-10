import { db } from "@/db/index";
import { todosTable } from "@/db/schema";
import { getApiSession } from "@/lib/server-utils";
import { errorResponse, successResponse } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import z from "zod";

//Update schema

const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export async function PUT(req: Request, ctx: RouteContext<"/api/todos/[id]">) {
  const session = await getApiSession();
  if (!session) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 400,
      }
    );
  }

  const { id } = await ctx.params;

  const body = await req.json();

  const validation = updateSchema.safeParse(body);

  if (!validation.success) {
    return errorResponse(validation.error.message, 400);
  }
  const updatePaylod: Record<string, unknown> = {};

  const { title, description, completed } = validation.data;

  if (title !== undefined) {
    updatePaylod.title = title;
  }
  if (description !== undefined) {
    updatePaylod.description = description;
  }
  if (completed !== undefined) {
    updatePaylod.completed = completed;
    console.log(completed);
  }
  const [result] = await db
    .update(todosTable)
    .set({ updated_at: new Date(), ...updatePaylod })
    .where(
      and(eq(todosTable.id, Number(id)), eq(todosTable.userId, session.id))
    )
    .returning();

  return successResponse(result);
}

//Delete Schema

export async function DELETE(
  req: Request,
  ctx: RouteContext<"/api/todos/[id]">
) {
  const { id } = await ctx.params;

  await db.delete(todosTable).where(eq(todosTable.id, Number(id)));
  return successResponse({
    success: true,
  });
}
