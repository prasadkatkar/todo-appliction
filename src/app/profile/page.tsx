import { UserProfile } from "@/components/userProfile";
import { validateJwt } from "@/lib/server-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export default async function Profile() {
  // redirect("/custom-404");

  // Goal = if user is not Logged in (token Null or Expired) redirect to login page
  // step 1 : get token from cookies
  // step 2 : check token valid or redirect to login page

  const appCookies = await cookies();
  const token = appCookies.get("jwt");
  if (!token?.value) {
    redirect("/login");
  }
  // at this point we have a token
  const decodedValue = validateJwt(token.value);

  if (!decodedValue) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UserProfile />
      </div>
    </div>
  );
}
