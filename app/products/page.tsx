import NavigateCard from "@/components/NavigateCard";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useMemo } from "react";

export default function AdminProductPage() {
  const navigateButtons = [
    {
      id: 1,
      label: "Add new product",
      href: "/admin/products/add-product",
      description: "Adding new products & display on store.",
      color: 'bg-primary'
    },
    {
      id: 2,
      label: "Views all products",
      href: "/admin/products/view-product",
      description: "Seeing list of products & Managing on products",
      color: 'bg-primary'
    },
  ];

  const links = useMemo(() => {
    return [
      {
        id: 1,
        label: "Add new product",
        href: "/admin/products/add-product",
        description: "Adding new products & display on store.",
        color: 'bg-primary'
      },
      {
        id: 2,
        label: "Views all products",
        href: "/admin/products/view-product",
        description: "Seeing list of products & Managing on products",
        color: 'bg-primary'
      }
    ]
  }, [])

  return (
    <Card className="flex flex-col gap-6">
      {/* {links.map((item) => (
          <NavigateCard
            key={item.id}
            href={item.href}
            title={item.label}
            color={item.color}
            description={item.description}
          />
      ))} */}
      <Link href={'/admin/products/view-product'}>
        go
      </Link>
    </Card>
  );
}
