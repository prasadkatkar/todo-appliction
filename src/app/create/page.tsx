import { TodoFrom } from "@/components/todoFrom";
import { validateJwt } from "@/lib/server-utils";
import { CircleArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateFrom() {
  const appCookies = await cookies();
  const token = appCookies.get("jwt");
  if (!token?.value) {
    redirect("./login");
  }
  const decodedValue = validateJwt(token.value);
  if (!decodedValue) {
    redirect("./login");
  }
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
