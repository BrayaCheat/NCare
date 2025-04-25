"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Logout from "@/components/Logout";
import { User } from "@supabase/auth-helpers-nextjs";
import WelcomeUser from "@/components/WelcomeUser";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data.user);
      if (error)
        toast(error.message, {
          style: { backgroundColor: "var(--destructive)", color: "white" },
        });
    };
    loadUser();
  }, []);
  return (
    <>
      <div>
        <WelcomeUser email={user?.email}/>
        <Logout />
      </div>
    </>
  );
}
