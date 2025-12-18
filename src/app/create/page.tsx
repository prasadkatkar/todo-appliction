import { TodoFrom } from "@/components/todoFrom";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateFrom() {
  return (
    <div>
      <div>
        <Link href={"/"} className="">
          <CircleArrowLeft className="w-10 h-10 m-6" />
        </Link>
      </div>
      <div className="flex justify-center">
        <TodoFrom />
      </div>
    </div>
  );
}
