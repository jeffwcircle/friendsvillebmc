"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Church Admin Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <ul>
        <li>
          <a href="/admin/posts">Manage Facebook Posts</a>
        </li>

        <li>
          <a href="/admin/photos">Manage Photos</a>
        </li>
      </ul>
    </div>
  );
}