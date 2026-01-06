"use client";
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
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!email) {
      setMessage("Email is Valid");
      return;
    }
    if (!password) {
      setMessage("Password is valid");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Password and Confirm-password will be same");
    }
    setIsLoading(true);

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      router.push("/login");
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your email
              with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <FieldDescription>Please confirm your password.</FieldDescription>
          </Field>
          {message && (
            <div
              className={`text-sm ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
          <FieldGroup>
            <Field>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                onClick={handleSubmit}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
