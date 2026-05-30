"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Protected Layout Session:", session);

      if (!mounted) return;

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setLoading(false);
    }

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        Checking login...
      </div>
    );
  }

  return <>{children}</>;
}