import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { todosTable } from "@/db/schema";

async function getTodosByUserId(userId: number) {
  return await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId));
}

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // get todos for current user
  const todos = await getTodosByUserId(session.id);

  return (
    <div className="p-12">
      {todos.length === 0 ? (
        <p className="text-center text-4xl text-gray-200">
          Todos Not Found.....!
        </p>
      ) : (
        <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {todos.map((todo) => (
            <Link key={todo.id} href={`/todos/${todo.id}`}>
              <Card className="p-4">
                <h4 className="text-2xl font-bold">{todo.title}</h4>
                <p className="text-lg text-gray-500">{todo.description}</p>
                <p className="text-sm text-gray-500">
                  {todo.completed ? "Completed" : "Not completed"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
