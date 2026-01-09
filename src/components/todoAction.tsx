"use client";
import { CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TodoActionsProps {
  id: string;
  completed: boolean;
}

export function TodoAction({ id, completed }: TodoActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("login is expired, please login again.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success("Todo Deleted Successfully");
        router.push("/");
      } else {
        toast.error("Failed to Delete Todo");
        if (response.status === 400) {
          router.push("/login");
        }
      }
    } catch {
      toast.error("Error Deleting Todo");
    }
  }

  async function handleMarkComplete() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "applcation/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: true }),
      });
      if (response.ok) {
        toast.success("Todo Marked Completed");
        router.refresh();
      } else {
        toast.error("Failed To Marked As completed");
        if (response.status === 400) {
          router.push("/login");
        }
      }
    } catch {
      toast.error("error updating todo");
    }
  }
  return (
    <div className="w-full flex items-center justify-end gap-4">
      <Button variant={"destructive"} onClick={handleDelete}>
        Delete
      </Button>
      {!completed && (
        <Button variant={"default"} onClick={handleMarkComplete}>
          <CheckIcon />
          Mark Completed
        </Button>
      )}
    </div>
  );
}
