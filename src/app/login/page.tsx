import { LoginForm } from "@/components/loginFrom";
import { getSession } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
