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
import { validateJwt } from "@/lib/server-utils";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SingleTodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const appCookies = await cookies();
  const token = appCookies.get("jwt");
  if (!token?.value) {
    redirect("./login");
  }
  const decodedValue = validateJwt(token.value);
  if (!decodedValue) {
    redirect("./login");
  }
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
