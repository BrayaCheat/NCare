import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AddCategory() {
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  const handleCreateCategory = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      const body = {
        name: category,
        userId: ''
      }
      const res = await fetch('/api/category', {
        method: 'POST',
        body: JSON.stringify(body)
      })
      const data = await res.json()
      console.log('Category response: ', data)
    } catch (error) {
      toast.error('Internal Server Error', {description: error})
    } finally {
      setLoading(false) 
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Plus size={20} className="text-muted-foreground" />
      </DialogTrigger>
      <DialogContent>
        <form action="" onSubmit={handleCreateCategory}>
          <div className="flex flex-col gap-3">
            <Label>New Category</Label>
            <Input
              placeholder="e.g. Lipstick"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              required
            />
          </div>
          <Button type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
