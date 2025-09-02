"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/users").then((r) => r.json()).then(setUsers);
  }, []);
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}
