'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function AddProduct(){
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold">New product</h1>
      <form action="" className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label>Product name</Label>
          <Input
            placeholder="Serum"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Price</Label>
          <Input
            placeholder="$100"
          />
        </div>
      </form>
    </div>
  )
}