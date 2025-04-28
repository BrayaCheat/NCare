import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader, Plus } from "lucide-react";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useUserStore from "@/app/store/user";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";

export default function AddCategory() {
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();

  const onCreateCategory = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      validateCategory()
      const body = {
        name: category,
        userId: user?.id,
      };
      const res = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log("Category response: ", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateCategory = () => {
    if(!category || category.trim().length <= 0){
      toast.error('Category is required.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Plus size={20} className="text-muted-foreground" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden"/>
        <DialogDescription className="hidden"/>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Label>New Category</Label>
            <Input
              placeholder="e.g. Lipstick"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
            />
          </div>
          <Button type="button" onClick={onCreateCategory}>
            {loading ? <Loader className="animate-spin" /> : <p>Save</p>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
