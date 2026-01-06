import { Profile } from "@/components/profile";
import { Card } from "@/components/ui/card";
import { getTodos } from "@/lib/clients/api";
import { validateJwt } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const appCookies = await cookies();
  const token = appCookies.get("jwt");
  // console.log(token);

  if (!token?.value) {
    redirect("./login");
  }

  const decodedValue = validateJwt(token.value);

  if (!decodedValue) {
    redirect("./login");
  }

  const todos = await getTodos();
  return (
    <div className="p-12">
      <Profile />
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
