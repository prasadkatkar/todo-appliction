import { TodoAction } from "@/components/todoAction";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { getSession } from "@/lib/server-utils";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getTodosByUserId(userId: number, id: number) {
  const result = await db
    .select()
    .from(todosTable)
    .where(and(eq(todosTable.id, id), eq(todosTable.userId, userId)));
  return result;
}

export default async function SingleTodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) {
    redirect("./login");
  }

  const { id } = await params;
  const todoId = parseInt(id);
  const todos = await getTodosByUserId(session.id, todoId);

  const todo = todos[0];

  if (!todo) {
    return <p>todo not found</p>;
  }

  return (
    <div className="p-12 shrink-0 w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={"/"}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <CardTitle>{todo.title}</CardTitle>
            </div>
            <Badge>{todo.completed ? "Completed" : "Pending"}</Badge>
          </div>
        </CardHeader>
        <hr />
        <CardContent>
          <p>{todo.description}</p>
        </CardContent>
        <hr />
        <CardFooter className="">
          <TodoAction id={id} completed={todo.completed || false} />
        </CardFooter>
      </Card>
    </div>
  );
}
