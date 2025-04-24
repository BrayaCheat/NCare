import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function Logout() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast('Signout')
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return <>
  <div>
  <Button variant={'destructive'} onClick={onLogout}>Signout</Button>
  </div>
  </>
}
