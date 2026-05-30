"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);

    if (error) {
      setError(error.message);
      return;
    }
const {
  data: { session },
} = await supabase.auth.getSession();

console.log("SESSION AFTER LOGIN:", session);


    router.push("/admin/dashboard");
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "2rem",
      }}
    >
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Login
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}