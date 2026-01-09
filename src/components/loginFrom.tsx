"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit() {
    //step:1 check email & password field ,if empty
    //step:2 call api /api/login with body (email,password)
    //seep:3 get api response, check token
    //step:4 store that token in local storage

    if (!email) {
      setMessage("email is invalid");
      return;
    }

    if (!password) {
      setMessage("password is invalid");
      return;
    }
    setIsLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setMessage("Failed To login");
      setIsLoading(false);

      return;
    }
    const result = await response.json();
    const token = result.token;

    localStorage.setItem("jwt", token);
    // Store the JWT in a cookie for server side validation
    setCookie("jwt", token);
    setIsLoading(false);
    router.push("/");
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </Field>
            {message && (
              <div
                className={`text-sm ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}
            <Field>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                onClick={handleSubmit}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/signup">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
