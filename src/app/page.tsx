import { Card } from "@/components/ui/card";
import { fakeTodos } from "@/lib/constants";
import Link from "next/link";


export default function Home() {
  return (
 <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {fakeTodos.map((todo)=>(
  <Link key={todo.id}href={`/todo/${todo.id}`}>
    <Card className="p-4">
      <h4 className="text-2xl font-bold">{todo.title}</h4>
      <p className="text-lg text-gray-500">{todo.description}</p>
      <p className="text-sm text-gray-500">{todo.completed ? "Completed" : "Not completed"}</p>
    </Card>
  
  </Link>
  ))}
 </div>
  );
}
