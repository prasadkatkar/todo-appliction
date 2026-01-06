"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialFormState = {
  title: "",
  description: "",
};

export function TodoFrom() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [loading, SetLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  const disabled = title.trim().length === 0 || description.trim().length === 0;

  async function handleSubmit() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("login is expired, Please login again");
      router.push("/login");
      return;
    }
    // console.log(title);
    // console.log(desc);
    SetLoading(true);
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    console.log("Form Submitted:", formData);
    handleReset();

    if (!response.ok) {
      toast.error("failed to craete todo");
      router.push("/login");
      return;
    }
    const data = await response.json();

    if (data.id) {
      toast.success("todo create successfully!");
      router.push(`/todos/${data.id}`);
    }
    SetLoading(false);
    setTitle("");
    setDescription("");
  }
  function handleReset() {
    setFormData(initialFormState);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Fill Todo From</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
          <Input
            placeholder="Add Todo Title"
            autoComplete="off"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <FieldLabel htmlFor="form-rhf-demo-description">
            Description
          </FieldLabel>
          <Textarea
            placeholder="Add Todo Description"
            className="min-h-24 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button disabled={disabled} onClick={handleSubmit}>
            {loading ? "loading..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
