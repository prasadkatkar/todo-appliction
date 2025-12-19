import { TodoAction } from "@/components/todoAction";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTodoById } from "@/lib/clients/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SingleTodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todo = await getTodoById(id);
  return (
    <div className="p-12">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={"/"}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <CardTitle>{todo?.title}</CardTitle>
            </div>
            <Badge>{todo?.completed ? "Completed" : "Pending"}</Badge>
          </div>
        </CardHeader>
        <hr />
        <CardContent>
          <p>{todo?.description}</p>
        </CardContent>
        <hr />
        <CardFooter>
          <TodoAction id={id} completed={todo?.completed || false} />
        </CardFooter>
      </Card>
    </div>
  );
}
