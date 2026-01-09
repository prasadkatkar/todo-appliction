"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Login is expired. Please login again");
      router.push("/login");
      return;
    }
    const response = fetch("/api/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response) {
      alert("failed to update name");
      return;
    }
    if ((await response).ok) {
      toast.success("Name Updated Successfully.");
    }
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async function fetchUser() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Login is Expired, Please Login again");
      router.push("/login");
      return;
    }
    const response = await fetch("/api/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      alert("Failed to fetch user profile");
      return;
    }
    const data = await response.json();
    setName(data.name || "");
    setEmail(data.email || "");
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldLabel>Name</FieldLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FieldGroup>
      </CardContent>

      <CardContent>
        <FieldGroup>
          <FieldLabel>Email</FieldLabel>
          <p>{email}</p>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
