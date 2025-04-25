import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const onLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLoading(false);
        toast(error?.message, {
          style: { backgroundColor: "var(--destructive)", color: "white" },
        });
      }
      router.refresh();
      setLoading(false);
      router.push("/login");
      toast("Signout");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Button variant={"destructive"} onClick={onLogout} disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Logout"}
        </Button>
      </div>
    </>
  );
}
