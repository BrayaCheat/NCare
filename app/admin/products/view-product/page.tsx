"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { DISPLAY_IMAGE } from "@/app/utils/helper";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/Product";

export default function ViewProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex flex-col gap-6">
      {products.length > 0 ? (
        products.map((item) => (
          <Link href={`/admin/products/view-product/${item.id}`} key={item.id}>
            <Card className="flex flex-row">
              <Image
                src={DISPLAY_IMAGE(item.images[0].url)}
                alt={item.name}
                width={50}
                height={50}
                style={{
                  height: "auto",
                  width: "auto",
                }}
                priority
                className="rounded-2xl object-cover"
              />
              <Label>{item.name}</Label>
            </Card>
          </Link>
        ))
      ) : (
        <Card>
          <Label className="animate-pulse">Load products...</Label>
        </Card>
      )}
    </div>
  );
}
