"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { deleteCookie } from "cookies-next";
import { TfiAlignLeft } from "react-icons/tfi";

export function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleOpen() {
    setOpen(!open);
  }

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
    <div className="md:bg-amber-800 bg-gray-800 p-3 flex md:justify-between items-center w-full sticky top-0 gap-3">
      <div className="md:hidden flex justify-between w-full">
        <Button onClick={handleOpen}>
          <TfiAlignLeft />
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {open && (
        <div className="absolute top-16 left-0 bg-gray-800 w-full md:hidden flex flex-col gap-4 p-4">
          <h1 className="text-white">Name : {name}</h1>
          <p className="text-white">Email : {email}</p>

          <Link
            href={"/"}
            className="text-white"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href={"/profile"}
            className="text-white"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            href={"/create"}
            className="text-white"
            onClick={() => setOpen(false)}
          >
            Create Todo
          </Link>
        </div>
      )}

      <div className="hidden md:flex gap-10">
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/create"}>Create Todo</Link>
      </div>

      <div className="hidden md:flex gap-5 items-center">
        <h1>Name : {name}</h1>
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
