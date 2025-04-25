"use client";

import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Loader } from "lucide-react";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (user) {
        setLoading(false)
        router.refresh();
        router.push('/admin')
      }
      if (error) {
        setLoading(false)
        toast(error.message, {
          style: {backgroundColor: 'var(--destructive)', color: 'white'}
        });
      }
    } catch (error) {
      setLoading(false)
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

  useEffect(() => {
    if(data.email.length <= 0 || data.password.length <= 0){
      // console.log(data.email, data.password, disable)
      setDisable(true)
    }else{
      setDisable(false)
    }
  }, [data.email, data.password])

  return (
    <div className="md:w-[430px] w-full mx-auto rounded-2xl">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 p-3">
        <div className="flex flex-col items-center">
          <Image
            src={'/images/logo.png'}
            width={200}
            height={200}
            alt="Logo"
            priority
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
        <Button
            disabled={disable || loading}
            onClick={onLogin}
        >{loading ? <Loader className="animate-spin"/> : 'Login'}
        </Button>
      </form>
    </div>
  );
}
