"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function fetchUser() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("login is Expired, please login again");
      router.push("/login");
      return;
    }
    const response = await fetch("/api/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      alert("Failed to fetch User Profile");
      router.push("/login");
      return;
    }
    const data = await response.json();
    setName(data.name || "");
    setEmail(data.email);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex gap-5 justify-end">
      <h1>User Name : {name}</h1>
      <p>Email : {email}</p>
    </div>
  );
}
