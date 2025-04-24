"use client";

import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onLogin = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (user) {
        console.log("Logged in user:", user);
        router.refresh();
        router.push('/admin')
      }
      if (error) toast(error.message);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="md:w-[430px] w-full mx-auto border rounded-2xl shadow-sm">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 p-3">
        <div className="flex flex-col items-center">
          <Image
            src={'/images/logo.png'}
            width={200}
            height={200}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Email</label>
          <Input
            name="email"
            placeholder="NCare@example.com"
            type="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Password</label>
          <Input
            name="password"
            placeholder="**********"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <Button onClick={onLogin}>Login</Button>
      </form>
    </div>
  );
}
