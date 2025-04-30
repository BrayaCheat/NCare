"use client";

// import WelcomeUser from "@/components/WelcomeUser";
// import Logout from "@/components/Logout";
import NavigateCard from "@/components/NavigateCard";
import { ArchiveIcon, ExternalLinkIcon, PackagePlusIcon, Settings } from "lucide-react";
// import useUserStore from "../store/user";
import AdminCarousel from "@/components/AdminCarousel";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const navigateOptions = [
    {
      id: 1,
      label: "Products Management",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/products",
      description: 'Managing products',
      color: "bg-primary",
    },
    {
      id: 2,
      label: "Categories Management",
      icon: <ArchiveIcon size={18} />,
      href: "/admin/categories",
      description: 'Managing categories',
      color: "bg-primary",
    },
    {
      id: 3,
      label: "Mock",
      icon: <ArchiveIcon size={18} />,
      href: "/admin",
      color: "",
    },
    {
      id: 4,
      label: "Mock",
      icon: <ArchiveIcon size={18} />,
      href: "/admin",
      color: "",
    },
  ];
  const quickOptions = [
    {
      id: 1,
      label: "Quick Add",
      icon: <PackagePlusIcon size={18} />,
      href: "/admin/products/add-product",
      color: "",
    },
    {
      id: 2,
      label: "Quick View",
      icon: <ExternalLinkIcon size={18} />,
      href: "/admin/products/view-product",
      color: "",
    },
    {
      id: 3,
      label: "Settings",
      icon: <Settings size={18} />,
      href: "/admin",
      color: "",
    },
    {
      id: 4,
      label: "More",
      icon: <ArchiveIcon size={18} />,
      href: "/admin",
      color: "",
    },
  ];
  // const { user } = useUserStore();
  return (
    <div className="flex flex-col gap-6">
      <AdminCarousel />
      <Card className="grid grid-cols-4 items-center">
        {quickOptions.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-muted-foreground">
              <span>{item.icon}</span>
              <Label className="text-sm">{item.label}</Label>
            </div>
        ))}
      </Card>

      <Card className="flex flex-col gap-6">
        {navigateOptions.map((item) => (
          <NavigateCard
            key={item.id}
            title={item.label}
            url={item.href}
            description={item.description}
            color={item.color}
          />
        ))}
      </Card>
    </div>
  );
}
