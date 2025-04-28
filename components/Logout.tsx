import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader, LogOutIcon } from "lucide-react";
import useUserStore from "@/app/store/user";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {clearUser} = useUserStore()
  
  const onLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      clearUser()
      router.refresh()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
      <div>
        <Button variant={"destructive"} onClick={onLogout} disabled={loading} className="w-full">
          {loading ? <Loader className="animate-spin" /> : (<div className="flex items-center gap-2 font-bold"><LogOutIcon/>Logout</div>)}
        </Button>
      </div>
  );
}
