"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@supabase/auth-helpers-nextjs";
import WelcomeUser from "@/components/WelcomeUser";
import Logout from "@/components/Logout";
import NavigateCard from "@/components/NavigateCard";
import { ChevronRight } from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const navigateOptions = [
    {
      id: 1,
      label: "Products Page",
      icon: <ChevronRight size={20}/>,
      href: "/admin/products",
    },
  ];

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
    <div className="flex flex-col gap-6">
      <WelcomeUser email={user?.email} />
      <div className="flex-1">
        {navigateOptions.map((item) => (
          <NavigateCard key={item.id} title={item.label} icon={item.icon} url={item.href}/>
        ))}
      </div>
      <Logout />
    </div>
  );
}
