"use client";

import NavigateCard from "@/components/NavigateCard";
import { ExternalLinkIcon, PackagePlusIcon } from "lucide-react";
import AdminCarousel from "@/components/AdminCarousel";
import { Card } from "@/components/ui/card";
import QuickCTA from "@/components/QuickCTA";

export default function Admin() {
  const navigateOptions = [
    {
      id: 1,
      label: "Products Management",
      href: "/admin/products",
      description: 'Managing products',
      color: "bg-primary",
    },
    {
      id: 2,
      label: "Categories Management",
      href: "/admin/categories",
      description: 'Managing categories',
      color: "bg-primary",
    },
    {
      id: 3,
      label: "Profile Management",
      href: "/admin/profile",
      description: 'Managing profile',
      color: "bg-primary",
    }
  ];

  const quickOptions = [
    {
      id: 1,
      label: "New Product",
      icon: <PackagePlusIcon size={22} />,
      href: "/admin/products/add-product",
      color: "",
    },
    {
      id: 2,
      label: "See Product",
      icon: <ExternalLinkIcon size={22} />,
      href: "/admin/products/view-product",
      color: "",
    },
  ];
  // const { user } = useUserStore();
  return (
    <div className="flex flex-col gap-6">
      <AdminCarousel />
      <Card className="grid grid-cols-2 items-center">
        {quickOptions.map((item) => (
            <QuickCTA
              key={item.id}
              label={item.label}
              icon={item.icon}
              href={item.href}
            />
        ))}
      </Card>

      <Card className="flex flex-col gap-6">
        {navigateOptions.map((item) => (
          <NavigateCard
            key={item.id}
            title={item.label}
            href={item.href}
            description={item.description}
            color={item.color}
          />
        ))}
      </Card>
    </div>
  );
}
