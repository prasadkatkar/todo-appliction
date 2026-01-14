"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { deleteCookie } from "cookies-next";

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleLogout() {
    localStorage.removeItem("jwt");
    deleteCookie("jwt");
    router.push("/login");
    router.refresh();
  }

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
    <div className="bg-gray-800 p-3 flex justify-between items-center">
      <div className="flex gap-10">
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/create"}>Create Todo</Link>
      </div>
      <div className="flex gap-5 items-center">
        <h1>User Name : {name}</h1>
        <p>Email : {email}</p>
        <div>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
