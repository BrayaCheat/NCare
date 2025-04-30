"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Loader } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useUserStore from "../store/user";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  // Memoized login handler
  const onLogin = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (user) {
        setUser(user);
        router.push('/admin');
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, [data.email, data.password, router, setUser]);

  // Optimized input handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  // Form submission handler
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (data.email && data.password) {
        onLogin();
      }
    },
    [data.email, data.password, onLogin]
  );

  // Disable state derived from data
  const isDisabled = !data.email || !data.password || loading;

  return (
    <div className="md:w-[430px] w-full mx-auto rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-3">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.png"
            width={200}
            height={200}
            alt="Logo"
            priority
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="NCare@example.com"
            type="email"
            value={data.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Password</Label>
          <Input
            name="password"
            placeholder="**********"
            type="password"
            value={data.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={isDisabled}>
          {loading ? <Loader className="animate-spin" /> : 'Login'}
        </Button>
      </form>
    </div>
  );
}