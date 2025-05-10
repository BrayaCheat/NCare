import { Card } from "@/components/ui/card";

export default async function ViewProduct() {
  const res = await fetch(`http:127.0.0.1:9095/api/products`, {method: 'GET'})
  const data = await res.json()
  console.log(data)
  return (
    <div className="flex flex-col gap-6">
      {data.message}
      {data.products.map(item => item.id)}
    </div>
  );
}
